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
  'fiat-500': 60, 'citroen-c3': 38, 'toyota-yaris': 42, 'vw-golf': 51,
  'peugeot-2008': 46, 'renault-kadjar': 62, 'dacia-sandero': 45, 'renault-megane': 50,
  'citroen-c4-picasso': 61,
};

// Per-pickup floors, keyed by LocalRent city_id. Empty until the first cloud
// sync runs; getFloorFor() falls back to the nationwide map meanwhile.
export const FLEET_FLOOR_BY_CITY_EUR = {
  2     : { 'fiat-500': 75, 'citroen-c3': 42, 'toyota-yaris': 45, 'vw-golf': 60, 'peugeot-2008': 61, 'renault-kadjar': 65, 'renault-megane': 55, 'citroen-c4-picasso': 61 },
  5     : { 'fiat-500': 60, 'citroen-c3': 42, 'toyota-yaris': 42, 'vw-golf': 51, 'peugeot-2008': 61, 'renault-kadjar': 65, 'renault-megane': 50, 'citroen-c4-picasso': 61 },
  7     : { 'citroen-c3': 95, 'toyota-yaris': 113, 'vw-golf': 88, 'peugeot-2008': 69, 'renault-kadjar': 113, 'dacia-sandero': 88, 'renault-megane': 103 },
  8     : { 'citroen-c3': 81, 'toyota-yaris': 68, 'vw-golf': 80, 'peugeot-2008': 72, 'renault-kadjar': 98, 'renault-megane': 88 },
  9     : { 'fiat-500': 63, 'citroen-c3': 38, 'toyota-yaris': 42, 'vw-golf': 56, 'peugeot-2008': 46, 'renault-kadjar': 62, 'renault-megane': 55, 'citroen-c4-picasso': 61 },
  15    : { 'fiat-500': 70, 'citroen-c3': 42, 'toyota-yaris': 45, 'vw-golf': 51, 'peugeot-2008': 46, 'renault-kadjar': 65, 'dacia-sandero': 45, 'renault-megane': 50, 'citroen-c4-picasso': 61 },
  17    : { 'fiat-500': 63, 'citroen-c3': 38, 'toyota-yaris': 42, 'vw-golf': 51, 'peugeot-2008': 46, 'renault-kadjar': 62, 'renault-megane': 50, 'citroen-c4-picasso': 61 },
  18    : { 'fiat-500': 86, 'citroen-c3': 42, 'toyota-yaris': 45, 'vw-golf': 80, 'peugeot-2008': 61, 'renault-kadjar': 70, 'renault-megane': 60, 'citroen-c4-picasso': 61 },
  19    : { 'fiat-500': 86, 'citroen-c3': 50, 'toyota-yaris': 54, 'vw-golf': 79, 'peugeot-2008': 46, 'renault-kadjar': 70, 'renault-megane': 60, 'citroen-c4-picasso': 70 },
  22    : { 'fiat-500': 60, 'citroen-c3': 44, 'toyota-yaris': 42, 'vw-golf': 51, 'peugeot-2008': 63, 'renault-kadjar': 65, 'renault-megane': 50, 'citroen-c4-picasso': 63 },
  23    : { 'fiat-500': 60, 'citroen-c3': 42, 'toyota-yaris': 42, 'vw-golf': 51, 'peugeot-2008': 61, 'renault-kadjar': 65, 'renault-megane': 50, 'citroen-c4-picasso': 61 },
  24    : { 'fiat-500': 60, 'citroen-c3': 42, 'toyota-yaris': 42, 'vw-golf': 51, 'peugeot-2008': 61, 'renault-kadjar': 65, 'renault-megane': 50, 'citroen-c4-picasso': 61 },
  25    : { 'fiat-500': 66, 'citroen-c3': 42, 'toyota-yaris': 42, 'vw-golf': 51, 'peugeot-2008': 61, 'renault-kadjar': 65, 'renault-megane': 50, 'citroen-c4-picasso': 61 },
  26    : { 'fiat-500': 60, 'citroen-c3': 42, 'toyota-yaris': 42, 'vw-golf': 54, 'peugeot-2008': 61, 'renault-kadjar': 65, 'renault-megane': 53, 'citroen-c4-picasso': 61 },
  29    : { 'fiat-500': 69, 'citroen-c3': 42, 'toyota-yaris': 45, 'vw-golf': 58, 'peugeot-2008': 61, 'renault-kadjar': 65, 'dacia-sandero': 60, 'renault-megane': 55, 'citroen-c4-picasso': 61 },
  30    : { 'fiat-500': 83, 'citroen-c3': 42, 'toyota-yaris': 45, 'vw-golf': 60, 'peugeot-2008': 61, 'renault-kadjar': 70, 'renault-megane': 60, 'citroen-c4-picasso': 61 },
  32    : { 'fiat-500': 63, 'citroen-c3': 38, 'toyota-yaris': 45, 'vw-golf': 60, 'peugeot-2008': 46, 'renault-kadjar': 62, 'renault-megane': 55, 'citroen-c4-picasso': 61 },
  34    : { 'fiat-500': 73, 'citroen-c3': 41, 'toyota-yaris': 45, 'vw-golf': 59, 'peugeot-2008': 46, 'renault-kadjar': 65, 'renault-megane': 55, 'citroen-c4-picasso': 61 },
  35    : { 'fiat-500': 86, 'citroen-c3': 50, 'toyota-yaris': 54, 'vw-golf': 82, 'peugeot-2008': 46, 'renault-kadjar': 70, 'renault-megane': 60, 'citroen-c4-picasso': 70 },
  36    : { 'fiat-500': 63, 'citroen-c3': 38, 'toyota-yaris': 45, 'vw-golf': 56, 'peugeot-2008': 46, 'renault-kadjar': 62, 'renault-megane': 55, 'citroen-c4-picasso': 61 },
  39    : { 'citroen-c3': 42, 'toyota-yaris': 42, 'vw-golf': 54, 'peugeot-2008': 61, 'renault-kadjar': 65, 'renault-megane': 53, 'citroen-c4-picasso': 61 },
  40    : { 'citroen-c3': 48, 'toyota-yaris': 51, 'vw-golf': 59, 'peugeot-2008': 46, 'renault-kadjar': 70, 'renault-megane': 60, 'citroen-c4-picasso': 70 },
  548966: { 'fiat-500': 60, 'citroen-c3': 38, 'toyota-yaris': 45, 'vw-golf': 56, 'peugeot-2008': 61, 'renault-kadjar': 62, 'renault-megane': 55, 'citroen-c4-picasso': 61 },
  548984: { 'fiat-500': 63, 'citroen-c3': 38, 'toyota-yaris': 45, 'vw-golf': 56, 'peugeot-2008': 46, 'renault-kadjar': 62, 'renault-megane': 55, 'citroen-c4-picasso': 61 },
  548985: { 'fiat-500': 83, 'citroen-c3': 42, 'toyota-yaris': 45, 'vw-golf': 73, 'peugeot-2008': 46, 'renault-kadjar': 70, 'renault-megane': 60, 'citroen-c4-picasso': 61 },
  548986: { 'citroen-c3': 42, 'toyota-yaris': 42, 'vw-golf': 60, 'peugeot-2008': 61, 'renault-kadjar': 65, 'renault-megane': 55, 'citroen-c4-picasso': 61 },
  549113: { 'citroen-c3': 50, 'toyota-yaris': 53, 'vw-golf': 102, 'peugeot-2008': 46, 'renault-kadjar': 94, 'citroen-c4-picasso': 69 },
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
