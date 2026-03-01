'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {Button} from '@/components/ui/button';
import {ChevronLeft, ArrowRightLeft} from 'lucide-react';
import {type Route} from '@/data/routes';

interface RouteHeaderProps {
  route: Route;
  directionIndex: number;
  onDirectionChange: (index: number) => void;
}

export function RouteHeader({route, directionIndex, onDirectionChange}: RouteHeaderProps) {
  const t = useTranslations();
  const direction = route.directions[directionIndex];
  const hasMultipleDirections = route.directions.length > 1;

  return (
    <div className="space-y-4">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        {t('common.back')}
      </Link>

      <div className="flex items-start gap-4">
        <div
          className="flex size-14 shrink-0 items-center justify-center rounded-2xl text-xl font-bold text-white"
          style={{backgroundColor: route.color}}
        >
          {route.id}
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-semibold leading-tight text-foreground">
            {route.name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {direction?.name}
          </p>
        </div>
      </div>

      {hasMultipleDirections && (
        <div className="flex flex-wrap gap-2">
          {route.directions.map((dir, i) => (
            <Button
              key={dir.id}
              variant={i === directionIndex ? 'default' : 'outline'}
              size="sm"
              onClick={() => onDirectionChange(i)}
              className="gap-1.5 text-xs"
            >
              {i !== directionIndex && <ArrowRightLeft className="size-3" />}
              {dir.name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
