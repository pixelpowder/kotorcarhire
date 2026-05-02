#!/usr/bin/env node
// One-off: pull specific color variants for Kadjar (red) and Sandero Stepway
// (blue), then process with the same canvas pipeline as fetch-localrent-showroom-v2.
import https from 'https';
import sharp from 'sharp';

const PICKS = {
  'renault-kadjar':        'https://s3-eu-west-1.amazonaws.com/localrent.images/cars/image_titles/000/048/843/original/Renault-Kadjar-2017-red-R.jpg',
  'dacia-sandero-stepway': 'https://s3-eu-west-1.amazonaws.com/localrent.images/cars/image_titles/000/062/185/original/Dacia-Sandero-Stepway-2017-blue.jpg',
};

function download(url) {
  return new Promise((res, rej) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (r) => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) return res(download(r.headers.location));
      if (r.statusCode !== 200) return rej(new Error('HTTP ' + r.statusCode + ' for ' + url));
      const chunks = [];
      r.on('data', c => chunks.push(c));
      r.on('end', () => res(Buffer.concat(chunks)));
    }).on('error', rej);
  });
}

async function processImage(buf, outPath) {
  const trimmed = await sharp(buf).trim({ threshold: 15 }).toBuffer();
  const meta = await sharp(trimmed).metadata();
  const targetW = 1320, targetH = 870;
  const carHeight = Math.round(targetH * 0.78);
  const scale = carHeight / meta.height;
  const carWidth = Math.round(meta.width * scale);
  const resized = await sharp(trimmed)
    .resize(carWidth, carHeight, { kernel: 'lanczos3' })
    .toBuffer();
  const top = Math.round(targetH * 0.92) - carHeight;
  const left = Math.round((targetW - carWidth) / 2);
  await sharp({
    create: { width: targetW, height: targetH, channels: 3, background: '#ffffff' },
  })
    .composite([{ input: resized, top: Math.max(0, top), left: Math.max(0, left) }])
    .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(outPath);
}

(async () => {
  for (const [slug, url] of Object.entries(PICKS)) {
    const buf = await download(url);
    const out = `tmp-localrent-preview/${slug}.jpg`;
    await processImage(buf, out);
    const meta = await sharp(out).metadata();
    console.log(`${slug}: ${meta.width}x${meta.height}  <- ${url}`);
  }
})().catch(e => { console.error(e); process.exit(1); });
