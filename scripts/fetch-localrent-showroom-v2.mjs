#!/usr/bin/env node
// V2: iterate ALL LocalRent records matching each target slug, then pick the
// car whose press image (cars/image_titles/.../original/.jpg) is the largest
// in bytes. This handles the case where the first match is an old listing
// with a tiny press thumbnail while another listing has the same model with
// a much bigger press image.
import https from 'https';
import fs from 'fs';
import sharp from 'sharp';

const SIG = 'key=localrent&signature=b7805902da22c24ce9d3eaa69d35ca5c&pickup_date=2026-05-15&dropoff_date=2026-05-22';
const CITY_IDS = [9, 17, 15, 5, 19, 18];
const OUT_DIR = 'tmp-localrent-preview';

const TARGETS = {
  'renault-kadjar':        /renault\s+kadjar/i,
  'vw-touran':             /(vw|volkswagen)\s+touran/i,
  'citroen-c4-picasso':    /citro[eë]n\s+c4\s+picasso/i,
  'citroen-c3':            /^citro[eë]n\s+c3$/i,
  'dacia-sandero-stepway': /dacia\s+sandero(\s+stepway)?$/i,
  'fiat-500':              /^fiat\s+500$/i,
  'kia-stonic':            /kia\s+stonic/i,
  'peugeot-2008':          /peugeot\s+2008/i,
  'peugeot-208':           /peugeot\s+208/i,
  'toyota-yaris':          /^toyota\s+yaris$/i,
  'vw-golf':               /^(vw|volkswagen)\s+golf$/i,
  'vw-polo':               /^(vw|volkswagen)\s+polo$/i,
};

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

// Given a car's image_original_url (which points to .../client_card/<file>.webp),
// derive the press-image base + filename so we can probe upgrades.
function pressBase(car) {
  const u = (car.image_original_url || '').split('?')[0];
  const m = u.match(/^(.*\/cars\/image_titles\/\d{3}\/\d{3}\/\d{3})\/(?:client_card|home|show|original)\/([^/]+)\.(webp|png|jpg)$/);
  if (!m) return null;
  return { base: m[1], file: m[2] };
}

// Match the existing kotorcarhire fleet hero dims (1320x870) so all cards
// render at the same canvas. Trim source white border, then upscale with
// lanczos and pad with white to reach the target canvas.
async function processImage(buf, outPath) {
  // Step 1: trim, then upscale the trimmed car to fill ~75% of canvas height
  // with the car's baseline anchored near the bottom.
  const trimmed = await sharp(buf).trim({ threshold: 15 }).toBuffer();
  const meta = await sharp(trimmed).metadata();
  const targetW = 1320, targetH = 870;
  const carHeight = Math.round(targetH * 0.78);
  const scale = carHeight / meta.height;
  const carWidth = Math.round(meta.width * scale);
  const resized = await sharp(trimmed)
    .resize(carWidth, carHeight, { kernel: 'lanczos3' })
    .toBuffer();
  // Step 2: composite onto white canvas, horizontally centered, baseline
  // anchored at ~92% from top (so wheels sit just above bottom edge).
  const top = Math.round(targetH * 0.92) - carHeight;
  const left = Math.round((targetW - carWidth) / 2);
  await sharp({
    create: { width: targetW, height: targetH, channels: 3, background: '#ffffff' },
  })
    .composite([{ input: resized, top: Math.max(0, top), left: Math.max(0, left) }])
    .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(outPath);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log('fetching car list...');
  const all = await fetchAllCars();
  console.log('total unique cars:', all.length);

  for (const [slug, rx] of Object.entries(TARGETS)) {
    const matches = all.filter(c => rx.test(c.full_name || ''));
    if (!matches.length) { console.log(`\n${slug} - NOT FOUND`); continue; }
    console.log(`\n${slug}: ${matches.length} matches`);

    // For each match, probe original/.jpg size
    const candidates = [];
    for (const c of matches) {
      const pb = pressBase(c);
      if (!pb) continue;
      const url = `${pb.base}/original/${pb.file}.jpg`;
      const r = await head(url);
      if (r.status === 200 && r.len > 0) {
        candidates.push({ id: c.id, full_name: c.full_name, year: c.year, url, len: r.len });
      } else {
        // try png
        const url2 = `${pb.base}/original/${pb.file}.png`;
        const r2 = await head(url2);
        if (r2.status === 200 && r2.len > 0) {
          candidates.push({ id: c.id, full_name: c.full_name, year: c.year, url: url2, len: r2.len });
        }
      }
    }
    candidates.sort((a, b) => b.len - a.len);
    if (!candidates.length) { console.log(`  no press images found across ${matches.length} records`); continue; }
    console.log(`  ${candidates.length} press images. top 3:`);
    for (const c of candidates.slice(0, 3)) console.log(`    ${(c.len/1024).toFixed(0).padStart(5)}KB  id=${c.id} y=${c.year}  ${c.url}`);

    const best = candidates[0];
    try {
      const buf = await download(best.url);
      await processImage(buf, `${OUT_DIR}/${slug}.jpg`);
      const meta = await sharp(`${OUT_DIR}/${slug}.jpg`).metadata();
      const kb = Math.round(fs.statSync(`${OUT_DIR}/${slug}.jpg`).size / 1024);
      console.log(`  -> wrote ${slug}.jpg ${meta.width}x${meta.height} ${kb}KB`);
    } catch (e) {
      console.log(`  -> hero FAIL: ${e.message}`);
    }
  }
}

main().catch(e => { console.error(e); process.exit(1); });
