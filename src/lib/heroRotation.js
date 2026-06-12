// Hero rotation: pick one of the variants below based on the UTC day. Same
// image for every visitor on a given day; rotates 0 -> 1 -> 2 -> 0 each day.
// Imported by BOTH src/app/layout.jsx (the <link rel=preload>) and
// src/App.jsx (the <img>) so the preload URL always matches what the hero
// image renders. The homepage is dynamically rendered (layout reads
// headers()), so getHeroIdx() runs per request and actually rotates day to
// day instead of freezing at build time.
//
// Each variant ships two files so the <img srcset> + sizes="100vw" pair lets
// the browser pick by viewport-width * DPR: phones load the 1600w `mobile`
// file, desktop + retina load the 3000w `desktop` file.
//
// Kotor Bay shots (Pexels, free license). desktop = 3000w, mobile = 1600w,
// pulled from Pexels's resizer so the widths match the srcset descriptors.
// Add more entries to lengthen the rotation; getHeroIdx() adapts to the count.
export const HERO_IMG_VARIANTS = [
  { mobile: '/hero-1-mobile.jpg', desktop: '/hero-1.jpg' },
  { mobile: '/hero-2-mobile.jpg', desktop: '/hero-2.jpg' },
];

export function getHeroIdx() {
  const dayNumber = Math.floor(Date.now() / 86_400_000);
  return dayNumber % HERO_IMG_VARIANTS.length;
}

export function getHeroVariant(idx) {
  return HERO_IMG_VARIANTS[idx] || HERO_IMG_VARIANTS[0];
}
