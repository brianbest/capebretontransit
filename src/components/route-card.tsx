'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {Card} from '@/components/ui/card';
import {Clock, ChevronRight, MapPin} from 'lucide-react';
import {type Route} from '@/data/routes';
import {getCurrentService, formatTime} from '@/lib/schedule-utils';

interface RouteCardProps {
  route: Route;
}

export function RouteCard({route}: RouteCardProps) {
  const t = useTranslations('route');
  const service = getCurrentService(route);

  const firstStop = route.directions[0]?.stops[0]?.name;
  const lastStop = route.directions[0]?.stops[route.directions[0].stops.length - 1]?.name;

  return (
    <Link href={`/routes/${route.id}`}>
      <Card className="group gap-0 border-border/50 py-0 transition-colors hover:border-primary/30 hover:bg-card/80">
        <div className="flex items-center gap-3.5 px-4 py-4">
          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{backgroundColor: route.color}}
          >
            {route.id}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-medium leading-tight text-foreground">
              {route.name}
            </div>
            {firstStop && lastStop && firstStop !== lastStop && (
              <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3 shrink-0" />
                <span className="truncate">{firstStop} &rarr; {lastStop}</span>
              </div>
            )}
            {firstStop && firstStop === lastStop && (
              <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3 shrink-0" />
                <span className="truncate">{route.directions[0]?.name}</span>
              </div>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {service ? (
              <div className="flex items-center gap-1 text-sm text-primary">
                <Clock className="size-3.5" />
                <span className="font-medium">{formatTime(service.nextDeparture)}</span>
              </div>
            ) : (
              <span className="text-xs text-muted-foreground">{t('no_service')}</span>
            )}
            <ChevronRight className="size-4 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
