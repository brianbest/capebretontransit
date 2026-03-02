'use client';

import {useTranslations} from 'next-intl';
import {Tabs, TabsList, TabsTrigger, TabsContent} from '@/components/ui/tabs';
import {type Direction} from '@/data/routes';
import {
  getScheduleForServiceType,
  getServiceType,
  formatTime,
  parseTime,
  type ServiceType,
} from '@/lib/schedule-utils';

interface ScheduleTableProps {
  direction: Direction;
}

function TimeGrid({
  direction,
  serviceType,
}: {
  direction: Direction;
  serviceType: ServiceType;
}) {
  const t = useTranslations('route');
  const scheduleTimes = getScheduleForServiceType(direction, serviceType);

  if (!scheduleTimes || scheduleTimes.every((st) => st.times.length === 0)) {
    return (
      <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
        {t('no_service')}
      </div>
    );
  }

  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  return (
    <div className="w-full">
      <div className="grid gap-0">
        {scheduleTimes.map((st, idx) => {
          let nextHighlighted = false;
          return (
            <div
              key={`${st.stop}-${idx}`}
              className="flex flex-col border-b border-border/30 px-3 py-3 last:border-0 sm:grid sm:grid-cols-[160px_1fr]"
            >
              <div className="mb-1.5 text-sm font-medium text-muted-foreground sm:mb-0 sm:flex sm:items-start sm:py-0">
                {st.stop}
              </div>
              <div className="flex flex-wrap gap-x-1.5 gap-y-1.5">
                {st.times.map((time, timeIdx) => {
                  const mins = parseTime(time);
                  const isValid = !isNaN(mins);
                  const isPast = isValid && mins <= nowMinutes;
                  const isNext = isValid && !isPast && !nextHighlighted;
                  if (isNext) nextHighlighted = true;

                  if (!isValid) {
                    return (
                      <span
                        key={`${time}-${timeIdx}`}
                        className="inline-block rounded bg-muted/30 px-1.5 py-0.5 text-xs font-mono tabular-nums text-muted-foreground/50"
                      >
                        —
                      </span>
                    );
                  }

                  return (
                    <span
                      key={`${time}-${timeIdx}`}
                      className={`inline-block rounded px-1.5 py-0.5 text-xs font-mono tabular-nums ${
                        isNext
                          ? 'bg-primary/20 font-semibold text-primary'
                          : isPast
                            ? 'bg-muted/50 text-muted-foreground/70 line-through'
                            : 'bg-muted/50 text-foreground'
                      }`}
                    >
                      {formatTime(time)}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ScheduleTable({direction}: ScheduleTableProps) {
  const t = useTranslations('route');

  return (
    <Tabs defaultValue={getServiceType(new Date())} className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="weekday" className="flex-1">
          {t('weekday')}
        </TabsTrigger>
        <TabsTrigger value="saturday" className="flex-1">
          {t('saturday')}
        </TabsTrigger>
        <TabsTrigger value="sunday_holiday" className="flex-1">
          {t('sunday_holiday')}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="weekday" className="mt-3">
        <TimeGrid direction={direction} serviceType="weekday" />
      </TabsContent>
      <TabsContent value="saturday" className="mt-3">
        <TimeGrid direction={direction} serviceType="saturday" />
      </TabsContent>
      <TabsContent value="sunday_holiday" className="mt-3">
        <TimeGrid direction={direction} serviceType="sunday_holiday" />
      </TabsContent>
    </Tabs>
  );
}
