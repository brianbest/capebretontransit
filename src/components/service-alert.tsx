'use client';

import {isHoliday} from '@/lib/schedule-utils';
import {AlertTriangle} from 'lucide-react';

export function ServiceAlert() {
  const today = new Date();
  const holiday = isHoliday(today);

  if (!holiday) return null;

  const isNoService = holiday.holiday.serviceLevel === 'no_service';

  return (
    <div
      className={`flex items-start gap-3 rounded-lg border px-4 py-3 ${
        isNoService
          ? 'border-destructive/30 bg-destructive/10 text-destructive'
          : 'border-amber-500/30 bg-amber-500/10 text-amber-400'
      }`}
      role="alert"
    >
      <AlertTriangle className="mt-0.5 size-4 shrink-0" />
      <div className="text-sm">
        <span className="font-medium">{holiday.holiday.name}</span>
        <span className="mx-1.5">&mdash;</span>
        <span className="opacity-90">{holiday.holiday.description}</span>
      </div>
    </div>
  );
}
