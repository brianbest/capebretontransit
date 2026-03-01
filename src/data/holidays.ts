// CB Transit - CBRM Transit Holiday Schedule Data

export type ServiceLevel = "no_service" | "reduced" | "sunday_schedule";

export interface Holiday {
  name: string;
  nameKey: string;
  serviceLevel: ServiceLevel;
  description: string;
  descriptionKey: string;
}

export interface HolidayDate {
  date: string; // ISO date string YYYY-MM-DD
  holiday: Holiday;
}

// Holiday definitions with service levels
export const holidays: Record<string, Holiday> = {
  newYearsDay: {
    name: "New Year's Day",
    nameKey: "holiday.newYearsDay",
    serviceLevel: "no_service",
    description: "No transit service",
    descriptionKey: "holiday.newYearsDay.description",
  },
  familyDay: {
    name: "Family Day",
    nameKey: "holiday.familyDay",
    serviceLevel: "sunday_schedule",
    description: "Sunday/holiday schedule in effect",
    descriptionKey: "holiday.familyDay.description",
  },
  goodFriday: {
    name: "Good Friday",
    nameKey: "holiday.goodFriday",
    serviceLevel: "no_service",
    description: "No transit service",
    descriptionKey: "holiday.goodFriday.description",
  },
  easterMonday: {
    name: "Easter Monday",
    nameKey: "holiday.easterMonday",
    serviceLevel: "sunday_schedule",
    description: "Sunday/holiday schedule in effect",
    descriptionKey: "holiday.easterMonday.description",
  },
  victoriaDay: {
    name: "Victoria Day",
    nameKey: "holiday.victoriaDay",
    serviceLevel: "sunday_schedule",
    description: "Sunday/holiday schedule in effect",
    descriptionKey: "holiday.victoriaDay.description",
  },
  canadaDay: {
    name: "Canada Day",
    nameKey: "holiday.canadaDay",
    serviceLevel: "sunday_schedule",
    description: "Sunday/holiday schedule in effect",
    descriptionKey: "holiday.canadaDay.description",
  },
  natalDay: {
    name: "Natal Day",
    nameKey: "holiday.natalDay",
    serviceLevel: "sunday_schedule",
    description: "Sunday/holiday schedule in effect",
    descriptionKey: "holiday.natalDay.description",
  },
  labourDay: {
    name: "Labour Day",
    nameKey: "holiday.labourDay",
    serviceLevel: "sunday_schedule",
    description: "Sunday/holiday schedule in effect",
    descriptionKey: "holiday.labourDay.description",
  },
  truthAndReconciliationDay: {
    name: "National Day for Truth and Reconciliation",
    nameKey: "holiday.truthAndReconciliation",
    serviceLevel: "sunday_schedule",
    description: "Sunday/holiday schedule in effect",
    descriptionKey: "holiday.truthAndReconciliation.description",
  },
  thanksgiving: {
    name: "Thanksgiving Day",
    nameKey: "holiday.thanksgiving",
    serviceLevel: "no_service",
    description: "No transit service",
    descriptionKey: "holiday.thanksgiving.description",
  },
  remembranceDay: {
    name: "Remembrance Day",
    nameKey: "holiday.remembranceDay",
    serviceLevel: "sunday_schedule",
    description: "Sunday/holiday schedule in effect",
    descriptionKey: "holiday.remembranceDay.description",
  },
  christmasDay: {
    name: "Christmas Day",
    nameKey: "holiday.christmasDay",
    serviceLevel: "no_service",
    description: "No transit service",
    descriptionKey: "holiday.christmasDay.description",
  },
  boxingDay: {
    name: "Boxing Day",
    nameKey: "holiday.boxingDay",
    serviceLevel: "no_service",
    description: "No transit service",
    descriptionKey: "holiday.boxingDay.description",
  },
};

// Holiday dates for 2025-2026.
// Good Friday / Easter Monday are computed via getEasterDate.
// Other moveable holidays (Victoria Day, Natal Day, etc.) are listed explicitly.
export const holidayDates: HolidayDate[] = [
  // 2025
  { date: "2025-01-01", holiday: holidays.newYearsDay },
  { date: "2025-02-17", holiday: holidays.familyDay },
  { date: "2025-04-18", holiday: holidays.goodFriday },
  { date: "2025-04-21", holiday: holidays.easterMonday },
  { date: "2025-05-19", holiday: holidays.victoriaDay },
  { date: "2025-07-01", holiday: holidays.canadaDay },
  { date: "2025-08-04", holiday: holidays.natalDay },
  { date: "2025-09-01", holiday: holidays.labourDay },
  { date: "2025-09-30", holiday: holidays.truthAndReconciliationDay },
  { date: "2025-10-13", holiday: holidays.thanksgiving },
  { date: "2025-11-11", holiday: holidays.remembranceDay },
  { date: "2025-12-25", holiday: holidays.christmasDay },
  { date: "2025-12-26", holiday: holidays.boxingDay },

  // 2026
  { date: "2026-01-01", holiday: holidays.newYearsDay },
  { date: "2026-02-16", holiday: holidays.familyDay },
  { date: "2026-04-03", holiday: holidays.goodFriday },
  { date: "2026-04-06", holiday: holidays.easterMonday },
  { date: "2026-05-18", holiday: holidays.victoriaDay },
  { date: "2026-07-01", holiday: holidays.canadaDay },
  { date: "2026-08-03", holiday: holidays.natalDay },
  { date: "2026-09-07", holiday: holidays.labourDay },
  { date: "2026-09-30", holiday: holidays.truthAndReconciliationDay },
  { date: "2026-10-12", holiday: holidays.thanksgiving },
  { date: "2026-11-11", holiday: holidays.remembranceDay },
  { date: "2026-12-25", holiday: holidays.christmasDay },
  { date: "2026-12-26", holiday: holidays.boxingDay },
];

/**
 * Reduced service hours on holidays that have service.
 * Routes operating on sunday_schedule holidays run 10 AM - 6 PM.
 */
export const holidayServiceHours = {
  start: "10:00",
  end: "18:00",
} as const;
