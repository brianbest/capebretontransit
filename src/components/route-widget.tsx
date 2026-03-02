'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {Card} from '@/components/ui/card';
import {ChevronRight, ChevronDown, ChevronUp} from 'lucide-react';
import {type Route} from '@/data/routes';
import {
  getStopSurroundingTimes,
  getActiveDirection,
  getServiceType,
  isServiceRunning,
  formatTime,
  type StopTimeContext,
} from '@/lib/schedule-utils';

interface RouteWidgetProps {
  route: Route;
}

const INITIAL_STOPS = 3;

function formatMinutes(mins: number): string {
  if (mins < 1) return '<1m';
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function StopRow({ctx, isFirst}: {ctx: StopTimeContext; isFirst: boolean}) {
  return (
    <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-3 py-1.5">
      <span className="truncate text-xs text-muted-foreground">{ctx.stop}</span>
      <span className="w-[4.5rem] text-right text-xs tabular-nums text-muted-foreground/50 line-through">
        {ctx.lastDeparture ? formatTime(ctx.lastDeparture) : '—'}
      </span>
      <div className="flex w-[5.5rem] items-center justify-end gap-1.5">
        {ctx.nextDeparture ? (
          <>
            <span className="text-xs font-semibold tabular-nums text-primary">
              {formatTime(ctx.nextDeparture)}
            </span>
            {isFirst && ctx.minutesUntilNext !== null && (
              <span className="text-[10px] text-primary/60">
                {formatMinutes(ctx.minutesUntilNext)}
              </span>
            )}
          </>
        ) : (
          <span className="text-xs tabular-nums text-muted-foreground/50">—</span>
        )}
      </div>
    </div>
  );
}

export function RouteWidget({route}: RouteWidgetProps) {
  const t = useTranslations('route');
  const [expanded, setExpanded] = useState(false);

  const now = new Date();
  const serviceRunning = isServiceRunning(now);
  const serviceType = getServiceType(now);
  const {direction} = getActiveDirection(route, now);
  const stopTimes = serviceRunning ? getStopSurroundingTimes(direction, now) : null;
  const hasUpcoming = stopTimes?.some((s) => s.nextDeparture !== null) ?? false;

  const firstStop = direction.stops[0]?.name;
  const lastStop = direction.stops[direction.stops.length - 1]?.name;
  const isLoop = firstStop === lastStop;

  const visibleStops = expanded ? stopTimes : stopTimes?.slice(0, INITIAL_STOPS);
  const hiddenCount = (stopTimes?.length ?? 0) - INITIAL_STOPS;

  const serviceLabel =
    serviceType === 'weekday'
      ? t('weekday')
      : serviceType === 'saturday'
        ? t('saturday')
        : t('sunday_holiday');

  return (
    <Link href={`/routes/${route.id}`}>
      <Card className="group gap-0 border-border/50 py-0 transition-colors hover:border-primary/30 hover:bg-card/80">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 pt-3.5 pb-2">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
            style={{backgroundColor: route.color}}
          >
            {route.id}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="truncate font-medium leading-tight text-foreground">
                {route.name}
              </span>
              <span className="shrink-0 rounded bg-muted/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                {serviceLabel}
              </span>
            </div>
            <div className="mt-0.5 text-xs text-muted-foreground/70">
              {isLoop ? direction.name : `${firstStop} \u2192 ${lastStop}`}
            </div>
          </div>
          <ChevronRight className="size-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5" />
        </div>

        {/* Schedule body */}
        {serviceRunning && stopTimes && hasUpcoming ? (
          <div className="border-t border-border/30 px-4 pt-1.5 pb-2">
            {/* Column headers */}
            <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-3 pb-1">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/50">
                {t('stops')}
              </span>
              <span className="w-[4.5rem] text-right text-[10px] font-medium uppercase tracking-wider text-muted-foreground/50">
                {t('last')}
              </span>
              <span className="w-[5.5rem] text-right text-[10px] font-medium uppercase tracking-wider text-muted-foreground/50">
                {t('next_arrival')}
              </span>
            </div>

            {visibleStops?.map((ctx, i) => (
              <StopRow key={ctx.stop} ctx={ctx} isFirst={i === 0} />
            ))}

            {hiddenCount > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setExpanded(!expanded);
                }}
                className="mt-0.5 flex w-full items-center justify-center gap-1 rounded py-1 text-[11px] text-muted-foreground/60 transition-colors hover:bg-muted/30 hover:text-muted-foreground"
              >
                {expanded ? (
                  <>
                    <ChevronUp className="size-3" />
                    {t('fewer_stops')}
                  </>
                ) : (
                  <>
                    <ChevronDown className="size-3" />
                    {t('more_stops', {count: hiddenCount})}
                  </>
                )}
              </button>
            )}
          </div>
        ) : (
          <div className="border-t border-border/30 px-4 py-3">
            <span className="text-xs text-muted-foreground/60">
              {!serviceRunning
                ? t('no_service')
                : !hasUpcoming
                  ? t('service_ended')
                  : t('no_service')}
            </span>
          </div>
        )}
      </Card>
    </Link>
  );
}
