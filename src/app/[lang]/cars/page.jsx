import { t, buildAlternates, OG_LOCALE } from '../../metadata';
import FleetIndex from '@/src/components/pages/FleetIndex';

const SITE = 'https://www.kotorcarhire.com';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const descKey = 'fleetIndex.seoDesc';
  const descTranslated = t(lang, descKey);
  const description = descTranslated !== descKey
    ? descTranslated
    : 'Kotor rental cars sized for the Bay, economy hatches and compact crossovers for cruise shore trips, Old Town gate parking and the 25 Lovćen hairpins.';
  const titleTranslated = t(lang, 'fleetIndex.title');
  const baseTitle = titleTranslated !== 'fleetIndex.title' ? titleTranslated : 'Our Fleet for the Bay of Kotor';
  const title = `${baseTitle} | Kotor Car Hire`;
  return {
    title,
    description,
    alternates: buildAlternates('cars', lang),
    openGraph: {
      title,
      description,
      url: `${SITE}/${lang}/cars`,
      type: 'website',
      locale: OG_LOCALE[lang] || 'en_US',
      images: [{ url: `${SITE}/img/fleet/vw-polo.jpg`, width: 1200, height: 800, alt: baseTitle }],
    },
  };
}

export default function LangFleetIndexRoute() {
  return <FleetIndex />;
}
