// LocalRent city IDs for every Montenegro pickup point the homepage
// booking widget offers. Each value pairs a display name with the
// LocalRent city_id forwarded to /book as ?city_id=, which makes the
// LR widget boot pre-selected to that city; without it, the widget
// falls back to its hard-coded default (Kotor=9).
//
// Names use canonical Montenegrin spelling so they match the LocalRent
// store's `pickupCityName` exactly.

// Ordered list of cities for the homepage dropdown. Popular pickups first,
// then alphabetical within tier. This is the single source of truth for
// which cities the homepage offers AND their LocalRent IDs - never edit
// the dropdown list anywhere else; add a city here and it's everywhere.
export const PICKUP_LOCATIONS_ORDERED = [
  'Tivat', 'Podgorica', 'Kotor', 'Budva', 'Herceg-Novi',
  'Bar', 'Ulcinj', 'Sveti Stefan', 'Perast', 'Petrovac',
  'Bečići', 'Rafailovići', 'Pržno', 'Sutomore', 'Luštica Bay',
  'Žabljak', 'Kolašin', 'Nikšić', 'Igalo', 'Risan',
  'Orahovac', 'Prčanj', 'Bijela', 'Rose', 'Reževići',
  'Dobre Vode', 'Djenovici', 'Krasici', 'Radovici', 'Buljarica',
];

export const CITY_ID_MAP = {
  'Tivat':         17,
  'Podgorica':     15,
  'Kotor':          9,
  'Budva':          5,
  'Bar':            2,
  'Herceg-Novi':   19,
  'Ulcinj':        18,
  'Kolašin':        8,
  'Žabljak':        7,
  'Sveti Stefan':  25,
  'Perast':        33,
  'Petrovac':      39,
  'Sutomore':      29,
  'Luštica Bay':  549187,
  'Nikšić':       549113,
  'Bečići':        23,
  'Igalo':         35,
  'Rafailovići':   22,
  'Pržno':         24,
  'Risan':         34,
  'Orahovac':      32,
  'Prčanj':        36,
  'Bijela':       549193,
  'Rose':          40,
  'Reževići':      26,
  'Dobre Vode':    30,
  'Djenovici':    548985,
  'Krasici':      548984,
  'Radovici':     548966,
  'Buljarica':    548986,
};

// Build-time / module-load parity assertion. Every city in the homepage
// dropdown MUST have a city_id in the map, otherwise selecting that city
// pushes the user to /book with no ?city_id, the widget falls back to its
// default (Kotor=9), and the visible booking lands on the wrong city -
// silent regression. Equally, every city_id in the map should be on the
// dropdown (no orphans collecting dust). Throws in dev so a missing entry
// fails loudly the first time the module loads, not at the next ad-traffic
// booking.
(function assertCityParity() {
  const dropdown = new Set(PICKUP_LOCATIONS_ORDERED);
  const mapped = new Set(Object.keys(CITY_ID_MAP));
  const missing = [...dropdown].filter((c) => !mapped.has(c));
  const orphan = [...mapped].filter((c) => !dropdown.has(c));
  if (missing.length || orphan.length) {
    const msg =
      `CITY_ID_MAP / PICKUP_LOCATIONS_ORDERED parity broken. ` +
      (missing.length ? `Missing city_id: ${missing.join(', ')}. ` : '') +
      (orphan.length ? `Orphan city_id (not on dropdown): ${orphan.join(', ')}. ` : '');
    if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production') {
      throw new Error(msg);
    } else if (typeof console !== 'undefined') {
      console.error(msg);
    }
  }
})();
