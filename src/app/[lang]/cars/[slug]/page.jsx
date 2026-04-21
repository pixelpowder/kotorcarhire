import { notFound } from 'next/navigation';
import { buildAlternates, OG_LOCALE } from '../../../metadata';
import { SUPPORTED_LANGS, DEFAULT_LANG } from '@/src/i18n/languages';
import config from '@/src/siteConfig';
import { carMetas } from '@/src/data/carMetas';
import CarDetail from '@/src/components/pages/CarDetail';

const SITE = 'https://www.kotorcarhire.com';
const LANG_PREFIXES = SUPPORTED_LANGS.filter(l => l !== DEFAULT_LANG);

export function generateStaticParams() {
  const params = [];
  for (const lang of LANG_PREFIXES) {
    for (const car of config.cars) {
      params.push({ lang, slug: car.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const car = config.cars.find(c => c.slug === slug);
  if (!car) return {};

  const meta = carMetas[slug]?.[lang] || carMetas[slug]?.en;
  const title = meta?.title || `${car.name} | Kotor Car Hire`;
  const description = meta?.desc || `${car.name} rental guide for the Bay of Kotor.`;
  return {
    title,
    description,
    alternates: buildAlternates(`cars/${slug}`, lang),
    openGraph: {
      title,
      description,
      url: `${SITE}/${lang}/cars/${slug}`,
      type: 'website',
      locale: OG_LOCALE[lang] || 'en_US',
      images: [{ url: `${SITE}${car.image}`, width: 1200, height: 800, alt: car.name }],
    },
  };
}

export default async function LangCarDetailRoute({ params }) {
  const { lang, slug } = await params;
  const car = config.cars.find(c => c.slug === slug);
  if (!car) notFound();

  // Localized description for schema — prefer hand-written meta description per locale
  const localizedDesc =
    carMetas[slug]?.[lang]?.desc ||
    carMetas[slug]?.en?.desc ||
    car.suitability;

  // Vehicle schema — no price (pricing is dynamic, handled by the booking widget)
  const vehicleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    'name': car.name,
    'description': localizedDesc,
    'image': `${SITE}${car.image}`,
    'brand': { '@type': 'Brand', 'name': car.name.split(' ')[0] },
    'vehicleSeatingCapacity': car.seats,
    'vehicleTransmission': car.transmission,
    'fuelType': car.fuel,
    'inLanguage': lang === 'me' ? 'cnr' : lang,
    ...(car.details?.consumption && { 'fuelConsumption': car.details.consumption }),
    ...(car.details?.topSpeed && { 'speed': car.details.topSpeed }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleSchema) }} />
      <CarDetail slug={slug} />
    </>
  );
}
