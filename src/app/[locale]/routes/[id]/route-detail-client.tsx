'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {type Route} from '@/data/routes';
import {RouteHeader} from '@/components/route-header';
import {ScheduleTable} from '@/components/schedule-table';

interface RouteDetailClientProps {
  route: Route;
}

export function RouteDetailClient({route}: RouteDetailClientProps) {
  const t = useTranslations('route');
  const [directionIndex, setDirectionIndex] = useState(0);
  const direction = route.directions[directionIndex];

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 pb-10">
      <RouteHeader
        route={route}
        directionIndex={directionIndex}
        onDirectionChange={setDirectionIndex}
      />

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {t('stops')}
        </h2>
        <div className="space-y-0">
          {direction?.stops.map((stop, i) => (
            <div key={`${stop.name}-${i}`} className="flex items-center gap-3 py-2">
              <div className="relative flex flex-col items-center">
                <div
                  className="size-2.5 rounded-full ring-2 ring-background"
                  style={{backgroundColor: route.color}}
                />
                {i < (direction?.stops.length ?? 0) - 1 && (
                  <div
                    className="absolute top-3 h-5 w-0.5 opacity-30"
                    style={{backgroundColor: route.color}}
                  />
                )}
              </div>
              <span className="text-sm text-foreground">{stop.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {t('departure_times')}
        </h2>
        {direction && <ScheduleTable direction={direction} />}
      </section>
    </div>
  );
}
