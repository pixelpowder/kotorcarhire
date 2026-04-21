import { t, buildAlternates } from '../metadata';
import FleetIndex from '@/src/components/pages/FleetIndex';

const SITE = 'https://www.kotorcarhire.com';

export async function generateMetadata() {
  const titleKey = 'fleetIndex.title';
  const titleT = t('en', titleKey);
  const baseTitle = titleT !== titleKey ? titleT : 'Our Fleet for the Bay of Kotor';
  const title = `${baseTitle} | Kotor Car Hire`;
  const descKey = 'fleetIndex.seoDesc';
  const descT = t('en', descKey);
  const description = descT !== descKey
    ? descT
    : 'Kotor rental cars sized for the Bay — economy hatches and compact crossovers for cruise shore trips, Old Town gate parking and the 25 Lovćen hairpins.';
  return {
    title,
    description,
    alternates: buildAlternates('cars'),
    openGraph: {
      title,
      description,
      url: `${SITE}/cars`,
      type: 'website',
      images: [{ url: `${SITE}/img/fleet/vw-polo.jpg`, width: 1200, height: 800, alt: 'Kotor Car Hire fleet' }],
    },
  };
}

export default function FleetIndexRoute() {
  return <FleetIndex />;
}
