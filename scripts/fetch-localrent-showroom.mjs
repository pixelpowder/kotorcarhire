#!/usr/bin/env node
// Fetch LocalRent showroom (white-bg press) photos for specific car models
// missing from the kotorcarhire fleet folder.
//
// Modeled on montenegro-car-hire-next/scripts/refetch-fleet-photos-v2.mjs.
// Outputs to tmp-localrent-preview/<slug>.jpg (hero) and <slug>-2.jpg / <slug>-3.jpg
// (gallery extras), trimmed and resized to 1400x933 inside, JPEG q90.
import https from 'https';
import fs from 'fs';
import sharp from 'sharp';

const SIG = 'key=localrent&signature=b7805902da22c24ce9d3eaa69d35ca5c&pickup_date=2026-05-15&dropoff_date=2026-05-22';
const CITY_IDS = [9, 17, 15, 5, 19, 18];

const TARGETS = {
  'renault-kadjar':        { name: /renault\s+kadjar/i },
  'vw-touran':             { name: /(vw|volkswagen)\s+touran/i },
  'citroen-c4-picasso':    { name: /citro[eë]n\s+c4\s+picasso/i },
  'citroen-c3':            { name: /citro[eë]n\s+c3(?!\s*aircross)/i },
  'dacia-sandero-stepway': { name: /dacia\s+sandero(\s+stepway)?/i },
  'fiat-500':              { name: /^fiat\s+500(?!\s*[xl])/i },
  'kia-stonic':            { name: /kia\s+stonic/i },
  'peugeot-2008':          { name: /peugeot\s+2008/i },
  'peugeot-208':           { name: /peugeot\s+208/i },
  'toyota-yaris':          { name: /toyota\s+yaris/i },
  'vw-golf':               { name: /(vw|volkswagen)\s+golf/i },
  'vw-polo':               { name: /(vw|volkswagen)\s+polo/i },
};

function get(url) {
  return new Promise((res, rej) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (r) => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(new Error('JSON parse: ' + e.message + ' body=' + d.slice(0, 200))); } });
    }).on('error', rej);
  });
}
function download(url) {
  return new Promise((res, rej) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (r) => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) return res(download(r.headers.location));
      if (r.statusCode !== 200) return rej(new Error('HTTP ' + r.statusCode));
      const chunks = [];
      r.on('data', c => chunks.push(c));
      r.on('end', () => res(Buffer.concat(chunks)));
    }).on('error', rej);
  });
}

async function fetchAllCars() {
  const all = [];
  const seen = new Set();
  for (const id of CITY_IDS) {
    let page = 1;
    while (true) {
      const json = await get(`https://www.localrent.com/api/cars/?${SIG}&pickup_city_id=${id}&dropoff_city_id=${id}&page=${page}&limit=50`);
      const cars = json.cars || [];
      for (const c of cars) {
        if (!seen.has(c.id)) { seen.add(c.id); all.push(c); }
      }
      if (cars.length < 50 || page >= 25) break;
      page++;
    }
  }
  return all;
}

function upgradeUrl(url) {
  if (/images\/files\//.test(url)) {
    return url.replace('/client_card/', '/gallery/').replace('/thumb/', '/gallery/').replace('/show/', '/gallery/');
  }
  return url;
}

async function processImage(buf, outPath) {
  await sharp(buf)
    .trim({ threshold: 15 })
    .resize(1400, 933, { fit: 'inside', withoutEnlargement: true, background: '#ffffff' })
    .flatten({ background: '#ffffff' })
    .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(outPath);
}

const OUT_DIR = 'tmp-localrent-preview';

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log('fetching car list across', CITY_IDS.length, 'cities...');
  const all = await fetchAllCars();
  console.log('total unique cars:', all.length);

  // Sanity: list all unique full_names that match the broader pattern
  const matchHints = all
    .map(c => c.full_name || '')
    .filter(n => /kadjar|touran|picasso/i.test(n));
  console.log('hint matches:', [...new Set(matchHints)]);

  for (const [slug, target] of Object.entries(TARGETS)) {
    const car = all.find(c => target.name.test(c.full_name || ''));
    if (!car) { console.log(slug, '- NOT FOUND'); continue; }
    console.log(`\n${slug} matched: "${car.full_name}" (id=${car.id})`);

    const gallery = (car.images || car.gallery || [])
      .map(u => upgradeUrl((u || '').split('?')[0]))
      .filter(Boolean);

    async function resolveHero() {
      const origUrl = (car.image_original_url || '').split('?')[0];
      if (!origUrl) return gallery[0];
      const m = origUrl.match(/^(.*?)\/(?:client_card|home|show|original)\/([^/]+)\.(webp|png|jpg)$/);
      if (!m) return gallery[0] || origUrl;
      const [, base, filename] = m;
      const tries = [
        `${base}/original/${filename}.jpg`,
        `${base}/original/${filename}.png`,
        `${base}/show/${filename}.jpg`,
        `${base}/show/${filename}.png`,
        `${base}/home/${filename}.jpg`,
        `${base}/home/${filename}.png`,
        `${base}/client_card/${filename}.webp`,
      ];
      for (const u of tries) {
        try {
          const b = await download(u);
          if (b.length > 5000) return u;
        } catch {}
      }
      return gallery[0] || origUrl;
    }
    const heroUrl = await resolveHero();
    console.log(`  hero url: ${heroUrl}`);

    if (heroUrl) {
      try {
        const buf = await download(heroUrl);
        await processImage(buf, `tmp-localrent-preview/${slug}.jpg`);
        const kb = Math.round(fs.statSync(`tmp-localrent-preview/${slug}.jpg`).size / 1024);
        const meta = await sharp(`tmp-localrent-preview/${slug}.jpg`).metadata();
        console.log(`  ${slug} hero: ${kb}KB ${meta.width}x${meta.height}`);
      } catch (e) { console.log(`  ${slug} hero FAIL:`, e.message); }
    }

    let saved = 2;
    for (let i = 0; i < gallery.length && saved <= 3; i++) {
      const u = gallery[i];
      if (!u || u === heroUrl) continue;
      try {
        const buf = await download(u);
        await processImage(buf, `tmp-localrent-preview/${slug}-${saved}.jpg`);
        const kb = Math.round(fs.statSync(`tmp-localrent-preview/${slug}-${saved}.jpg`).size / 1024);
        const meta = await sharp(`tmp-localrent-preview/${slug}-${saved}.jpg`).metadata();
        console.log(`  ${slug}-${saved}: ${kb}KB ${meta.width}x${meta.height}`);
        saved++;
      } catch (e) { console.log(`  ${slug}-${saved} FAIL:`, e.message); }
    }
  }
}

main().catch(e => { console.error(e); process.exit(1); });
