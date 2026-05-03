#!/usr/bin/env node
// Probe known LocalRent image_titles base paths for ALL plausible size buckets.
// Pick the largest one that exists per car.
import https from 'https';

const SAMPLES = [
  { slug: 'toyota-yaris',   base: 'https://s3-eu-west-1.amazonaws.com/localrent.images/cars/image_titles/000/018/653', file: 'Toyota-Yaris-2015-white' },
  { slug: 'vw-polo',        base: 'https://s3-eu-west-1.amazonaws.com/localrent.images/cars/image_titles/000/020/804', file: 'VW-Polo-2019-black' },
  { slug: 'kia-stonic',     base: 'https://s3-eu-west-1.amazonaws.com/localrent.images/cars/image_titles/000/052/272', file: 'Kia-Stonic-2022-red' },
  { slug: 'renault-kadjar', base: 'https://s3-eu-west-1.amazonaws.com/localrent.images/cars/image_titles/000/048/843', file: 'Renault-Kadjar-2017-red-R' },
];

const SIZES = [
  'original', 'large', 'xlarge', 'big', 'huge', 'full', 'master',
  'gallery', 'show', 'home', 'medium', 'thumb', 'small', 'client_card',
  'card', 'detail', 'mobile', 'desktop', '2x',
];
const EXTS = ['png', 'webp', 'jpg', 'jpeg'];

function head(url) {
  return new Promise((res) => {
    const req = https.request(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } }, (r) => {
      res({ status: r.statusCode, len: r.headers['content-length'] });
    });
    req.on('error', () => res({ status: 0 }));
    req.end();
  });
}

(async () => {
  for (const s of SAMPLES) {
    console.log('\n=== ' + s.slug + ' ===');
    const found = [];
    for (const sz of SIZES) {
      for (const ext of EXTS) {
        const url = `${s.base}/${sz}/${s.file}.${ext}`;
        const r = await head(url);
        if (r.status === 200) {
          found.push({ url, len: parseInt(r.len || '0', 10) });
        }
      }
    }
    found.sort((a, b) => b.len - a.len);
    for (const f of found) console.log(`  ${(f.len/1024).toFixed(0).padStart(5)}KB  ${f.url}`);
    if (!found.length) console.log('  (nothing found)');
  }
})();
