#!/usr/bin/env node
// Normalize ALL fleet hero images to identical canvas (1200x800), identical
// car-to-canvas ratio (~75% width or 78% height, whichever fits), and a
// consistent slightly-low-of-center vertical position. Backs up originals
// to public/img/fleet/_pre-normalize/ before overwriting.
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const FLEET_DIR = 'public/img/fleet';
const BACKUP_DIR = 'public/img/fleet/_pre-normalize';
const HEROES = [
  'vw-polo','fiat-500','peugeot-208','citroen-c3','toyota-yaris','vw-golf',
  'kia-stonic','peugeot-2008','renault-kadjar','dacia-sandero-stepway',
  'renault-megane','citroen-c4-picasso',
];

const targetW = 1200, targetH = 800;
const carMaxWFrac = 0.78;
const carMaxHFrac = 0.72;
const verticalBiasDown = 0.04; // car center sits 4% below canvas center

fs.mkdirSync(BACKUP_DIR, { recursive: true });

for (const slug of HEROES) {
  const src = path.join(FLEET_DIR, `${slug}.jpg`);
  if (!fs.existsSync(src)) { console.log(`${slug} - SKIP (missing)`); continue; }
  // Back up
  const bak = path.join(BACKUP_DIR, `${slug}.jpg`);
  if (!fs.existsSync(bak)) fs.copyFileSync(src, bak);

  const trimmed = await sharp(src).trim({ threshold: 15 }).toBuffer();
  const meta = await sharp(trimmed).metadata();
  // Fit car into max width OR max height, whichever is more constraining.
  const sW = (targetW * carMaxWFrac) / meta.width;
  const sH = (targetH * carMaxHFrac) / meta.height;
  const scale = Math.min(sW, sH);
  const finalW = Math.round(meta.width * scale);
  const finalH = Math.round(meta.height * scale);
  const resized = await sharp(trimmed)
    .resize(finalW, finalH, { kernel: 'lanczos3' })
    .toBuffer();
  const top = Math.round((targetH - finalH) / 2 + targetH * verticalBiasDown);
  const left = Math.round((targetW - finalW) / 2);
  await sharp({
    create: { width: targetW, height: targetH, channels: 3, background: '#ffffff' },
  })
    .composite([{ input: resized, top: Math.max(0, top), left: Math.max(0, left) }])
    .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(src + '.tmp');
  fs.renameSync(src + '.tmp', src);

  const kb = Math.round(fs.statSync(src).size / 1024);
  console.log(`${slug.padEnd(24)} -> car ${finalW}x${finalH}  canvas ${targetW}x${targetH}  ${kb}KB`);
}
console.log('\ndone. originals in', BACKUP_DIR);
