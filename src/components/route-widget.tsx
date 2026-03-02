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
  getLastRunStatus,
  getServiceType,
  isServiceRunning,
  formatTime,
  type StopTimeContext,
  type LastRunStop,
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

function LastRunStopRow({
  stop,
  isCurrent,
  isUpcoming,
  routeColor,
}: {
  stop: LastRunStop;
  isCurrent: boolean;
  isUpcoming: boolean;
  routeColor: string;
}) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-2.5 py-1">
      {/* Progress dot */}
      <div className="flex size-4 items-center justify-center">
        {isCurrent ? (
          <span
            className="block size-2.5 animate-pulse rounded-full ring-2 ring-offset-1 ring-offset-background"
            style={{backgroundColor: routeColor, boxShadow: `0 0 6px ${routeColor}80`, borderColor: routeColor}}
          />
        ) : (
          <span
            className={`block size-1.5 rounded-full ${
              isUpcoming ? 'bg-muted-foreground/30' : 'bg-muted-foreground/20'
            }`}
          />
        )}
      </div>
      <span
        className={`truncate text-xs ${
          isCurrent
            ? 'font-medium text-foreground'
            : isUpcoming
              ? 'text-muted-foreground'
              : 'text-muted-foreground/50'
        }`}
      >
        {stop.stop}
      </span>
      <span
        className={`text-xs tabular-nums ${
          isCurrent
            ? 'font-medium text-foreground'
            : isUpcoming
              ? 'text-muted-foreground'
              : 'text-muted-foreground/50 line-through'
        }`}
      >
        {formatTime(stop.time)}
      </span>
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
  const lastRun = !hasUpcoming && serviceRunning ? getLastRunStatus(direction, now) : null;

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
              {lastRun && (
                <span
                  className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold text-white"
                  style={{backgroundColor: route.color}}
                >
                  {t('in_transit')}
                </span>
              )}
            </div>
            <div className="mt-0.5 text-xs text-muted-foreground/70">
              {isLoop ? direction.name : `${firstStop} \u2192 ${lastStop}`}
            </div>
          </div>
          <ChevronRight className="size-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5" />
        </div>

        {/* Normal schedule body */}
        {serviceRunning && stopTimes && hasUpcoming ? (
          <div className="border-t border-border/30 px-4 pt-1.5 pb-2">
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
        ) : lastRun ? (
          /* Last run in-transit view */
          <div className="border-t border-border/30 px-4 pt-1 pb-2">
            <div className="mb-1 flex items-center gap-1.5 py-1">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/50">
                {t('final_run')}
              </span>
            </div>
            {lastRun.stops.map((stop, i) => (
              <LastRunStopRow
                key={stop.stop}
                stop={stop}
                isCurrent={i === lastRun.currentStopIndex}
                isUpcoming={i > lastRun.currentStopIndex}
                routeColor={route.color}
              />
            ))}
          </div>
        ) : (
          <div className="border-t border-border/30 px-4 py-3">
            <span className="text-xs text-muted-foreground/60">
              {!serviceRunning ? t('no_service') : t('service_ended')}
            </span>
          </div>
        )}
      </Card>
    </Link>
  );
}
