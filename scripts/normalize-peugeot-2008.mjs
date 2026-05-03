#!/usr/bin/env node
// Re-bake the Peugeot 2008 hero so it has the same whitespace padding as the
// other fleet heroes (1200x800 canvas, car ~75% canvas width, centered).
import fs from 'fs';
import sharp from 'sharp';

const SRC = 'public/img/fleet/peugeot-2008.jpg';
const OUT = 'public/img/fleet/peugeot-2008.jpg';

const targetW = 1200, targetH = 800;
// Match the other heroes: car ~75% of canvas width.
const carWidthFraction = 0.75;

const trimmed = await sharp(SRC).trim({ threshold: 15 }).toBuffer();
const meta = await sharp(trimmed).metadata();
const carW = Math.round(targetW * carWidthFraction);
const scale = carW / meta.width;
const carH = Math.round(meta.height * scale);
// If scaled height exceeds 80% of canvas, scale down by height instead.
const maxCarH = Math.round(targetH * 0.78);
let finalW = carW, finalH = carH;
if (carH > maxCarH) {
  finalH = maxCarH;
  finalW = Math.round(meta.width * (finalH / meta.height));
}
const resized = await sharp(trimmed)
  .resize(finalW, finalH, { kernel: 'lanczos3' })
  .toBuffer();
const top = Math.round((targetH - finalH) / 2 + targetH * 0.06);  // slight bias toward bottom
const left = Math.round((targetW - finalW) / 2);
await sharp({
  create: { width: targetW, height: targetH, channels: 3, background: '#ffffff' },
})
  .composite([{ input: resized, top: Math.max(0, top), left: Math.max(0, left) }])
  .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: '4:4:4' })
  .toFile(OUT + '.tmp');
fs.renameSync(OUT + '.tmp', OUT);

const m = await sharp(OUT).metadata();
const kb = Math.round(fs.statSync(OUT).size / 1024);
console.log(`peugeot-2008: ${m.width}x${m.height} ${kb}KB (car ${finalW}x${finalH})`);
