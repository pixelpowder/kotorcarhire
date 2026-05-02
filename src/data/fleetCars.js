// Curated LocalRent listings featured on the homepage Fleet grid.
// Each entry's `slug` is the URL identifier (/book?model=<slug>) and
// `carIds` is a comma-separated list of every LocalRent vendor listing
// ID for that model. Shared between App.jsx (homepage links) and
// BookPage.jsx (URL → car_ids resolution) so the source of truth lives
// in one place.
//
// IDs scraped from LocalRent's filtered listing — refresh by re-running
// the brand-paginate-collect script in the car-hire skill.
//
// `id` is the lead vendor listing for that model (used as React key
// and as fallback for the local car-detail image map). `siteSlug` maps
// to siteConfig.cars when present so the homepage card can pull the
// local fleet image; cards with `image` instead bypass that lookup.

export const HOMEPAGE_BOOKING_CARS = [
  { slug: 'vw-polo',              id: 5756,   name: 'VW Polo',              category: 'Economy',   carIds: '5756,47278,16221,61891,45336,44220,62672,53199,30630', siteSlug: 'vw-polo' },
  { slug: 'fiat-500',             id: 64299,  name: 'Fiat 500',             category: 'Economy',   carIds: '64299,158191,31876,47008', siteSlug: 'fiat-500' },
  { slug: 'peugeot-208',          id: 26451,  name: 'Peugeot 208',          category: 'Economy',   carIds: '26451,11094,88677,144459,42650,169029,92397,113143', siteSlug: 'peugeot-208' },
  { slug: 'citroen-c3',           id: 68317,  name: 'Citroen C3',           category: 'Economy',   carIds: '41909,20865,68317,85926,43351,159867,74198,97133,93615,93035,85564,10740,87976,63398,96523,86323,124829,46113,96339', siteSlug: 'citroen-c3' },
  { slug: 'toyota-yaris',         id: 41909,  name: 'Toyota Yaris',         category: 'Economy',   carIds: '20873,9399,43329,14591,12948,88601,7010,26892,62030,53505,55075,15567,156953,20680,86364,58591,35817,35819,167691,71782,42791,59764,5014,61544,53868,83583,64497,82055,91112,68348,61546,66151,83591,91115,26317,89645,46076,46078,24485,167725,88816,49712,9456,22292,91324,65049,48734,35829,25323,25327,169021', siteSlug: 'toyota-yaris' },
  { slug: 'vw-golf',              id: 9195,   name: 'VW Golf',              category: 'Compact',   carIds: '9195,23510,21508,93423,39054,21970,66195,59511,43306,165625,59621,43334,60335,85148,21183,160421,171919,76809', siteSlug: 'vw-golf' },
  { slug: 'kia-stonic',           id: 131035, name: 'Kia Stonic',           category: 'Crossover', carIds: '131035,53626,61336', siteSlug: 'kia-stonic' },
  { slug: 'peugeot-2008',         id: 74121,  name: 'Peugeot 2008',         category: 'SUV',       carIds: '74121,61813,65386,55867,92487,62957', image: '/img/fleet/peugeot-2008.jpg' },
  { slug: 'renault-kadjar',       id: 52579,  name: 'Renault Kadjar',       category: 'SUV',       carIds: '52579,64947,55108,46382,59149,164541', image: '/img/fleet/renault-kadjar.jpg' },
  { slug: 'dacia-sandero',        id: 84393,  name: 'Dacia Sandero Stepway',category: 'Crossover', carIds: '9196,87870,101055', image: '/img/fleet/dacia-sandero-stepway.jpg' },
  { slug: 'renault-megane',       id: 60069,  name: 'Renault Megane',       category: 'Compact',   carIds: '16146,60069,61549,62008,51124,46088,44867,169935,62836,135759,157461', image: '/img/fleet/renault-megane.jpg' },
  { slug: 'citroen-c4-picasso',   id: 8860,   name: 'Citroen C4 Picasso',   category: 'MPV',       carIds: '50772,60832,67993', image: '/img/fleet/citroen-c4-picasso.jpg' },
];

export const FLEET_SLUG_TO_CAR_IDS = Object.fromEntries(
  HOMEPAGE_BOOKING_CARS.map(c => [c.slug, c.carIds])
);
