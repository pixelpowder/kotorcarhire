// Per-model "from" floor prices (EUR/day), refreshed every 4 hours by the
// cloud LocalRent sync (.github/workflows/localrent-sync.yml +
// scripts/localrent-cloud-sync.mjs). Read the widget's live signed search
// URL for the today+7 window so card prices match the click.
//
//   FLEET_FLOOR_EUR        — nationwide minimum across every pickup city
//                            (homepage fleet grid).
//   FLEET_FLOOR_BY_CITY_EUR — per-pickup floor keyed by LocalRent city_id
//                            (location-page sliders, via getFloorFor).
//
// Initial values below are the previous hardcoded inline floors from App.jsx;
// the first cloud sync replaces them with live data. Always read through
// getFloorFor() so the city -> nationwide -> null fallback chain is consistent.

export const FLEET_FLOOR_EUR = {
  'vw-polo': 39, 'fiat-500': 60, 'citroen-c3': 38, 'toyota-yaris': 41,
  'vw-golf': 52, 'peugeot-2008': 46, 'renault-kadjar': 62, 'dacia-sandero': 45,
  'renault-megane': 50, 'citroen-c4-picasso': 61,
};

// Per-pickup floors, keyed by LocalRent city_id. Empty until the first cloud
// sync runs; getFloorFor() falls back to the nationwide map meanwhile.
export const FLEET_FLOOR_BY_CITY_EUR = {
  2     : { 'vw-polo': 39, 'fiat-500': 75, 'citroen-c3': 42, 'toyota-yaris': 48, 'vw-golf': 60, 'peugeot-2008': 61, 'renault-kadjar': 65, 'renault-megane': 55, 'citroen-c4-picasso': 61 },
  5     : { 'vw-polo': 39, 'fiat-500': 60, 'citroen-c3': 42, 'toyota-yaris': 41, 'vw-golf': 52, 'peugeot-2008': 61, 'renault-kadjar': 65, 'renault-megane': 50, 'citroen-c4-picasso': 61 },
  7     : { 'vw-polo': 82, 'citroen-c3': 110, 'toyota-yaris': 113, 'vw-golf': 88, 'peugeot-2008': 69, 'renault-kadjar': 112, 'dacia-sandero': 88, 'renault-megane': 103 },
  8     : { 'vw-polo': 74, 'citroen-c3': 110, 'toyota-yaris': 67, 'vw-golf': 80, 'peugeot-2008': 72, 'renault-kadjar': 98, 'renault-megane': 88 },
  9     : { 'vw-polo': 44, 'fiat-500': 63, 'citroen-c3': 38, 'toyota-yaris': 41, 'vw-golf': 58, 'peugeot-2008': 46, 'renault-kadjar': 62, 'renault-megane': 55, 'citroen-c4-picasso': 61 },
  15    : { 'vw-polo': 39, 'fiat-500': 70, 'citroen-c3': 42, 'toyota-yaris': 44, 'vw-golf': 52, 'peugeot-2008': 46, 'renault-kadjar': 65, 'dacia-sandero': 45, 'renault-megane': 50, 'citroen-c4-picasso': 61 },
  17    : { 'vw-polo': 39, 'fiat-500': 63, 'citroen-c3': 38, 'toyota-yaris': 41, 'vw-golf': 52, 'peugeot-2008': 46, 'renault-kadjar': 62, 'renault-megane': 50, 'citroen-c4-picasso': 61 },
  18    : { 'vw-polo': 65, 'fiat-500': 86, 'citroen-c3': 42, 'toyota-yaris': 67, 'vw-golf': 80, 'peugeot-2008': 61, 'renault-kadjar': 69, 'renault-megane': 60, 'citroen-c4-picasso': 61 },
  19    : { 'vw-polo': 59, 'fiat-500': 86, 'citroen-c3': 50, 'toyota-yaris': 56, 'vw-golf': 79, 'peugeot-2008': 46, 'renault-kadjar': 69, 'renault-megane': 60, 'citroen-c4-picasso': 70 },
  22    : { 'vw-polo': 39, 'fiat-500': 60, 'citroen-c3': 44, 'toyota-yaris': 41, 'vw-golf': 52, 'peugeot-2008': 63, 'renault-kadjar': 65, 'renault-megane': 50, 'citroen-c4-picasso': 63 },
  23    : { 'vw-polo': 39, 'fiat-500': 60, 'citroen-c3': 42, 'toyota-yaris': 41, 'vw-golf': 52, 'peugeot-2008': 61, 'renault-kadjar': 65, 'renault-megane': 50, 'citroen-c4-picasso': 61 },
  24    : { 'vw-polo': 39, 'fiat-500': 60, 'citroen-c3': 42, 'toyota-yaris': 41, 'vw-golf': 52, 'peugeot-2008': 61, 'renault-kadjar': 65, 'renault-megane': 50, 'citroen-c4-picasso': 61 },
  25    : { 'vw-polo': 39, 'fiat-500': 66, 'citroen-c3': 42, 'toyota-yaris': 41, 'vw-golf': 52, 'peugeot-2008': 61, 'renault-kadjar': 65, 'renault-megane': 50, 'citroen-c4-picasso': 61 },
  26    : { 'vw-polo': 39, 'fiat-500': 60, 'citroen-c3': 42, 'toyota-yaris': 41, 'vw-golf': 55, 'peugeot-2008': 61, 'renault-kadjar': 65, 'renault-megane': 53, 'citroen-c4-picasso': 61 },
  29    : { 'vw-polo': 48, 'fiat-500': 69, 'citroen-c3': 42, 'toyota-yaris': 47, 'vw-golf': 59, 'peugeot-2008': 61, 'renault-kadjar': 65, 'dacia-sandero': 60, 'renault-megane': 55, 'citroen-c4-picasso': 61 },
  30    : { 'vw-polo': 51, 'fiat-500': 83, 'citroen-c3': 42, 'toyota-yaris': 50, 'vw-golf': 60, 'peugeot-2008': 61, 'renault-kadjar': 69, 'renault-megane': 60, 'citroen-c4-picasso': 61 },
  32    : { 'vw-polo': 45, 'fiat-500': 63, 'citroen-c3': 38, 'toyota-yaris': 48, 'vw-golf': 60, 'peugeot-2008': 46, 'renault-kadjar': 62, 'renault-megane': 55, 'citroen-c4-picasso': 61 },
  34    : { 'vw-polo': 54, 'fiat-500': 73, 'citroen-c3': 41, 'toyota-yaris': 48, 'vw-golf': 60, 'peugeot-2008': 46, 'renault-kadjar': 65, 'renault-megane': 55, 'citroen-c4-picasso': 61 },
  35    : { 'vw-polo': 62, 'fiat-500': 86, 'citroen-c3': 50, 'toyota-yaris': 63, 'vw-golf': 82, 'peugeot-2008': 46, 'renault-kadjar': 69, 'renault-megane': 60, 'citroen-c4-picasso': 70 },
  36    : { 'vw-polo': 44, 'fiat-500': 63, 'citroen-c3': 38, 'toyota-yaris': 47, 'vw-golf': 58, 'peugeot-2008': 46, 'renault-kadjar': 62, 'renault-megane': 55, 'citroen-c4-picasso': 61 },
  39    : { 'vw-polo': 39, 'citroen-c3': 42, 'toyota-yaris': 41, 'vw-golf': 55, 'peugeot-2008': 61, 'renault-kadjar': 65, 'renault-megane': 53, 'citroen-c4-picasso': 61 },
  40    : { 'vw-polo': 45, 'citroen-c3': 48, 'toyota-yaris': 50, 'vw-golf': 59, 'peugeot-2008': 46, 'renault-kadjar': 69, 'renault-megane': 60, 'citroen-c4-picasso': 70 },
  548966: { 'vw-polo': 42, 'fiat-500': 60, 'citroen-c3': 38, 'toyota-yaris': 48, 'vw-golf': 58, 'peugeot-2008': 61, 'renault-kadjar': 62, 'renault-megane': 55, 'citroen-c4-picasso': 61 },
  548984: { 'vw-polo': 42, 'fiat-500': 63, 'citroen-c3': 38, 'toyota-yaris': 47, 'vw-golf': 58, 'peugeot-2008': 46, 'renault-kadjar': 62, 'renault-megane': 55, 'citroen-c4-picasso': 61 },
  548985: { 'vw-polo': 54, 'fiat-500': 83, 'citroen-c3': 42, 'toyota-yaris': 57, 'vw-golf': 73, 'peugeot-2008': 46, 'renault-kadjar': 69, 'renault-megane': 60, 'citroen-c4-picasso': 61 },
  548986: { 'vw-polo': 42, 'citroen-c3': 42, 'toyota-yaris': 41, 'vw-golf': 60, 'peugeot-2008': 61, 'renault-kadjar': 65, 'renault-megane': 55, 'citroen-c4-picasso': 61 },
  549113: { 'citroen-c3': 50, 'vw-golf': 102, 'peugeot-2008': 46, 'renault-kadjar': 94, 'citroen-c4-picasso': 69 },
  549193: { 'vw-golf': 70, 'peugeot-2008': 46 },
};

// Resolve the floor for a slug at a given pickup city: city floor, else
// nationwide, else null (callers fall through to their own fallback).
export function getFloorFor(slug, cityId) {
  if (!slug) return null;
  if (cityId != null) {
    const cityMap = FLEET_FLOOR_BY_CITY_EUR[cityId];
    const v = cityMap && cityMap[slug];
    if (typeof v === 'number' && v > 0) return v;
  }
  const g = FLEET_FLOOR_EUR[slug];
  return typeof g === 'number' && g > 0 ? g : null;
}

// Cheapest "from €X/day" at a given pickup city: the min per-model floor for
// that city_id (its own prices when present, else nationwide). Returns null
// if no data.
export function getLocationFloor(cityId) {
  const cityMap = cityId != null ? FLEET_FLOOR_BY_CITY_EUR[cityId] : null;
  const pool = cityMap && Object.keys(cityMap).length ? cityMap : FLEET_FLOOR_EUR;
  let min = null;
  for (const v of Object.values(pool)) {
    if (typeof v === 'number' && v > 0 && (min == null || v < min)) min = v;
  }
  return min;
}
