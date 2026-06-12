// Cloud LocalRent price sync — headless Playwright port of the
// localrent-price-sync SKILL. Runs in GitHub Actions (see
// .github/workflows/localrent-sync.yml) on a 4-hour cron, so prices stay
// fresh WITHOUT any PC being on. Mirrors exactly what the Claude-in-Chrome
// routine did: load the public /book page, let LocalRent's widget fire its
// signed search call, capture that URL, then paginate the API per city and
// recompute FLEET_FLOOR_EUR (nationwide) + FLEET_FLOOR_BY_CITY_EUR (per city).
//
// No login, no secret: /book is public and the widget signs the API URL in
// the page. The workflow commits any change with the built-in GITHUB_TOKEN.
//
// Run locally to test:  node scripts/localrent-cloud-sync.mjs
import fs from 'node:fs';
import { chromium } from 'playwright';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const FLEET_CARS = ROOT + 'src/data/fleetCars.js';
const FLEET_FLOOR = ROOT + 'src/data/fleetFloor.js';

const CITY_IDS = [2,5,7,8,9,15,17,18,19,22,23,24,25,26,29,30,32,34,35,36,39,40,548966,548984,548985,548986,549113,549193];
// nationwide ordering (Economy first) for diff-stable file output
const NAT_ORDER = ['vw-polo','fiat-500','peugeot-208','citroen-c3','toyota-yaris','vw-golf','kia-stonic','peugeot-2008','renault-kadjar','dacia-sandero','renault-megane','citroen-c4-picasso'];
const MODEL_NAMES = {
  'vw-polo':['volkswagen polo'],'fiat-500':['fiat 500'],'peugeot-208':['peugeot 208'],
  'citroen-c3':['citroen c3'],'toyota-yaris':['toyota yaris'],'vw-golf':['volkswagen golf'],
  'kia-stonic':['kia stonic'],'peugeot-2008':['peugeot 2008'],'renault-kadjar':['renault kadjar'],
  'dacia-sandero':['dacia sandero'],'renault-megane':['renault megane'],'citroen-c4-picasso':['citroen c4 picasso'],
};

function ymd(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function readSlugCarIds(){
  const s = fs.readFileSync(FLEET_CARS,'utf8');
  const m = {}; const re = /slug:\s*'([^']+)'[^}]*?carIds:\s*'([^']*)'/g; let x;
  while((x=re.exec(s))){ m[x[1]] = x[2].split(',').filter(Boolean).map(Number); }
  return m;
}

async function main(){
  const today = new Date(); today.setHours(0,0,0,0);
  const plus7 = new Date(today); plus7.setDate(plus7.getDate()+7);
  const pickup = ymd(today), dropoff = ymd(plus7);
  const slugToCarIds = readSlugCarIds();
  console.log(`[sync] dates ${pickup} -> ${dropoff}, slugs=${Object.keys(slugToCarIds).length}`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const url = `https://www.kotorcarhire.com/book?model=vw-polo&location=Tivat&pickup_date=${pickup}&dropoff_date=${dropoff}&pickup_time=10:00&dropoff_time=10:00&driver_age=30`;
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(8000);

  // Capture the signed search URL for OUR 7-day window from the main window.
  const signed = await page.evaluate(async ({ pickup, dropoff }) => {
    const sleep = ms => new Promise(r=>setTimeout(r,ms));
    const match = () => performance.getEntriesByType('resource').map(e=>e.name)
      .filter(n=>/api\/search\/cars/.test(n))
      .filter(n=>{ const p=new URL(n).searchParams; return (p.get('pickup_date')||'').startsWith(pickup)&&(p.get('dropoff_date')||'').startsWith(dropoff); }).pop()||null;
    let u=null; for(let i=0;i<30&&!u;i++){ u=match(); if(!u) await sleep(1000); }
    if(!u) return null;
    const x=new URL(u); [...x.searchParams.keys()].filter(k=>/car_ids/i.test(k)).forEach(k=>x.searchParams.delete(k));
    return x.toString();
  }, { pickup, dropoff });
  if(!signed){ await browser.close(); throw new Error('ABORT: no search call matched the 7-day window in 30s'); }

  // Paginate all cities + expand car_ids + compute floors, in the page context
  // (the widget's own origin can fetch the LocalRent API; Node cannot due to CORS).
  const result = await page.evaluate(async ({ signed, CITY_IDS, slugToCarIds, MODEL_NAMES }) => {
    async function carsForCity(cityId){
      const base=new URL(signed); base.searchParams.set('pickup_city_id',String(cityId)); base.searchParams.set('dropoff_city_id',String(cityId)); base.searchParams.delete('offset');
      [...base.searchParams.keys()].filter(k=>/car_ids/i.test(k)).forEach(k=>base.searchParams.delete(k));
      const headUrl=base.toString(); let head; try{ head=await fetch(headUrl).then(r=>r.json()); }catch(e){ return []; }
      const total=head.count||0,size=head.limit||24; if(!total) return [];
      const pages=[]; for(let off=0;off<total;off+=size){ const u=new URL(headUrl); u.searchParams.set('offset',String(off)); pages.push(fetch(u.toString()).then(r=>r.json())); }
      const res=await Promise.all(pages); const cars=[];
      for(const j of res) for(const c of (j.cars||[])) cars.push({id:c.id,dayCents:c.day_price_cents,name:(c.full_name||'').trim()});
      return cars;
    }
    const cityCars={}; await Promise.all(CITY_IDS.map(async id=>{ cityCars[id]=await carsForCity(id); }));
    const counts=CITY_IDS.map(id=>cityCars[id].length);
    const positive=counts.filter(c=>c>0);
    if(positive.length>5 && new Set(positive).size===1) return { error:'ABORT all-same-count '+positive[0] };
    const seen=new Set(),allCars=[];
    for(const id of CITY_IDS) for(const c of cityCars[id]){ if(seen.has(c.id))continue; seen.add(c.id); allCars.push(c); }
    const added={};
    for(const slug of Object.keys(MODEL_NAMES)){
      const wanted=MODEL_NAMES[slug];
      const live=allCars.filter(c=>wanted.includes(c.name.toLowerCase())).map(c=>c.id);
      const have=new Set(slugToCarIds[slug]||[]);
      const neu=live.filter(id=>!have.has(id));
      if(neu.length){ added[slug]=neu; slugToCarIds[slug]=[...(slugToCarIds[slug]||[]),...neu]; }
    }
    const cityFloor={};
    for(const cityId of CITY_IDS){ const sm={};
      for(const slug of Object.keys(slugToCarIds)){ const want=new Set(slugToCarIds[slug]); const ms=cityCars[cityId].filter(c=>want.has(c.id)); if(!ms.length)continue; sm[slug]=Math.ceil(Math.min(...ms.map(c=>c.dayCents))/100); }
      cityFloor[cityId]=sm;
    }
    const nationwide={};
    for(const slug of Object.keys(slugToCarIds)){ const ps=CITY_IDS.map(id=>cityFloor[id][slug]).filter(p=>typeof p==='number'); if(ps.length) nationwide[slug]=Math.min(...ps); }
    return { counts, totalAllCars:allCars.length, added, nationwide, cityFloor };
  }, { signed, CITY_IDS, slugToCarIds, MODEL_NAMES });

  await browser.close();
  if(result.error) throw new Error(result.error);
  console.log(`[sync] cars=${result.totalAllCars} counts=${result.counts.join(',')}`);

  // Compose fleetFloor.js (replace the two object literals, keep header + helpers)
  let src = fs.readFileSync(FLEET_FLOOR,'utf8'); const before = src;
  const natLit = (() => {
    const ents = NAT_ORDER.filter(s=>s in result.nationwide).map(s=>`'${s}': ${result.nationwide[s]}`);
    const lines=[]; for(let i=0;i<ents.length;i+=4) lines.push('  '+ents.slice(i,i+4).join(', ')+',');
    return 'export const FLEET_FLOOR_EUR = {\n'+lines.join('\n')+'\n};';
  })();
  const cityLit = (() => {
    const lines = CITY_IDS.map(id=>{
      const m=result.cityFloor[id]||{};
      const inner=NAT_ORDER.filter(s=>s in m).map(s=>`'${s}': ${m[s]}`).join(', ');
      return `  ${String(id).padEnd(6,' ')}: { ${inner} },`;
    });
    return 'export const FLEET_FLOOR_BY_CITY_EUR = {\n'+lines.join('\n')+'\n};';
  })();
  src = src.replace(/export const FLEET_FLOOR_EUR = \{[\s\S]*?\n\};/, natLit);
  src = src.replace(/export const FLEET_FLOOR_BY_CITY_EUR = \{[\s\S]*?\n\};/, cityLit);
  if(src===before){ throw new Error('ABORT: fleetFloor.js literals did not match for replacement'); }
  fs.writeFileSync(FLEET_FLOOR, src);

  // car_ids additions back into fleetCars.js
  let cars = fs.readFileSync(FLEET_CARS,'utf8');
  for(const [slug, ids] of Object.entries(result.added||{})){
    const re = new RegExp(`(slug: '${slug}',[\\s\\S]*?carIds: ')([^']*)(')`);
    cars = cars.replace(re, (mm,a,cur,c)=>{ const have=new Set(cur.split(',').filter(Boolean)); const neu=ids.map(String).filter(x=>!have.has(x)); return neu.length? a+cur+','+neu.join(',')+c : mm; });
  }
  fs.writeFileSync(FLEET_CARS, cars);

  const changed = Object.keys(result.added||{}).length;
  console.log(`[sync] done. nationwide slugs=${Object.keys(result.nationwide).length}, car_ids added for ${changed} models`);
}

main().catch(e=>{ console.error(e.message||e); process.exit(1); });
