#!/usr/bin/env node
// Dump the FULL API record for a target car and probe every URL field for
// larger size variants. Looking for any high-res LocalRent press image we
// might have missed.
import https from 'https';

const SIG = 'key=localrent&signature=b7805902da22c24ce9d3eaa69d35ca5c&pickup_date=2026-05-15&dropoff_date=2026-05-22';

function get(url) {
  return new Promise((res, rej) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (r) => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(e); } });
    }).on('error', rej);
  });
}
function head(url) {
  return new Promise((res) => {
    const req = https.request(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } }, (r) => {
      res({ status: r.statusCode, len: parseInt(r.headers['content-length'] || '0', 10) });
    });
    req.on('error', () => res({ status: 0 }));
    req.end();
  });
}

const TARGET_NAMES = [/renault\s+kadjar/i, /toyota\s+yaris/i, /vw|volkswagen\s+polo/i];

(async () => {
  const json = await get(`https://www.localrent.com/api/cars/?${SIG}&pickup_city_id=9&dropoff_city_id=9&page=1&limit=50`);
  for (const car of json.cars || []) {
    if (!TARGET_NAMES.some(r => r.test(car.full_name || ''))) continue;

    console.log('\n================');
    console.log('CAR:', car.full_name, 'id=' + car.id);
    console.log('================');

    // Print every key with its value (truncate long arrays/strings)
    for (const [k, v] of Object.entries(car)) {
      if (typeof v === 'string') console.log(`  ${k}: ${v.slice(0, 200)}`);
      else if (Array.isArray(v)) {
        console.log(`  ${k}: [${v.length}]`);
        for (const item of v.slice(0, 6)) console.log(`     - ${typeof item === 'string' ? item.slice(0, 200) : JSON.stringify(item).slice(0, 200)}`);
      }
      else if (v && typeof v === 'object') console.log(`  ${k}: ${JSON.stringify(v).slice(0, 200)}`);
      else console.log(`  ${k}: ${v}`);
    }

    // Collect every URL we see and probe upgrades
    const allUrls = new Set();
    const collect = (v) => {
      if (typeof v === 'string' && /\bhttps?:\/\//.test(v)) allUrls.add(v.split('?')[0]);
      else if (Array.isArray(v)) v.forEach(collect);
      else if (v && typeof v === 'object') Object.values(v).forEach(collect);
    };
    collect(car);

    console.log('\n  --- URL upgrades probed ---');
    for (const u of allUrls) {
      if (!/localrent\.images/.test(u)) continue;
      // Try replacing the size segment with several alternatives
      const m = u.match(/^(.*?)\/(client_card|small|home|show|original|gallery|thumb|large|big)\/([^/]+)\.(webp|png|jpg|jpeg)$/);
      if (!m) continue;
      const [, base, , file, ] = m;
      const candidates = [
        `${base}/original/${file}.jpg`,
        `${base}/original/${file}.png`,
        `${base}/original/${file}.webp`,
        `${base}/large/${file}.jpg`,
        `${base}/gallery/${file}.jpg`,
        `${base}/gallery/${file}.webp`,
        `${base}/show/${file}.jpg`,
      ];
      for (const c of candidates) {
        const r = await head(c);
        if (r.status === 200 && r.len > 50000) {
          console.log(`     ${(r.len/1024).toFixed(0).padStart(5)}KB  ${c}`);
        }
      }
    }
  }
})().catch(e => { console.error(e); process.exit(1); });
