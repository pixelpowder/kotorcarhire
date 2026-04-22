import { notFound } from 'next/navigation';
import { buildAlternates } from '../../metadata';
import config from '@/src/siteConfig';
import { carMetas } from '@/src/data/carMetas';
import CarDetail from '@/src/components/pages/CarDetail';

const SITE = 'https://www.kotorcarhire.com';

export function generateStaticParams() {
  return config.cars.map(car => ({ slug: car.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const car = config.cars.find(c => c.slug === slug);
  if (!car) return {};

  const meta = carMetas[slug]?.en;
  const title = meta?.title || `${car.name} Hire in Kotor | Kotor Car Hire`;
  const description = meta?.desc || `${car.name} rental guide for the Bay of Kotor.`;
  return {
    title,
    description,
    alternates: buildAlternates(`cars/${slug}`),
    openGraph: {
      title,
      description,
      url: `${SITE}/cars/${slug}`,
      type: 'website',
      images: [{ url: `${SITE}${car.image}`, width: 1200, height: 800, alt: car.name }],
    },
  };
}

export default async function CarDetailRoute({ params }) {
  const { slug } = await params;
  const car = config.cars.find(c => c.slug === slug);
  if (!car) notFound();

  // Car schema with per-day rental Offer — satisfies GSC "Product snippets
  // missing offers" without faking reviews. Rental, not a sale.
  const SITE = `https://www.${config.domain}`;
  const vehicleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    'name': car.name,
    'description': car.suitability,
    'image': car.image && (car.image.startsWith('http') ? car.image : `${SITE}${car.image}`),
    'brand': { '@type': 'Brand', 'name': car.name.split(' ')[0] },
    'vehicleTransmission': car.transmission,
    'fuelType': car.fuel,
    'numberOfDoors': car.doors,
    'seatingCapacity': car.seats,
    ...(car.details?.consumption && { 'fuelConsumption': car.details.consumption }),
    ...(car.details?.topSpeed && { 'speed': car.details.topSpeed }),
    'offers': {
      '@type': 'Offer',
      'priceCurrency': 'EUR',
      'availability': 'https://schema.org/InStock',
      'url': `${SITE}/cars/${slug}`,
      'priceValidUntil': `${new Date().getFullYear() + 1}-12-31`,
      'priceSpecification': {
        '@type': 'UnitPriceSpecification',
        'price': String(car.price),
        'priceCurrency': 'EUR',
        'unitCode': 'DAY',
        'referenceQuantity': {
          '@type': 'QuantitativeValue',
          'value': 1,
          'unitCode': 'DAY',
        },
      },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleSchema) }} />
      <CarDetail slug={slug} />
    </>
  );
}
