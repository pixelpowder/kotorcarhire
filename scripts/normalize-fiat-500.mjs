// Re-bake the Fiat 500 hero so its car-bounding-box height matches the
// rest of the fleet (~460px on a 1200x800 canvas). The previous version
// trimmed to 892x576, which is taller than the ~933x462 siblings, so
// the contain-fit fleet card scaled it up disproportionately and the
// Fiat 500 looked larger than every other Economy entry on the grid.
import fs from 'fs';
import sharp from 'sharp';

const SRC = 'public/img/fleet/fiat-500.jpg';
const OUT = 'public/img/fleet/fiat-500.jpg';

const canvasW = 1200, canvasH = 800;
// Sibling car heights on this site cluster around 460px (Polo, 208, C3).
// Using the same target keeps the visual scale consistent.
const targetCarH = 460;

const trimmed = await sharp(SRC).trim({ threshold: 30 }).toBuffer();
const meta = await sharp(trimmed).metadata();
const scale = targetCarH / meta.height;
const finalH = targetCarH;
const finalW = Math.round(meta.width * scale);
const resized = await sharp(trimmed)
  .resize(finalW, finalH, { kernel: 'lanczos3' })
  .toBuffer();
// Slight downward bias to match the visual rest of the grid (cars sit
// a few pixels below true centre).
const top = Math.round((canvasH - finalH) / 2 + canvasH * 0.06);
const left = Math.round((canvasW - finalW) / 2);
await sharp({
  create: { width: canvasW, height: canvasH, channels: 3, background: '#ffffff' },
})
  .composite([{ input: resized, top: Math.max(0, top), left: Math.max(0, left) }])
  .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: '4:4:4' })
  .toFile(OUT + '.tmp');
fs.renameSync(OUT + '.tmp', OUT);

const m = await sharp(OUT).metadata();
const kb = Math.round(fs.statSync(OUT).size / 1024);
console.log(`fiat-500: ${m.width}x${m.height} ${kb}KB (car ${finalW}x${finalH})`);
