'use client';

import {useTranslations} from 'next-intl';
import {Tabs, TabsList, TabsTrigger, TabsContent} from '@/components/ui/tabs';
import {ScrollArea, ScrollBar} from '@/components/ui/scroll-area';
import {type Direction} from '@/data/routes';
import {
  getScheduleForServiceType,
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
    <ScrollArea className="w-full">
      <div className="min-w-[480px]">
        <div className="grid gap-0">
          {scheduleTimes.map((st) => {
            let nextHighlighted = false;
            return (
              <div
                key={st.stop}
                className="grid grid-cols-[140px_1fr] border-b border-border/30 last:border-0"
              >
                <div className="flex items-start px-3 py-2.5 text-xs font-medium text-muted-foreground">
                  {st.stop}
                </div>
                <div className="flex flex-wrap gap-x-1 gap-y-1 px-2 py-2.5">
                  {st.times.map((time) => {
                    const mins = parseTime(time);
                    const isPast = mins <= nowMinutes;
                    const isNext = !isPast && !nextHighlighted;
                    if (isNext) nextHighlighted = true;

                    return (
                      <span
                        key={time}
                        className={`inline-block rounded px-1.5 py-0.5 text-xs font-mono tabular-nums ${
                          isNext
                            ? 'bg-primary/20 font-semibold text-primary'
                            : isPast
                              ? 'text-muted-foreground/40'
                              : 'text-foreground/80'
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
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export function ScheduleTable({direction}: ScheduleTableProps) {
  const t = useTranslations('route');

  return (
    <Tabs defaultValue="weekday" className="w-full">
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
