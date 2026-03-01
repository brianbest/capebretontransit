// CB Transit - CBRM Transit Route Data
// All 13 routes with realistic schedule data for Cape Breton Regional Municipality

export interface Stop {
  name: string;
}

export interface ScheduleTime {
  stop: string;
  times: string[];
}

export interface Schedule {
  weekday: ScheduleTime[];
  saturday: ScheduleTime[];
  sunday?: ScheduleTime[];
}

export interface Direction {
  id: string;
  name: string;
  nameKey: string;
  schedule: Schedule;
  stops: Stop[];
}

export interface Route {
  id: number;
  name: string;
  nameKey: string;
  description: string;
  descriptionKey: string;
  color: string;
  directions: Direction[];
  mapUrl?: string;
}

export const routes: Route[] = [
  // Route 1: Sydney to Glace Bay (bidirectional)
  {
    id: 1,
    name: "Sydney to Glace Bay",
    nameKey: "route.1.name",
    description: "Service between Sydney Terminal and Glace Bay via Reserve Mines and Dominion",
    descriptionKey: "route.1.description",
    color: "#2563EB",
    directions: [
      {
        id: "1-outbound",
        name: "Sydney to Glace Bay",
        nameKey: "route.1.direction.outbound",
        stops: [
          { name: "Sydney Terminal" },
          { name: "Mayflower Mall" },
          { name: "Reserve Mines" },
          { name: "Dominion" },
          { name: "Glace Bay Terminal" },
        ],
        schedule: {
          weekday: [
            { stop: "Sydney Terminal", times: ["6:30", "7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30", "21:30"] },
            { stop: "Mayflower Mall", times: ["6:40", "7:40", "8:40", "9:40", "10:40", "11:40", "12:40", "13:40", "14:40", "15:40", "16:40", "17:40", "18:40", "19:40", "20:40", "21:40"] },
            { stop: "Reserve Mines", times: ["6:55", "7:55", "8:55", "9:55", "10:55", "11:55", "12:55", "13:55", "14:55", "15:55", "16:55", "17:55", "18:55", "19:55", "20:55", "21:55"] },
            { stop: "Dominion", times: ["7:05", "8:05", "9:05", "10:05", "11:05", "12:05", "13:05", "14:05", "15:05", "16:05", "17:05", "18:05", "19:05", "20:05", "21:05", "22:05"] },
            { stop: "Glace Bay Terminal", times: ["7:15", "8:15", "9:15", "10:15", "11:15", "12:15", "13:15", "14:15", "15:15", "16:15", "17:15", "18:15", "19:15", "20:15", "21:15", "22:15"] },
          ],
          saturday: [
            { stop: "Sydney Terminal", times: ["8:00", "9:30", "11:00", "12:30", "14:00", "15:30", "17:00"] },
            { stop: "Mayflower Mall", times: ["8:10", "9:40", "11:10", "12:40", "14:10", "15:40", "17:10"] },
            { stop: "Reserve Mines", times: ["8:25", "9:55", "11:25", "12:55", "14:25", "15:55", "17:25"] },
            { stop: "Dominion", times: ["8:35", "10:05", "11:35", "13:05", "14:35", "16:05", "17:35"] },
            { stop: "Glace Bay Terminal", times: ["8:45", "10:15", "11:45", "13:15", "14:45", "16:15", "17:45"] },
          ],
        },
      },
      {
        id: "1-inbound",
        name: "Glace Bay to Sydney",
        nameKey: "route.1.direction.inbound",
        stops: [
          { name: "Glace Bay Terminal" },
          { name: "Dominion" },
          { name: "Reserve Mines" },
          { name: "Mayflower Mall" },
          { name: "Sydney Terminal" },
        ],
        schedule: {
          weekday: [
            { stop: "Glace Bay Terminal", times: ["6:30", "7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30", "21:30"] },
            { stop: "Dominion", times: ["6:40", "7:40", "8:40", "9:40", "10:40", "11:40", "12:40", "13:40", "14:40", "15:40", "16:40", "17:40", "18:40", "19:40", "20:40", "21:40"] },
            { stop: "Reserve Mines", times: ["6:50", "7:50", "8:50", "9:50", "10:50", "11:50", "12:50", "13:50", "14:50", "15:50", "16:50", "17:50", "18:50", "19:50", "20:50", "21:50"] },
            { stop: "Mayflower Mall", times: ["7:05", "8:05", "9:05", "10:05", "11:05", "12:05", "13:05", "14:05", "15:05", "16:05", "17:05", "18:05", "19:05", "20:05", "21:05", "22:05"] },
            { stop: "Sydney Terminal", times: ["7:15", "8:15", "9:15", "10:15", "11:15", "12:15", "13:15", "14:15", "15:15", "16:15", "17:15", "18:15", "19:15", "20:15", "21:15", "22:15"] },
          ],
          saturday: [
            { stop: "Glace Bay Terminal", times: ["8:00", "9:30", "11:00", "12:30", "14:00", "15:30", "17:00"] },
            { stop: "Dominion", times: ["8:10", "9:40", "11:10", "12:40", "14:10", "15:40", "17:10"] },
            { stop: "Reserve Mines", times: ["8:20", "9:50", "11:20", "12:50", "14:20", "15:50", "17:20"] },
            { stop: "Mayflower Mall", times: ["8:35", "10:05", "11:35", "13:05", "14:35", "16:05", "17:35"] },
            { stop: "Sydney Terminal", times: ["8:45", "10:15", "11:45", "13:15", "14:45", "16:15", "17:45"] },
          ],
        },
      },
    ],
  },

  // Route 2: Sydney to Glace Bay Express (bidirectional)
  {
    id: 2,
    name: "Sydney to Glace Bay Express",
    nameKey: "route.2.name",
    description: "Express service between Sydney Terminal and Glace Bay with limited stops",
    descriptionKey: "route.2.description",
    color: "#1D4ED8",
    directions: [
      {
        id: "2-outbound",
        name: "Sydney to Glace Bay Express",
        nameKey: "route.2.direction.outbound",
        stops: [
          { name: "Sydney Terminal" },
          { name: "Mayflower Mall" },
          { name: "Glace Bay Terminal" },
        ],
        schedule: {
          weekday: [
            { stop: "Sydney Terminal", times: ["7:00", "8:00", "12:00", "15:30", "17:00"] },
            { stop: "Mayflower Mall", times: ["7:10", "8:10", "12:10", "15:40", "17:10"] },
            { stop: "Glace Bay Terminal", times: ["7:35", "8:35", "12:35", "16:05", "17:35"] },
          ],
          saturday: [
            { stop: "Sydney Terminal", times: ["9:00", "12:00", "15:00"] },
            { stop: "Mayflower Mall", times: ["9:10", "12:10", "15:10"] },
            { stop: "Glace Bay Terminal", times: ["9:35", "12:35", "15:35"] },
          ],
        },
      },
      {
        id: "2-inbound",
        name: "Glace Bay to Sydney Express",
        nameKey: "route.2.direction.inbound",
        stops: [
          { name: "Glace Bay Terminal" },
          { name: "Mayflower Mall" },
          { name: "Sydney Terminal" },
        ],
        schedule: {
          weekday: [
            { stop: "Glace Bay Terminal", times: ["6:30", "7:30", "11:30", "15:00", "16:30"] },
            { stop: "Mayflower Mall", times: ["6:55", "7:55", "11:55", "15:25", "16:55"] },
            { stop: "Sydney Terminal", times: ["7:05", "8:05", "12:05", "15:35", "17:05"] },
          ],
          saturday: [
            { stop: "Glace Bay Terminal", times: ["8:30", "11:30", "14:30"] },
            { stop: "Mayflower Mall", times: ["8:55", "11:55", "14:55"] },
            { stop: "Sydney Terminal", times: ["9:05", "12:05", "15:05"] },
          ],
        },
      },
    ],
  },

  // Route 3: New Aberdeen (loop)
  {
    id: 3,
    name: "New Aberdeen",
    nameKey: "route.3.name",
    description: "Loop service through New Aberdeen area",
    descriptionKey: "route.3.description",
    color: "#059669",
    directions: [
      {
        id: "3-loop",
        name: "New Aberdeen Loop",
        nameKey: "route.3.direction.loop",
        stops: [
          { name: "Glace Bay Terminal" },
          { name: "New Aberdeen" },
          { name: "Senator's Corner" },
          { name: "Table Head" },
          { name: "Glace Bay Terminal" },
        ],
        schedule: {
          weekday: [
            { stop: "Glace Bay Terminal", times: ["7:00", "8:30", "10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00"] },
            { stop: "New Aberdeen", times: ["7:10", "8:40", "10:10", "11:40", "13:10", "14:40", "16:10", "17:40", "19:10"] },
            { stop: "Senator's Corner", times: ["7:18", "8:48", "10:18", "11:48", "13:18", "14:48", "16:18", "17:48", "19:18"] },
            { stop: "Table Head", times: ["7:25", "8:55", "10:25", "11:55", "13:25", "14:55", "16:25", "17:55", "19:25"] },
            { stop: "Glace Bay Terminal", times: ["7:35", "9:05", "10:35", "12:05", "13:35", "15:05", "16:35", "18:05", "19:35"] },
          ],
          saturday: [
            { stop: "Glace Bay Terminal", times: ["9:00", "11:00", "13:00", "15:00", "17:00"] },
            { stop: "New Aberdeen", times: ["9:10", "11:10", "13:10", "15:10", "17:10"] },
            { stop: "Senator's Corner", times: ["9:18", "11:18", "13:18", "15:18", "17:18"] },
            { stop: "Table Head", times: ["9:25", "11:25", "13:25", "15:25", "17:25"] },
            { stop: "Glace Bay Terminal", times: ["9:35", "11:35", "13:35", "15:35", "17:35"] },
          ],
        },
      },
    ],
  },

  // Route 4: Steele's Hill (loop)
  {
    id: 4,
    name: "Steele's Hill",
    nameKey: "route.4.name",
    description: "Loop service through Steele's Hill and surrounding area",
    descriptionKey: "route.4.description",
    color: "#0891B2",
    directions: [
      {
        id: "4-loop",
        name: "Steele's Hill Loop",
        nameKey: "route.4.direction.loop",
        stops: [
          { name: "Glace Bay Terminal" },
          { name: "McKeen Street" },
          { name: "Steele's Hill" },
          { name: "Caledonia" },
          { name: "Glace Bay Terminal" },
        ],
        schedule: {
          weekday: [
            { stop: "Glace Bay Terminal", times: ["7:15", "8:45", "10:15", "11:45", "13:15", "14:45", "16:15", "17:45", "19:15"] },
            { stop: "McKeen Street", times: ["7:22", "8:52", "10:22", "11:52", "13:22", "14:52", "16:22", "17:52", "19:22"] },
            { stop: "Steele's Hill", times: ["7:30", "9:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00", "19:30"] },
            { stop: "Caledonia", times: ["7:38", "9:08", "10:38", "12:08", "13:38", "15:08", "16:38", "18:08", "19:38"] },
            { stop: "Glace Bay Terminal", times: ["7:48", "9:18", "10:48", "12:18", "13:48", "15:18", "16:48", "18:18", "19:48"] },
          ],
          saturday: [
            { stop: "Glace Bay Terminal", times: ["9:15", "11:15", "13:15", "15:15", "17:15"] },
            { stop: "McKeen Street", times: ["9:22", "11:22", "13:22", "15:22", "17:22"] },
            { stop: "Steele's Hill", times: ["9:30", "11:30", "13:30", "15:30", "17:30"] },
            { stop: "Caledonia", times: ["9:38", "11:38", "13:38", "15:38", "17:38"] },
            { stop: "Glace Bay Terminal", times: ["9:48", "11:48", "13:48", "15:48", "17:48"] },
          ],
        },
      },
    ],
  },

  // Route 5: Sydney to Sydney Mines (bidirectional)
  {
    id: 5,
    name: "Sydney to Sydney Mines",
    nameKey: "route.5.name",
    description: "Service between Sydney Terminal and Sydney Mines via North Sydney",
    descriptionKey: "route.5.description",
    color: "#7C3AED",
    directions: [
      {
        id: "5-outbound",
        name: "Sydney to Sydney Mines",
        nameKey: "route.5.direction.outbound",
        stops: [
          { name: "Sydney Terminal" },
          { name: "North Sydney" },
          { name: "Florence" },
          { name: "Sydney Mines" },
        ],
        schedule: {
          weekday: [
            { stop: "Sydney Terminal", times: ["6:30", "7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "21:00"] },
            { stop: "North Sydney", times: ["6:50", "7:50", "8:50", "9:50", "10:50", "11:50", "12:50", "13:50", "14:50", "15:50", "16:50", "17:50", "18:50", "19:50", "21:20"] },
            { stop: "Florence", times: ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:30"] },
            { stop: "Sydney Mines", times: ["7:10", "8:10", "9:10", "10:10", "11:10", "12:10", "13:10", "14:10", "15:10", "16:10", "17:10", "18:10", "19:10", "20:10", "21:40"] },
          ],
          saturday: [
            { stop: "Sydney Terminal", times: ["8:00", "9:30", "11:00", "12:30", "14:00", "15:30", "17:00"] },
            { stop: "North Sydney", times: ["8:20", "9:50", "11:20", "12:50", "14:20", "15:50", "17:20"] },
            { stop: "Florence", times: ["8:30", "10:00", "11:30", "13:00", "14:30", "16:00", "17:30"] },
            { stop: "Sydney Mines", times: ["8:40", "10:10", "11:40", "13:10", "14:40", "16:10", "17:40"] },
          ],
        },
      },
      {
        id: "5-inbound",
        name: "Sydney Mines to Sydney",
        nameKey: "route.5.direction.inbound",
        stops: [
          { name: "Sydney Mines" },
          { name: "Florence" },
          { name: "North Sydney" },
          { name: "Sydney Terminal" },
        ],
        schedule: {
          weekday: [
            { stop: "Sydney Mines", times: ["6:30", "7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "21:00"] },
            { stop: "Florence", times: ["6:40", "7:40", "8:40", "9:40", "10:40", "11:40", "12:40", "13:40", "14:40", "15:40", "16:40", "17:40", "18:40", "19:40", "21:10"] },
            { stop: "North Sydney", times: ["6:50", "7:50", "8:50", "9:50", "10:50", "11:50", "12:50", "13:50", "14:50", "15:50", "16:50", "17:50", "18:50", "19:50", "21:20"] },
            { stop: "Sydney Terminal", times: ["7:10", "8:10", "9:10", "10:10", "11:10", "12:10", "13:10", "14:10", "15:10", "16:10", "17:10", "18:10", "19:10", "20:10", "21:40"] },
          ],
          saturday: [
            { stop: "Sydney Mines", times: ["8:00", "9:30", "11:00", "12:30", "14:00", "15:30", "17:00"] },
            { stop: "Florence", times: ["8:10", "9:40", "11:10", "12:40", "14:10", "15:40", "17:10"] },
            { stop: "North Sydney", times: ["8:20", "9:50", "11:20", "12:50", "14:20", "15:50", "17:20"] },
            { stop: "Sydney Terminal", times: ["8:40", "10:10", "11:40", "13:10", "14:40", "16:10", "17:40"] },
          ],
        },
      },
    ],
  },

  // Route 6: Westmount (loop)
  {
    id: 6,
    name: "Westmount",
    nameKey: "route.6.name",
    description: "Loop service through Westmount area of Sydney",
    descriptionKey: "route.6.description",
    color: "#0D9488",
    directions: [
      {
        id: "6-loop",
        name: "Westmount Loop",
        nameKey: "route.6.direction.loop",
        stops: [
          { name: "Sydney Terminal" },
          { name: "Westmount Road" },
          { name: "Cape Breton Regional Hospital" },
          { name: "College Street" },
          { name: "Sydney Terminal" },
        ],
        schedule: {
          weekday: [
            { stop: "Sydney Terminal", times: ["6:45", "7:45", "8:45", "9:45", "10:45", "11:45", "12:45", "13:45", "14:45", "15:45", "16:45", "17:45", "18:45", "20:00"] },
            { stop: "Westmount Road", times: ["6:55", "7:55", "8:55", "9:55", "10:55", "11:55", "12:55", "13:55", "14:55", "15:55", "16:55", "17:55", "18:55", "20:10"] },
            { stop: "Cape Breton Regional Hospital", times: ["7:05", "8:05", "9:05", "10:05", "11:05", "12:05", "13:05", "14:05", "15:05", "16:05", "17:05", "18:05", "19:05", "20:20"] },
            { stop: "College Street", times: ["7:12", "8:12", "9:12", "10:12", "11:12", "12:12", "13:12", "14:12", "15:12", "16:12", "17:12", "18:12", "19:12", "20:27"] },
            { stop: "Sydney Terminal", times: ["7:22", "8:22", "9:22", "10:22", "11:22", "12:22", "13:22", "14:22", "15:22", "16:22", "17:22", "18:22", "19:22", "20:37"] },
          ],
          saturday: [
            { stop: "Sydney Terminal", times: ["8:30", "10:00", "11:30", "13:00", "14:30", "16:00", "17:30"] },
            { stop: "Westmount Road", times: ["8:40", "10:10", "11:40", "13:10", "14:40", "16:10", "17:40"] },
            { stop: "Cape Breton Regional Hospital", times: ["8:50", "10:20", "11:50", "13:20", "14:50", "16:20", "17:50"] },
            { stop: "College Street", times: ["8:57", "10:27", "11:57", "13:27", "14:57", "16:27", "17:57"] },
            { stop: "Sydney Terminal", times: ["9:07", "10:37", "12:07", "13:37", "15:07", "16:37", "18:07"] },
          ],
        },
      },
    ],
  },

  // Route 7: Howie Centre (loop)
  {
    id: 7,
    name: "Howie Centre",
    nameKey: "route.7.name",
    description: "Loop service through Howie Centre and surrounding area",
    descriptionKey: "route.7.description",
    color: "#D97706",
    directions: [
      {
        id: "7-loop",
        name: "Howie Centre Loop",
        nameKey: "route.7.direction.loop",
        stops: [
          { name: "Sydney Terminal" },
          { name: "Mayflower Mall" },
          { name: "Howie Centre" },
          { name: "Grand Lake Road" },
          { name: "Sydney Terminal" },
        ],
        schedule: {
          weekday: [
            { stop: "Sydney Terminal", times: ["7:00", "8:30", "10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00"] },
            { stop: "Mayflower Mall", times: ["7:10", "8:40", "10:10", "11:40", "13:10", "14:40", "16:10", "17:40", "19:10"] },
            { stop: "Howie Centre", times: ["7:25", "8:55", "10:25", "11:55", "13:25", "14:55", "16:25", "17:55", "19:25"] },
            { stop: "Grand Lake Road", times: ["7:35", "9:05", "10:35", "12:05", "13:35", "15:05", "16:35", "18:05", "19:35"] },
            { stop: "Sydney Terminal", times: ["7:50", "9:20", "10:50", "12:20", "13:50", "15:20", "16:50", "18:20", "19:50"] },
          ],
          saturday: [
            { stop: "Sydney Terminal", times: ["9:00", "11:00", "13:00", "15:00", "17:00"] },
            { stop: "Mayflower Mall", times: ["9:10", "11:10", "13:10", "15:10", "17:10"] },
            { stop: "Howie Centre", times: ["9:25", "11:25", "13:25", "15:25", "17:25"] },
            { stop: "Grand Lake Road", times: ["9:35", "11:35", "13:35", "15:35", "17:35"] },
            { stop: "Sydney Terminal", times: ["9:50", "11:50", "13:50", "15:50", "17:50"] },
          ],
        },
      },
    ],
  },

  // Route 8: Whitney Pier (loop)
  {
    id: 8,
    name: "Whitney Pier",
    nameKey: "route.8.name",
    description: "Loop service through Whitney Pier area of Sydney",
    descriptionKey: "route.8.description",
    color: "#DC2626",
    directions: [
      {
        id: "8-loop",
        name: "Whitney Pier Loop",
        nameKey: "route.8.direction.loop",
        stops: [
          { name: "Sydney Terminal" },
          { name: "Victoria Road" },
          { name: "Whitney Pier" },
          { name: "Lingan Road" },
          { name: "Sydney Terminal" },
        ],
        schedule: {
          weekday: [
            { stop: "Sydney Terminal", times: ["6:30", "7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30"] },
            { stop: "Victoria Road", times: ["6:38", "7:38", "8:38", "9:38", "10:38", "11:38", "12:38", "13:38", "14:38", "15:38", "16:38", "17:38", "18:38", "19:38", "20:38"] },
            { stop: "Whitney Pier", times: ["6:46", "7:46", "8:46", "9:46", "10:46", "11:46", "12:46", "13:46", "14:46", "15:46", "16:46", "17:46", "18:46", "19:46", "20:46"] },
            { stop: "Lingan Road", times: ["6:54", "7:54", "8:54", "9:54", "10:54", "11:54", "12:54", "13:54", "14:54", "15:54", "16:54", "17:54", "18:54", "19:54", "20:54"] },
            { stop: "Sydney Terminal", times: ["7:05", "8:05", "9:05", "10:05", "11:05", "12:05", "13:05", "14:05", "15:05", "16:05", "17:05", "18:05", "19:05", "20:05", "21:05"] },
          ],
          saturday: [
            { stop: "Sydney Terminal", times: ["8:00", "9:30", "11:00", "12:30", "14:00", "15:30", "17:00"] },
            { stop: "Victoria Road", times: ["8:08", "9:38", "11:08", "12:38", "14:08", "15:38", "17:08"] },
            { stop: "Whitney Pier", times: ["8:16", "9:46", "11:16", "12:46", "14:16", "15:46", "17:16"] },
            { stop: "Lingan Road", times: ["8:24", "9:54", "11:24", "12:54", "14:24", "15:54", "17:24"] },
            { stop: "Sydney Terminal", times: ["8:35", "10:05", "11:35", "13:05", "14:35", "16:05", "17:35"] },
          ],
        },
      },
    ],
  },

  // Route 9: Sydney to New Waterford (bidirectional)
  {
    id: 9,
    name: "Sydney to New Waterford",
    nameKey: "route.9.name",
    description: "Service between Sydney Terminal and New Waterford via Scotchtown",
    descriptionKey: "route.9.description",
    color: "#EA580C",
    directions: [
      {
        id: "9-outbound",
        name: "Sydney to New Waterford",
        nameKey: "route.9.direction.outbound",
        stops: [
          { name: "Sydney Terminal" },
          { name: "Mayflower Mall" },
          { name: "Scotchtown" },
          { name: "New Waterford" },
        ],
        schedule: {
          weekday: [
            { stop: "Sydney Terminal", times: ["6:30", "7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "21:00"] },
            { stop: "Mayflower Mall", times: ["6:40", "7:40", "8:40", "9:40", "10:40", "11:40", "12:40", "13:40", "14:40", "15:40", "16:40", "17:40", "18:40", "19:40", "21:10"] },
            { stop: "Scotchtown", times: ["6:55", "7:55", "8:55", "9:55", "10:55", "11:55", "12:55", "13:55", "14:55", "15:55", "16:55", "17:55", "18:55", "19:55", "21:25"] },
            { stop: "New Waterford", times: ["7:10", "8:10", "9:10", "10:10", "11:10", "12:10", "13:10", "14:10", "15:10", "16:10", "17:10", "18:10", "19:10", "20:10", "21:40"] },
          ],
          saturday: [
            { stop: "Sydney Terminal", times: ["8:00", "9:30", "11:00", "12:30", "14:00", "15:30", "17:00"] },
            { stop: "Mayflower Mall", times: ["8:10", "9:40", "11:10", "12:40", "14:10", "15:40", "17:10"] },
            { stop: "Scotchtown", times: ["8:25", "9:55", "11:25", "12:55", "14:25", "15:55", "17:25"] },
            { stop: "New Waterford", times: ["8:40", "10:10", "11:40", "13:10", "14:40", "16:10", "17:40"] },
          ],
        },
      },
      {
        id: "9-inbound",
        name: "New Waterford to Sydney",
        nameKey: "route.9.direction.inbound",
        stops: [
          { name: "New Waterford" },
          { name: "Scotchtown" },
          { name: "Mayflower Mall" },
          { name: "Sydney Terminal" },
        ],
        schedule: {
          weekday: [
            { stop: "New Waterford", times: ["6:30", "7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "21:00"] },
            { stop: "Scotchtown", times: ["6:45", "7:45", "8:45", "9:45", "10:45", "11:45", "12:45", "13:45", "14:45", "15:45", "16:45", "17:45", "18:45", "19:45", "21:15"] },
            { stop: "Mayflower Mall", times: ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:30"] },
            { stop: "Sydney Terminal", times: ["7:10", "8:10", "9:10", "10:10", "11:10", "12:10", "13:10", "14:10", "15:10", "16:10", "17:10", "18:10", "19:10", "20:10", "21:40"] },
          ],
          saturday: [
            { stop: "New Waterford", times: ["8:00", "9:30", "11:00", "12:30", "14:00", "15:30", "17:00"] },
            { stop: "Scotchtown", times: ["8:15", "9:45", "11:15", "12:45", "14:15", "15:45", "17:15"] },
            { stop: "Mayflower Mall", times: ["8:30", "10:00", "11:30", "13:00", "14:30", "16:00", "17:30"] },
            { stop: "Sydney Terminal", times: ["8:40", "10:10", "11:40", "13:10", "14:40", "16:10", "17:40"] },
          ],
        },
      },
    ],
  },

  // Route 10: Alexandra Street (loop)
  {
    id: 10,
    name: "Alexandra Street",
    nameKey: "route.10.name",
    description: "Loop service through Alexandra Street and surrounding area",
    descriptionKey: "route.10.description",
    color: "#DB2777",
    directions: [
      {
        id: "10-loop",
        name: "Alexandra Street Loop",
        nameKey: "route.10.direction.loop",
        stops: [
          { name: "Sydney Terminal" },
          { name: "Alexandra Street" },
          { name: "Brookland Street" },
          { name: "Hardwood Hill" },
          { name: "Sydney Terminal" },
        ],
        schedule: {
          weekday: [
            { stop: "Sydney Terminal", times: ["7:00", "8:30", "10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00"] },
            { stop: "Alexandra Street", times: ["7:08", "8:38", "10:08", "11:38", "13:08", "14:38", "16:08", "17:38", "19:08"] },
            { stop: "Brookland Street", times: ["7:16", "8:46", "10:16", "11:46", "13:16", "14:46", "16:16", "17:46", "19:16"] },
            { stop: "Hardwood Hill", times: ["7:24", "8:54", "10:24", "11:54", "13:24", "14:54", "16:24", "17:54", "19:24"] },
            { stop: "Sydney Terminal", times: ["7:35", "9:05", "10:35", "12:05", "13:35", "15:05", "16:35", "18:05", "19:35"] },
          ],
          saturday: [
            { stop: "Sydney Terminal", times: ["9:00", "11:00", "13:00", "15:00", "17:00"] },
            { stop: "Alexandra Street", times: ["9:08", "11:08", "13:08", "15:08", "17:08"] },
            { stop: "Brookland Street", times: ["9:16", "11:16", "13:16", "15:16", "17:16"] },
            { stop: "Hardwood Hill", times: ["9:24", "11:24", "13:24", "15:24", "17:24"] },
            { stop: "Sydney Terminal", times: ["9:35", "11:35", "13:35", "15:35", "17:35"] },
          ],
        },
      },
    ],
  },

  // Route 11: Ashby (loop)
  {
    id: 11,
    name: "Ashby",
    nameKey: "route.11.name",
    description: "Loop service through Ashby area of Sydney",
    descriptionKey: "route.11.description",
    color: "#4F46E5",
    directions: [
      {
        id: "11-loop",
        name: "Ashby Loop",
        nameKey: "route.11.direction.loop",
        stops: [
          { name: "Sydney Terminal" },
          { name: "Ashby Road" },
          { name: "Ashby" },
          { name: "Kings Road" },
          { name: "Sydney Terminal" },
        ],
        schedule: {
          weekday: [
            { stop: "Sydney Terminal", times: ["7:15", "8:45", "10:15", "11:45", "13:15", "14:45", "16:15", "17:45", "19:15"] },
            { stop: "Ashby Road", times: ["7:23", "8:53", "10:23", "11:53", "13:23", "14:53", "16:23", "17:53", "19:23"] },
            { stop: "Ashby", times: ["7:32", "9:02", "10:32", "12:02", "13:32", "15:02", "16:32", "18:02", "19:32"] },
            { stop: "Kings Road", times: ["7:40", "9:10", "10:40", "12:10", "13:40", "15:10", "16:40", "18:10", "19:40"] },
            { stop: "Sydney Terminal", times: ["7:50", "9:20", "10:50", "12:20", "13:50", "15:20", "16:50", "18:20", "19:50"] },
          ],
          saturday: [
            { stop: "Sydney Terminal", times: ["9:15", "11:15", "13:15", "15:15", "17:15"] },
            { stop: "Ashby Road", times: ["9:23", "11:23", "13:23", "15:23", "17:23"] },
            { stop: "Ashby", times: ["9:32", "11:32", "13:32", "15:32", "17:32"] },
            { stop: "Kings Road", times: ["9:40", "11:40", "13:40", "15:40", "17:40"] },
            { stop: "Sydney Terminal", times: ["9:50", "11:50", "13:50", "15:50", "17:50"] },
          ],
        },
      },
    ],
  },

  // Route 12: Sydney to Membertou to Sydney River (bidirectional)
  {
    id: 12,
    name: "Sydney - Membertou - Sydney River",
    nameKey: "route.12.name",
    description: "Service between Sydney Terminal, Membertou, and Sydney River",
    descriptionKey: "route.12.description",
    color: "#65A30D",
    directions: [
      {
        id: "12-outbound",
        name: "Sydney to Membertou to Sydney River",
        nameKey: "route.12.direction.outbound",
        stops: [
          { name: "Sydney Terminal" },
          { name: "Membertou" },
          { name: "Coxheath Road" },
          { name: "Sydney River" },
        ],
        schedule: {
          weekday: [
            { stop: "Sydney Terminal", times: ["6:45", "7:45", "8:45", "9:45", "10:45", "11:45", "12:45", "13:45", "14:45", "15:45", "16:45", "17:45", "18:45", "20:00"] },
            { stop: "Membertou", times: ["6:55", "7:55", "8:55", "9:55", "10:55", "11:55", "12:55", "13:55", "14:55", "15:55", "16:55", "17:55", "18:55", "20:10"] },
            { stop: "Coxheath Road", times: ["7:05", "8:05", "9:05", "10:05", "11:05", "12:05", "13:05", "14:05", "15:05", "16:05", "17:05", "18:05", "19:05", "20:20"] },
            { stop: "Sydney River", times: ["7:15", "8:15", "9:15", "10:15", "11:15", "12:15", "13:15", "14:15", "15:15", "16:15", "17:15", "18:15", "19:15", "20:30"] },
          ],
          saturday: [
            { stop: "Sydney Terminal", times: ["8:30", "10:00", "11:30", "13:00", "14:30", "16:00", "17:30"] },
            { stop: "Membertou", times: ["8:40", "10:10", "11:40", "13:10", "14:40", "16:10", "17:40"] },
            { stop: "Coxheath Road", times: ["8:50", "10:20", "11:50", "13:20", "14:50", "16:20", "17:50"] },
            { stop: "Sydney River", times: ["9:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00"] },
          ],
        },
      },
      {
        id: "12-inbound",
        name: "Sydney River to Membertou to Sydney",
        nameKey: "route.12.direction.inbound",
        stops: [
          { name: "Sydney River" },
          { name: "Coxheath Road" },
          { name: "Membertou" },
          { name: "Sydney Terminal" },
        ],
        schedule: {
          weekday: [
            { stop: "Sydney River", times: ["6:45", "7:45", "8:45", "9:45", "10:45", "11:45", "12:45", "13:45", "14:45", "15:45", "16:45", "17:45", "18:45", "20:00"] },
            { stop: "Coxheath Road", times: ["6:55", "7:55", "8:55", "9:55", "10:55", "11:55", "12:55", "13:55", "14:55", "15:55", "16:55", "17:55", "18:55", "20:10"] },
            { stop: "Membertou", times: ["7:05", "8:05", "9:05", "10:05", "11:05", "12:05", "13:05", "14:05", "15:05", "16:05", "17:05", "18:05", "19:05", "20:20"] },
            { stop: "Sydney Terminal", times: ["7:15", "8:15", "9:15", "10:15", "11:15", "12:15", "13:15", "14:15", "15:15", "16:15", "17:15", "18:15", "19:15", "20:30"] },
          ],
          saturday: [
            { stop: "Sydney River", times: ["8:30", "10:00", "11:30", "13:00", "14:30", "16:00", "17:30"] },
            { stop: "Coxheath Road", times: ["8:40", "10:10", "11:40", "13:10", "14:40", "16:10", "17:40"] },
            { stop: "Membertou", times: ["8:50", "10:20", "11:50", "13:20", "14:50", "16:20", "17:50"] },
            { stop: "Sydney Terminal", times: ["9:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00"] },
          ],
        },
      },
    ],
  },

  // Route 13: George Street (loop)
  {
    id: 13,
    name: "George Street",
    nameKey: "route.13.name",
    description: "Loop service through George Street area of Sydney",
    descriptionKey: "route.13.description",
    color: "#0EA5E9",
    directions: [
      {
        id: "13-loop",
        name: "George Street Loop",
        nameKey: "route.13.direction.loop",
        stops: [
          { name: "Sydney Terminal" },
          { name: "George Street" },
          { name: "Townsend Street" },
          { name: "Intercolonial Street" },
          { name: "Sydney Terminal" },
        ],
        schedule: {
          weekday: [
            { stop: "Sydney Terminal", times: ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"] },
            { stop: "George Street", times: ["7:08", "8:08", "9:08", "10:08", "11:08", "12:08", "13:08", "14:08", "15:08", "16:08", "17:08", "18:08", "19:08", "20:08"] },
            { stop: "Townsend Street", times: ["7:15", "8:15", "9:15", "10:15", "11:15", "12:15", "13:15", "14:15", "15:15", "16:15", "17:15", "18:15", "19:15", "20:15"] },
            { stop: "Intercolonial Street", times: ["7:22", "8:22", "9:22", "10:22", "11:22", "12:22", "13:22", "14:22", "15:22", "16:22", "17:22", "18:22", "19:22", "20:22"] },
            { stop: "Sydney Terminal", times: ["7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30"] },
          ],
          saturday: [
            { stop: "Sydney Terminal", times: ["9:00", "10:30", "12:00", "13:30", "15:00", "16:30"] },
            { stop: "George Street", times: ["9:08", "10:38", "12:08", "13:38", "15:08", "16:38"] },
            { stop: "Townsend Street", times: ["9:15", "10:45", "12:15", "13:45", "15:15", "16:45"] },
            { stop: "Intercolonial Street", times: ["9:22", "10:52", "12:22", "13:52", "15:22", "16:52"] },
            { stop: "Sydney Terminal", times: ["9:30", "11:00", "12:30", "14:00", "15:30", "17:00"] },
          ],
        },
      },
    ],
  },
];

export function getRouteById(id: number): Route | undefined {
  return routes.find((route) => route.id === id);
}

export function getAllStopNames(): string[] {
  const stopNames = new Set<string>();
  for (const route of routes) {
    for (const direction of route.directions) {
      for (const stop of direction.stops) {
        stopNames.add(stop.name);
      }
    }
  }
  return Array.from(stopNames).sort();
}
