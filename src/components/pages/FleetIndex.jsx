'use client';
import useTranslation from '../../i18n/useTranslation';
import ContentPage from '../../ContentPage';
import config from '../../siteConfig';
import { Users, Fuel, Settings, Briefcase, ArrowRight } from 'lucide-react';

export default function FleetIndex() {
  const { t, localePath } = useTranslation();
  const tf = (key, fb) => {
    const v = t(key);
    return v && v !== key ? v : fb;
  };

  return (
    <ContentPage
      title={tf('fleetIndex.title', 'Our Fleet for the Bay of Kotor')}
      subtitle={tf('fleetIndex.subtitle', 'Seven small-footprint cars tuned for cruise-day shore hires, Old Town parking bays and the Lovćen serpentine.')}
      image="/img/fleet/vw-polo.jpg"
      heroPosition="center"
      description={tf('fleetIndex.seoDesc', 'Kotor rental cars sized for the Bay, economy hatches and compact crossovers for cruise shore trips, Old Town gate parking and the 25 Lovćen hairpins.')}
    >
      <p>{tf('fleetIndex.intro1', 'The seven cars on this page were picked for a specific kind of Kotor day. The Old Town inside the walls is pedestrian, no car crosses the Sea Gate, the River Gate or the Gurdić bridge, so the hire does its work in a ring around it. The Tabacina bays under the bastion, the free overflow above Dobrota, the stepped pull-ins between Prčanj and Stoliv, the single-lane waterfront through Perast: all of these were laid out for sub-4-metre footprints, and every car below slots in without a three-point turn. Cruise passengers picking up for a single day get the same advantage, what fits the bay fits the cruise-terminal handover.')}</p>

      <p>{tf('fleetIndex.intro2', 'The other half of the Kotor brief is the Lovćen serpentine, the old Austrian road climbs 900 metres in 25 hairpin bends, and the smaller turning-circle cars here (208, Polo, Yaris, Fiat 500) take each corner without the kerb-tyre-scuffing that catches out bigger rental SUVs. Think of Lovćen and Njeguši as the afternoon excursion, not the main event: Kotor → Perast → Risan is 25 km of single-lane bay road, and Cetinje via the Krstac gravel spur is a lunchtime loop. Tivat Airport (TIV) is 8 km through the Vrmac tunnel, most cars arrive with 90% of tank, and parking at the airport handover point is simpler than anything downstream.')}</p>

      <p>{tf('fleetIndex.intro3', 'Two practical rules for choosing. First, pick by parking, not by power. A Golf will do Lovćen faster than a 208 but costs you at Tabacina on a July afternoon when every ground-floor bay is taken; a 208 costs you nothing either way. Second, treat fuel like a non-issue below 300 km of total driving. Cruise-day hires rarely exceed 120 km, bay-based weeks average 60 km a day, and the Yaris Hybrid, the most economical car on this list, saves you roughly €25 over a seven-night stay compared to the thirstiest. The car that is happy at the end of every drive matters more in Kotor than the one that finishes each drive first.')}</p>

      <div className="fleet-index-grid">
        {config.cars.map((car) => {
          const tk = (sub, fallback) => {
            const val = t(`cars.${car.slug}.${sub}`);
            return val && val !== `cars.${car.slug}.${sub}` ? val : fallback;
          };
          const name = tk('name', car.name);
          const tagline = tk('tagline', car.tagline);
          const category = tk('category', car.category);
          const consumption = car.details?.consumption;

          return (
            <a
              key={car.slug}
              href={localePath(`/cars/${car.slug}`)}
              className="fleet-index-card"
            >
              <div className="fleet-index-card__img" style={{ backgroundImage: `url(${car.image})` }}>
                <span className="fleet-index-card__tag">{category}</span>
              </div>
              <div className="fleet-index-card__body">
                <h3 className="fleet-index-card__name">{name}</h3>
                <p className="fleet-index-card__tagline">{tagline}</p>
                <div className="fleet-index-card__specs">
                  <span><Users size={14} /> {car.seats}</span>
                  <span><Settings size={14} /> {car.transmission.slice(0,4)}</span>
                  <span><Fuel size={14} /> {car.fuel}</span>
                  <span><Briefcase size={14} /> {car.luggage}</span>
                </div>
                {consumption && (
                  <div className="fleet-index-card__extra">
                    {consumption}
                  </div>
                )}
                <div className="fleet-index-card__footer">
                  <span className="fleet-index-card__arrow">
                    {tf('cars.readGuide', 'Read guide')} <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </ContentPage>
  );
}
