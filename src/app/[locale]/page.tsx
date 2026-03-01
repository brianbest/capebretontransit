import {useTranslations} from 'next-intl';
import {routes} from '@/data/routes';
import {RouteCard} from '@/components/route-card';
import {ServiceAlert} from '@/components/service-alert';

export default function Home() {
  const t = useTranslations('home');

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="mb-6 space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {t('title')}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t('subtitle')}
        </p>
      </div>

      <ServiceAlert />

      <div className="mt-4 space-y-2">
        {routes.map((route) => (
          <RouteCard key={route.id} route={route} />
        ))}
      </div>
    </div>
  );
}
