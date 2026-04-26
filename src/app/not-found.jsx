import NotFound from '@/src/components/pages/NotFound';
import { t } from './metadata';

export const metadata = {
  title: `${t('en', 'notFound.metaTitle')} | Kotor Car Hire`,
};

export default function NotFoundPage() {
  return <NotFound />;
}
