// CB Transit - CBRM Transit Route Data
// Extracted from official CBRM transit schedule PDFs
// Source: https://cbrm.ns.ca/transportation/transit-cape-breton/routes-schedules/

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
  // Route 1: Sydney to Glace Bay
  {
    id: 1,
    name: "Sydney to Glace Bay",
    nameKey: "route.1.name",
    description: "Service between Sydney Terminal and Glace Bay via Reserve Mines and Dominion",
    descriptionKey: "route.1.description",
    color: "#2563EB",
    mapUrl: "https://gis2.cbrm.ns.ca/portal/apps/webappviewer/index.html?id=24cf18d38a704c19b1f6c2bfbae4f04a&showLayers=Route%2001%20Vehicles;Zone%20Boundaries;Route%2001B%20-%20Sydney%20to%20Glace%20Bay%20Stops;Route%2001B%20-%20Sydney%20to%20Glace%20Bay;Route%2001A%20-%20Glace%20Bay%20to%20Sydney%20Stops;Route%2001A%20-%20Glace%20Bay%20to%20Sydney&center=-60.090,46.174&level=12",
    directions: [
      {
        id: "1-outbound",
        name: "Sydney to Glace Bay",
        nameKey: "route.1.direction.outbound",
        stops: [
          { name: "Pitt St./George St." },
          { name: "Ashby Corner" },
          { name: "SPAR Road/Walmart" },
          { name: "Mayflower Mall" },
          { name: "C.B.U." },
          { name: "Reserve/TIM Hortons" },
          { name: "Dominion/TIM Hortons" },
          { name: "Station St/Main St" },
          { name: "Marconi St/Commercial St" },
        ],
        schedule: {
          weekday: [
            { stop: "Pitt St./George St.", times: ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"] },
            { stop: "Ashby Corner", times: ["7:07", "8:07", "9:07", "10:07", "11:07", "12:07", "13:07", "14:07", "15:07", "16:07", "17:07", "18:07", "19:07", "20:07", "21:07", "22:07"] },
            { stop: "SPAR Road/Walmart", times: ["7:15", "8:15", "9:15", "10:15", "11:15", "12:15", "13:15", "14:15", "15:15", "16:15", "17:15", "18:15", "19:15", "20:15", "21:15", "22:15"] },
            { stop: "Mayflower Mall", times: ["7:20", "8:20", "9:20", "10:20", "11:20", "12:20", "13:20", "14:20", "15:20", "16:20", "17:20", "18:20", "19:20", "20:20", "21:20", "22:20"] },
            { stop: "C.B.U.", times: ["7:25", "8:25", "9:25", "10:25", "11:25", "12:25", "13:25", "14:25", "15:25", "16:25", "17:25", "18:25", "19:25", "20:25", "21:25", "22:25"] },
            { stop: "Reserve/TIM Hortons", times: ["7:35", "8:35", "9:35", "10:35", "11:35", "12:35", "13:35", "14:35", "15:35", "16:35", "17:35", "18:35", "19:35", "20:35", "21:35", "22:35"] },
            { stop: "Dominion/TIM Hortons", times: ["7:40", "8:40", "9:40", "10:40", "11:40", "12:40", "13:40", "14:40", "15:40", "16:40", "17:40", "18:40", "19:40", "20:40", "21:40", "22:40"] },
            { stop: "Station St/Main St", times: ["7:42", "8:42", "9:42", "10:42", "11:42", "12:42", "13:42", "14:42", "15:42", "16:42", "17:42", "18:42", "19:42", "20:42", "21:42", "22:42"] },
            { stop: "Marconi St/Commercial St", times: ["7:55", "8:55", "9:55", "10:55", "11:55", "12:55", "13:55", "14:55", "15:55", "16:55", "17:55", "18:55", "19:55", "20:55", "21:55", "22:55"] },
          ],
          saturday: [
          ],
          sunday: [
            { stop: "Pitt St./George St.", times: ["10:00", "12:00", "15:00", "17:00"] },
            { stop: "Ashby Corner", times: ["10:07", "12:07", "15:07", "17:07"] },
            { stop: "SPAR Road/Walmart", times: ["10:15", "12:15", "15:15", "17:15"] },
            { stop: "Mayflower Mall", times: ["10:20", "12:20", "15:20", "17:20"] },
            { stop: "C.B.U.", times: ["10:25", "12:25", "15:25", "17:25"] },
            { stop: "Reserve/TIM Hortons", times: ["10:35", "12:35", "15:35", "17:35"] },
            { stop: "Dominion/TIM Hortons", times: ["10:40", "12:40", "15:40", "17:40"] },
            { stop: "Station St/Main St", times: ["10:42", "12:42", "15:42", "17:42"] },
            { stop: "Marconi St/Commercial St", times: ["10:55", "12:55", "15:55", "17:55"] },
          ],
        },
      },
      {
        id: "1-inbound",
        name: "Glace Bay to Sydney",
        nameKey: "route.1.direction.inbound",
        stops: [
          { name: "Marconi St/Commercial St" },
          { name: "Station St/Main St" },
          { name: "Dominion/TIM Hortons" },
          { name: "Reserve/TIM Hortons" },
          { name: "C.B.U." },
          { name: "Mayflower Mall" },
          { name: "SPAR Road/Walmart" },
          { name: "Ashby Corner" },
          { name: "Pitt St./George St." },
        ],
        schedule: {
          weekday: [
            { stop: "Marconi St/Commercial St", times: ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"] },
            { stop: "Station St/Main St", times: ["7:13", "8:13", "9:13", "10:13", "11:13", "12:13", "13:13", "14:13", "15:13", "16:13", "17:13", "18:13", "19:13", "20:13", "21:13", "22:13"] },
            { stop: "Dominion/TIM Hortons", times: ["7:15", "8:15", "9:15", "10:15", "11:15", "12:15", "13:15", "14:15", "15:15", "16:15", "17:15", "18:15", "19:15", "20:15", "21:15", "22:15"] },
            { stop: "Reserve/TIM Hortons", times: ["7:20", "8:20", "9:20", "10:20", "11:20", "12:20", "13:20", "14:20", "15:20", "16:20", "17:20", "18:20", "19:20", "20:20", "21:20", "22:20"] },
            { stop: "C.B.U.", times: ["7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30", "21:30", "22:30"] },
            { stop: "Mayflower Mall", times: ["7:35", "8:35", "9:35", "10:35", "11:35", "12:35", "13:35", "14:35", "15:35", "16:35", "17:35", "18:35", "19:35", "20:35", "21:35", "22:35"] },
            { stop: "SPAR Road/Walmart", times: ["7:40", "8:40", "9:40", "10:40", "11:40", "12:40", "13:40", "14:40", "15:40", "16:40", "17:40", "18:40", "19:40", "20:40", "21:40", "22:40"] },
            { stop: "Ashby Corner", times: ["7:48", "8:48", "9:48", "10:48", "11:48", "12:48", "13:48", "14:48", "15:48", "16:48", "17:48", "18:48", "19:48", "20:48", "21:48", "22:48"] },
            { stop: "Pitt St./George St.", times: ["7:55", "8:55", "9:55", "10:55", "11:55", "12:55", "13:55", "14:55", "15:55", "16:55", "17:55", "18:55", "19:55", "20:55", "21:55", "22:55"] },
          ],
          saturday: [
          ],
          sunday: [
            { stop: "Marconi St/Commercial St", times: ["11:00", "13:00", "16:00"] },
            { stop: "Station St/Main St", times: ["11:13", "13:13", "16:13"] },
            { stop: "Dominion/TIM Hortons", times: ["11:15", "13:15", "16:15"] },
            { stop: "Reserve/TIM Hortons", times: ["11:20", "13:20", "16:20"] },
            { stop: "C.B.U.", times: ["11:30", "13:30", "16:30"] },
            { stop: "Mayflower Mall", times: ["11:35", "13:35", "16:35"] },
            { stop: "SPAR Road/Walmart", times: ["11:40", "13:40", "16:40"] },
            { stop: "Ashby Corner", times: ["11:48", "13:48", "16:48"] },
            { stop: "Pitt St./George St.", times: ["11:55", "13:55", "16:55"] },
          ],
        },
      },
    ],
  },

  // Route 2: Sydney to Glace Bay Express
  {
    id: 2,
    name: "Sydney to Glace Bay Express",
    nameKey: "route.2.name",
    description: "Express service between Sydney Terminal and Glace Bay with limited stops",
    descriptionKey: "route.2.description",
    color: "#1D4ED8",
    mapUrl: "https://gis2.cbrm.ns.ca/portal/apps/webappviewer/index.html?id=24cf18d38a704c19b1f6c2bfbae4f04a&showLayers=Route%2002%20Vehicles;Zone%20Boundaries;Route%2002B%20-%20Sydney%20to%20Glace%20Bay%20Stops;Route%2002B%20-%20Sydney%20to%20Glace%20Bay;Route%2002A%20-%20Glace%20Bay%20to%20Sydney%20Stops;Route%2002A%20-%20Glace%20Bay%20to%20Sydney&center=-60.086,46.168&level=12",
    directions: [
      {
        id: "2-outbound",
        name: "Sydney to Glace Bay Express",
        nameKey: "route.2.direction.outbound",
        stops: [
          { name: "Pitt St./George St." },
          { name: "Ashby Corner" },
          { name: "Walmart" },
          { name: "Mayflower Mall" },
          { name: "C.B.U." },
          { name: "Reserve Mines/TIM Hortons" },
          { name: "Phalens Rd/Reserve St" },
          { name: "Marconi St/Commercial St" },
        ],
        schedule: {
          weekday: [
            { stop: "Pitt St./George St.", times: ["7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30", "21:30"] },
            { stop: "Ashby Corner", times: ["7:37", "8:37", "9:37", "10:37", "11:37", "12:37", "13:37", "14:37", "15:37", "16:37", "17:37", "18:37", "19:37", "20:37", "21:37"] },
            { stop: "Walmart", times: ["7:45", "8:45", "9:45", "10:45", "11:45", "12:45", "13:45", "14:45", "15:45", "16:45", "17:45", "18:45", "19:45", "20:45", "21:45"] },
            { stop: "Mayflower Mall", times: ["7:50", "8:50", "9:50", "10:50", "11:50", "12:50", "13:50", "14:50", "15:50", "16:50", "17:50", "18:50", "19:50", "20:50", "21:50"] },
            { stop: "C.B.U.", times: ["7:55", "8:55", "9:55", "10:55", "11:55", "12:55", "13:55", "14:55", "15:55", "16:55", "17:55", "18:55", "19:55", "20:55", "21:55"] },
            { stop: "Reserve Mines/TIM Hortons", times: ["8:05", "9:05", "10:05", "11:05", "12:05", "13:05", "14:05", "15:05", "16:05", "17:05", "18:05", "19:05", "20:05", "21:05", "22:05"] },
            { stop: "Phalens Rd/Reserve St", times: ["8:10", "9:10", "10:10", "11:10", "12:10", "13:10", "14:10", "15:10", "16:10", "17:10", "18:10", "19:10", "20:10", "21:10", "22:10"] },
            { stop: "Marconi St/Commercial St", times: ["8:15", "9:15", "10:15", "11:15", "12:15", "13:15", "14:15", "15:15", "16:15", "17:15", "18:15", "19:15", "20:15", "21:15", "22:15"] },
          ],
          saturday: [
            { stop: "Pitt St./George St.", times: ["7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30", "21:30"] },
            { stop: "Ashby Corner", times: ["7:37", "8:37", "9:37", "10:37", "11:37", "12:37", "13:37", "14:37", "15:37", "16:37", "17:37", "18:37", "19:37", "20:37", "21:37"] },
            { stop: "Walmart", times: ["7:45", "8:45", "9:45", "10:45", "11:45", "12:45", "13:45", "14:45", "15:45", "16:45", "17:45", "18:45", "19:45", "20:45", "21:45"] },
            { stop: "Mayflower Mall", times: ["7:50", "8:50", "9:50", "10:50", "11:50", "12:50", "13:50", "14:50", "15:50", "16:50", "17:50", "18:50", "19:50", "20:50", "21:50"] },
            { stop: "C.B.U.", times: ["7:55", "8:55", "9:55", "10:55", "11:55", "12:55", "13:55", "14:55", "15:55", "16:55", "17:55", "18:55", "19:55", "20:55", "21:55"] },
            { stop: "Reserve Mines/TIM Hortons", times: ["8:05", "9:05", "10:05", "11:05", "12:05", "13:05", "14:05", "15:05", "16:05", "17:05", "18:05", "19:05", "20:05", "21:05", "22:05"] },
            { stop: "Phalens Rd/Reserve St", times: ["8:10", "9:10", "10:10", "11:10", "12:10", "13:10", "14:10", "15:10", "16:10", "17:10", "18:10", "19:10", "20:10", "21:10", "22:10"] },
            { stop: "Marconi St/Commercial St", times: ["8:15", "9:15", "10:15", "11:15", "12:15", "13:15", "14:15", "15:15", "16:15", "17:15", "18:15", "19:15", "20:15", "21:15", "22:15"] },
          ],
        },
      },
      {
        id: "2-inbound",
        name: "Glace Bay to Sydney Express",
        nameKey: "route.2.direction.inbound",
        stops: [
          { name: "Marconi St/Commercial St" },
          { name: "Phalens Rd/Reserve St" },
          { name: "Reserve Mines/TIM Hortons" },
          { name: "C.B.U." },
          { name: "Mayflower Mall" },
          { name: "Walmart" },
          { name: "Ashby Corner" },
          { name: "Pitt St./George St." },
        ],
        schedule: {
          weekday: [
            { stop: "Marconi St/Commercial St", times: ["7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30", "21:30", "22:30"] },
            { stop: "Phalens Rd/Reserve St", times: ["7:35", "8:35", "9:35", "10:35", "11:35", "12:35", "13:35", "14:35", "15:35", "16:35", "17:35", "18:35", "19:35", "20:35", "21:35", "22:35"] },
            { stop: "Reserve Mines/TIM Hortons", times: ["7:40", "8:40", "9:40", "10:40", "11:40", "12:40", "13:40", "14:40", "15:40", "16:40", "17:40", "18:40", "19:40", "20:40", "21:40", "22:40"] },
            { stop: "C.B.U.", times: ["7:50", "8:50", "9:50", "10:50", "11:50", "12:50", "13:50", "14:50", "15:50", "16:50", "17:50", "18:50", "19:50", "20:50", "21:50", "22:50"] },
            { stop: "Mayflower Mall", times: ["7:55", "8:55", "9:55", "10:55", "11:55", "12:55", "13:55", "14:55", "15:55", "16:55", "17:55", "18:55", "19:55", "20:55", "21:55", "22:55"] },
            { stop: "Walmart", times: ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"] },
            { stop: "Ashby Corner", times: ["8:08", "9:08", "10:08", "11:08", "12:08", "13:08", "14:08", "15:08", "16:08", "17:08", "18:08", "19:08", "20:08", "21:08", "22:08", "—"] },
            { stop: "Pitt St./George St.", times: ["8:15", "9:15", "10:15", "11:15", "12:15", "13:15", "14:15", "15:15", "16:15", "17:15", "18:15", "19:15", "20:15", "21:15", "22:15", "—"] },
          ],
          saturday: [
            { stop: "Marconi St/Commercial St", times: ["7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30", "21:30", "22:30"] },
            { stop: "Phalens Rd/Reserve St", times: ["7:35", "8:35", "9:35", "10:35", "11:35", "12:35", "13:35", "14:35", "15:35", "16:35", "17:35", "18:35", "19:35", "20:35", "21:35", "22:35"] },
            { stop: "Reserve Mines/TIM Hortons", times: ["7:40", "8:40", "9:40", "10:40", "11:40", "12:40", "13:40", "14:40", "15:40", "16:40", "17:40", "18:40", "19:40", "20:40", "21:40", "22:40"] },
            { stop: "C.B.U.", times: ["7:50", "8:50", "9:50", "10:50", "11:50", "12:50", "13:50", "14:50", "15:50", "16:50", "17:50", "18:50", "19:50", "20:50", "21:50", "22:50"] },
            { stop: "Mayflower Mall", times: ["7:55", "8:55", "9:55", "10:55", "11:55", "12:55", "13:55", "14:55", "15:55", "16:55", "17:55", "18:55", "19:55", "20:55", "21:55", "22:55"] },
            { stop: "Walmart", times: ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"] },
            { stop: "Ashby Corner", times: ["8:08", "9:08", "10:08", "11:08", "12:08", "13:08", "14:08", "15:08", "16:08", "17:08", "18:08", "19:08", "20:08", "21:08", "22:08", "—"] },
            { stop: "Pitt St./George St.", times: ["8:15", "9:15", "10:15", "11:15", "12:15", "13:15", "14:15", "15:15", "16:15", "17:15", "18:15", "19:15", "20:15", "21:15", "22:15", "—"] },
          ],
        },
      },
    ],
  },

  // Route 3: New Aberdeen
  {
    id: 3,
    name: "New Aberdeen",
    nameKey: "route.3.name",
    description: "Loop service through New Aberdeen area",
    descriptionKey: "route.3.description",
    color: "#059669",
    mapUrl: "https://gis2.cbrm.ns.ca/portal/apps/webappviewer/index.html?id=24cf18d38a704c19b1f6c2bfbae4f04a&showLayers=Route%2003%20Vehicles;Route%2003%20Stops;Route%2003&center=-59.972,46.206&level=13",
    directions: [
      {
        id: "3-loop",
        name: "New Aberdeen Loop",
        nameKey: "route.3.direction.loop",
        stops: [
          { name: "Marconi St/Commercial St" },
          { name: "First Street" },
          { name: "Connaught Avenue" },
          { name: "Station Street" },
          { name: "Marconi St/Commercial St" },
        ],
        schedule: {
          weekday: [
            { stop: "Marconi St/Commercial St", times: ["7:00", "8:00", "9:00", "10:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"] },
            { stop: "First Street", times: ["7:05", "8:05", "9:05", "10:05", "12:05", "13:05", "14:05", "15:05", "16:05", "17:05", "18:05", "19:05", "20:05", "21:05", "22:05"] },
            { stop: "Connaught Avenue", times: ["7:10", "8:10", "9:10", "10:10", "12:10", "13:10", "14:10", "15:10", "16:10", "17:10", "18:10", "19:10", "20:10", "21:10", "22:10"] },
            { stop: "Station Street", times: ["7:13", "8:13", "9:13", "10:13", "12:13", "13:13", "14:13", "15:13", "16:13", "17:13", "18:13", "19:13", "20:13", "21:13", "22:13"] },
            { stop: "Marconi St/Commercial St", times: ["7:30", "8:30", "9:30", "10:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30", "21:30", "22:30"] },
          ],
          saturday: [
            { stop: "Marconi St/Commercial St", times: ["8:00", "9:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"] },
            { stop: "First Street", times: ["8:05", "9:05", "10:05", "11:05", "12:05", "14:05", "15:05", "16:05", "17:05", "18:05"] },
            { stop: "Connaught Avenue", times: ["8:10", "9:10", "10:10", "11:10", "12:10", "14:10", "15:10", "16:10", "17:10", "18:10"] },
            { stop: "Station Street", times: ["8:13", "9:13", "10:13", "11:13", "12:13", "14:13", "15:13", "16:13", "17:13", "18:13"] },
            { stop: "Marconi St/Commercial St", times: ["8:30", "9:30", "10:30", "11:30", "12:30", "14:30", "15:30", "16:30", "17:30", "18:30"] },
          ],
        },
      },
    ],
  },

  // Route 4: Steele's Hill
  {
    id: 4,
    name: "Steele's Hill",
    nameKey: "route.4.name",
    description: "Loop service through Steele's Hill and surrounding area",
    descriptionKey: "route.4.description",
    color: "#0891B2",
    mapUrl: "https://gis2.cbrm.ns.ca/portal/apps/webappviewer/index.html?id=24cf18d38a704c19b1f6c2bfbae4f04a&showLayers=Route%2004%20Vehicles;Route%2004%20Stops;Route%2004&center=-59.958,46.185&level=13",
    directions: [
      {
        id: "4-loop",
        name: "Steele's Hill Loop",
        nameKey: "route.4.direction.loop",
        stops: [
          { name: "Marconi Street" },
          { name: "Brookside Street" },
          { name: "Steele's Hill" },
          { name: "General Hospital" },
          { name: "Commercial Street" },
        ],
        schedule: {
          weekday: [
            { stop: "Marconi Street", times: ["7:30", "8:30", "9:30", "10:30", "12:30", "13:30", "15:30", "16:30", "17:30", "19:30", "20:30", "21:30"] },
            { stop: "Brookside Street", times: ["7:35", "8:35", "9:35", "10:35", "12:35", "13:35", "15:35", "16:35", "17:35", "19:35", "20:35", "21:35"] },
            { stop: "Steele's Hill", times: ["7:40", "8:40", "9:40", "10:40", "12:40", "13:40", "15:40", "16:40", "17:40", "19:40", "20:40", "21:40"] },
            { stop: "General Hospital", times: ["7:50", "8:50", "9:50", "10:50", "12:50", "13:50", "15:50", "16:50", "17:50", "19:50", "20:50", "21:50"] },
            { stop: "Commercial Street", times: ["8:00", "9:00", "10:00", "11:00", "13:00", "14:00", "16:00", "17:00", "18:00", "20:00", "21:00", "22:00"] },
          ],
          saturday: [
            { stop: "Marconi Street", times: ["8:30", "9:30", "10:30", "11:30", "12:30", "14:30", "15:30", "16:30", "17:30"] },
            { stop: "Brookside Street", times: ["8:35", "9:35", "10:35", "11:35", "12:35", "14:35", "15:35", "16:35", "17:35"] },
            { stop: "Steele's Hill", times: ["8:40", "9:40", "10:40", "11:40", "12:40", "14:40", "15:40", "16:40", "17:40"] },
            { stop: "General Hospital", times: ["8:50", "9:50", "10:50", "11:50", "12:50", "14:50", "15:50", "16:50", "17:50"] },
            { stop: "Commercial Street", times: ["9:00", "10:00", "11:00", "12:00", "13:00", "15:00", "16:00", "17:00", "18:00"] },
          ],
        },
      },
    ],
  },

  // Route 5: Sydney to Sydney Mines
  {
    id: 5,
    name: "Sydney to Sydney Mines",
    nameKey: "route.5.name",
    description: "Service between Sydney Terminal and Sydney Mines via North Sydney",
    descriptionKey: "route.5.description",
    color: "#7C3AED",
    mapUrl: "https://gis2.cbrm.ns.ca/portal/apps/webappviewer/index.html?id=24cf18d38a704c19b1f6c2bfbae4f04a&showLayers=Route%2005%20Vehicles;Zone%20Boundaries;Route%2005B%20-%20Sydney%20to%20Sydney%20Mines%20Stops;Route%2005B%20-%20Sydney%20to%20Sydney%20Mines;Route%2005A%20-%20Sydney%20Mines%20to%20Sydney%20Stops;Route%2005A%20-%20Sydney%20Mines%20to%20Sydney&center=-60.183,46.173&level=11",
    directions: [
      {
        id: "5-outbound",
        name: "Sydney to Sydney Mines",
        nameKey: "route.5.direction.outbound",
        stops: [
          { name: "Pitt St./George St." },
          { name: "Cabot House/Sydney River" },
          { name: "Sydney River Mall" },
          { name: "Northside Mall" },
          { name: "Northside Commercial St." },
          { name: "Northside Hospital" },
          { name: "Sydney Mines/Main Street" },
          { name: "Sydney Mines/Pit Street" },
        ],
        schedule: {
          weekday: [
            { stop: "Pitt St./George St.", times: ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"] },
            { stop: "Cabot House/Sydney River", times: ["7:07", "8:07", "9:07", "10:07", "11:07", "12:07", "13:07", "14:07", "15:07", "16:07", "17:07", "18:07", "19:07", "20:07", "21:07"] },
            { stop: "Sydney River Mall", times: ["7:15", "8:15", "9:15", "10:15", "11:15", "12:15", "13:15", "14:15", "15:15", "16:15", "17:15", "18:15", "19:15", "20:15", "21:15"] },
            { stop: "Northside Mall", times: ["7:40", "8:40", "9:40", "10:40", "11:40", "12:40", "13:40", "14:40", "15:40", "16:40", "17:40", "18:40", "19:40", "20:40", "21:40"] },
            { stop: "Northside Commercial St.", times: ["7:45", "8:45", "9:45", "10:45", "11:45", "12:45", "13:45", "14:45", "15:45", "16:45", "17:45", "18:45", "19:45", "20:45", "21:45"] },
            { stop: "Northside Hospital", times: ["7:50", "8:50", "9:50", "10:50", "11:50", "12:50", "13:50", "14:50", "15:50", "16:50", "17:50", "18:50", "19:50", "20:50", "21:50"] },
            { stop: "Sydney Mines/Main Street", times: ["7:55", "8:55", "9:55", "10:55", "11:55", "12:55", "13:55", "14:55", "15:55", "16:55", "17:55", "18:55", "19:55", "20:55", "21:55"] },
            { stop: "Sydney Mines/Pit Street", times: ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"] },
          ],
          saturday: [
            { stop: "Pitt St./George St.", times: ["8:00", "10:00", "12:00", "13:00", "14:00", "15:00", "17:00", "19:00"] },
            { stop: "Cabot House/Sydney River", times: ["8:07", "10:07", "12:07", "13:07", "14:07", "15:07", "17:07", "19:07"] },
            { stop: "Sydney River Mall", times: ["8:15", "10:15", "12:15", "13:15", "14:15", "15:15", "17:15", "19:15"] },
            { stop: "Northside Mall", times: ["8:40", "10:40", "12:40", "13:40", "14:40", "15:40", "17:40", "19:40"] },
            { stop: "Northside Commercial St.", times: ["8:45", "10:45", "12:45", "13:45", "14:45", "15:45", "17:45", "19:45"] },
            { stop: "Northside Hospital", times: ["8:50", "10:50", "12:50", "13:50", "14:50", "15:50", "17:50", "19:50"] },
            { stop: "Sydney Mines/Main Street", times: ["8:55", "10:55", "12:55", "13:55", "14:55", "15:55", "17:55", "19:55"] },
            { stop: "Sydney Mines/Pit Street", times: ["9:00", "11:00", "13:00", "14:00", "15:00", "16:00", "18:00", "20:00"] },
          ],
        },
      },
      {
        id: "5-inbound",
        name: "Sydney Mines to Sydney",
        nameKey: "route.5.direction.inbound",
        stops: [
          { name: "Sydney Mines/Pit Street" },
          { name: "Sydney Mines/Main Street" },
          { name: "Northside Hospital" },
          { name: "Prince St./Archibald St." },
          { name: "Northside Mall" },
          { name: "Sydney River Mall" },
          { name: "Cabot House/Sydney River" },
          { name: "Pitt St./George St." },
        ],
        schedule: {
          weekday: [
            { stop: "Sydney Mines/Pit Street", times: ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"] },
            { stop: "Sydney Mines/Main Street", times: ["7:05", "8:05", "9:05", "10:05", "11:05", "12:05", "13:05", "14:05", "15:05", "16:05", "17:05", "18:05", "19:05", "20:05", "21:05", "22:05"] },
            { stop: "Northside Hospital", times: ["7:10", "8:10", "9:10", "10:10", "11:10", "12:10", "13:10", "14:10", "15:10", "16:10", "17:10", "18:10", "19:10", "20:10", "21:10", "22:10"] },
            { stop: "Prince St./Archibald St.", times: ["7:15", "8:15", "9:15", "10:15", "11:15", "12:15", "13:15", "14:15", "15:15", "16:15", "17:15", "18:15", "19:15", "20:15", "21:15", "22:15"] },
            { stop: "Northside Mall", times: ["7:20", "8:20", "9:20", "10:20", "11:20", "12:20", "13:20", "14:20", "15:20", "16:20", "17:20", "18:20", "19:20", "20:20", "21:20", "22:20"] },
            { stop: "Sydney River Mall", times: ["7:43", "8:43", "9:43", "10:43", "11:43", "12:43", "13:43", "14:43", "15:43", "16:43", "17:43", "18:43", "19:43", "20:43", "21:43", "22:43"] },
            { stop: "Cabot House/Sydney River", times: ["7:51", "8:51", "9:51", "10:51", "11:51", "12:51", "13:51", "14:51", "15:51", "16:51", "17:51", "18:51", "19:51", "20:51", "21:51", "22:51"] },
            { stop: "Pitt St./George St.", times: ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"] },
          ],
          saturday: [
            { stop: "Sydney Mines/Pit Street", times: ["9:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "18:00"] },
            { stop: "Sydney Mines/Main Street", times: ["9:05", "11:05", "12:05", "13:05", "14:05", "15:05", "16:05", "18:05"] },
            { stop: "Northside Hospital", times: ["9:10", "11:10", "12:10", "13:10", "14:10", "15:10", "16:10", "18:10"] },
            { stop: "Prince St./Archibald St.", times: ["9:15", "11:15", "12:15", "13:15", "14:15", "15:15", "16:15", "18:15"] },
            { stop: "Northside Mall", times: ["9:20", "11:20", "12:20", "13:20", "14:20", "15:20", "16:20", "18:20"] },
            { stop: "Sydney River Mall", times: ["9:43", "11:43", "12:43", "13:43", "14:43", "15:43", "16:43", "18:43"] },
            { stop: "Cabot House/Sydney River", times: ["9:51", "11:51", "12:51", "13:51", "14:51", "15:51", "16:51", "18:51"] },
            { stop: "Pitt St./George St.", times: ["10:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "19:00"] },
          ],
        },
      },
    ],
  },

  // Route 6: Westmount
  {
    id: 6,
    name: "Westmount",
    nameKey: "route.6.name",
    description: "Loop service through Westmount area of Sydney",
    descriptionKey: "route.6.description",
    color: "#0D9488",
    mapUrl: "https://gis2.cbrm.ns.ca/portal/apps/webappviewer/index.html?id=24cf18d38a704c19b1f6c2bfbae4f04a&showLayers=Route%2006%20Vehicles;Zone%20Boundaries;Route%2006%20-%20Westmount%20Stops;Route%2006%20-%20Westmount%20&center=-60.2160,46.130&level=13",
    directions: [
      {
        id: "6-loop",
        name: "Westmount Loop",
        nameKey: "route.6.direction.loop",
        stops: [
          { name: "Sydney River Mall" },
          { name: "Kennys/Coxheath Rd" },
          { name: "Crescent/Sydport/Golf Entrance" },
          { name: "Westmount Rd/Murphy Rd" },
          { name: "Sydney River Mall" },
        ],
        schedule: {
          weekday: [
            { stop: "Sydney River Mall", times: ["7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30", "21:30"] },
            { stop: "Kennys/Coxheath Rd", times: ["7:35", "8:35", "9:35", "10:35", "11:35", "12:35", "13:35", "14:35", "15:35", "16:35", "17:35", "18:35", "19:35", "20:35", "21:35"] },
            { stop: "Crescent/Sydport/Golf Entrance", times: ["7:45", "8:45", "9:45", "10:45", "11:45", "12:45", "13:45", "14:45", "15:45", "16:45", "17:45", "18:45", "19:45", "20:45", "21:45"] },
            { stop: "Westmount Rd/Murphy Rd", times: ["7:58", "8:58", "9:58", "10:58", "11:58", "12:58", "13:58", "14:58", "15:58", "16:58", "17:58", "18:58", "19:58", "20:58", "21:58"] },
            { stop: "Sydney River Mall", times: ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"] },
          ],
          saturday: [
            { stop: "Sydney River Mall", times: ["7:30", "8:30", "9:30", "10:30", "13:30", "14:30", "15:30", "18:30", "19:30", "20:30", "21:30"] },
            { stop: "Kennys/Coxheath Rd", times: ["7:35", "8:35", "9:35", "10:35", "13:35", "14:35", "15:35", "18:35", "19:35", "20:35", "21:35"] },
            { stop: "Crescent/Sydport/Golf Entrance", times: ["7:45", "8:45", "9:45", "10:45", "13:45", "14:45", "15:45", "18:45", "19:45", "20:45", "21:45"] },
            { stop: "Westmount Rd/Murphy Rd", times: ["7:58", "8:58", "9:58", "10:58", "13:58", "14:58", "15:58", "18:58", "19:58", "20:58", "21:58"] },
            { stop: "Sydney River Mall", times: ["8:00", "9:00", "10:00", "11:00", "14:00", "15:00", "16:00", "19:00", "20:00", "21:00", "22:00"] },
          ],
        },
      },
    ],
  },

  // Route 7: Howie Centre
  {
    id: 7,
    name: "Howie Centre",
    nameKey: "route.7.name",
    description: "Loop service through Howie Centre and surrounding area",
    descriptionKey: "route.7.description",
    color: "#D97706",
    mapUrl: "https://gis2.cbrm.ns.ca/portal/apps/webappviewer/index.html?id=24cf18d38a704c19b1f6c2bfbae4f04a&showLayers=Route%2007%20Vehicles;Zone%20Boundaries;Route%2007%20-%20Howie%20Center%20Stops;Route%2007%20-%20Howie%20Center%20&center=-60.246,46.090&level=13",
    directions: [
      {
        id: "7-loop",
        name: "Howie Centre Loop",
        nameKey: "route.7.direction.loop",
        stops: [
          { name: "Sydney River Mall" },
          { name: "Kings Rd/Irving Circle K" },
          { name: "Howie Centre Drive" },
          { name: "Hampton/Prior Estates" },
          { name: "Sydney River Mall" },
        ],
        schedule: {
          weekday: [
            { stop: "Sydney River Mall", times: ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"] },
            { stop: "Kings Rd/Irving Circle K", times: ["7:08", "8:08", "9:08", "10:08", "11:08", "12:08", "13:08", "14:08", "15:08", "16:08", "17:08", "18:08", "19:08", "20:08", "21:08", "22:08"] },
            { stop: "Howie Centre Drive", times: ["7:15", "8:15", "9:15", "10:15", "11:15", "12:15", "13:15", "14:15", "15:15", "16:15", "17:15", "18:15", "19:15", "20:15", "21:15", "22:15"] },
            { stop: "Hampton/Prior Estates", times: ["7:22", "8:22", "9:22", "10:22", "11:22", "12:22", "13:22", "14:22", "15:22", "16:22", "17:22", "18:22", "", "20:22", "21:22", "22:22"] },
            { stop: "Sydney River Mall", times: ["7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30", "21:30", "22:30"] },
          ],
          saturday: [
            { stop: "Sydney River Mall", times: ["7:00", "8:00", "9:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "18:00", "19:00", "20:00", "21:00", "22:00"] },
            { stop: "Kings Rd/Irving Circle K", times: ["7:08", "8:08", "9:08", "10:08", "11:08", "13:08", "14:08", "15:08", "16:08", "18:08", "19:08", "20:08", "21:08", "22:08"] },
            { stop: "Howie Centre Drive", times: ["7:15", "8:15", "9:15", "10:15", "11:15", "13:15", "14:15", "15:15", "16:15", "18:15", "19:15", "20:15", "21:15", "22:15"] },
            { stop: "Hampton/Prior Estates", times: ["7:22", "8:22", "9:22", "10:22", "11:22", "13:22", "14:22", "15:22", "16:22", "18:22", "19:22", "20:22", "21:22", "22:22"] },
            { stop: "Sydney River Mall", times: ["7:30", "8:30", "9:30", "10:30", "11:30", "13:30", "14:30", "15:30", "16:30", "18:30", "19:30", "20:30", "21:30", "22:30"] },
          ],
        },
      },
    ],
  },

  // Route 8: Whitney Pier
  {
    id: 8,
    name: "Whitney Pier",
    nameKey: "route.8.name",
    description: "Loop service through Whitney Pier area of Sydney",
    descriptionKey: "route.8.description",
    color: "#DC2626",
    mapUrl: "https://gis2.cbrm.ns.ca/portal/apps/webappviewer/index.html?id=24cf18d38a704c19b1f6c2bfbae4f04a&showLayers=Route%2008%20Vehicles;Route%2008%20Stops;Route%2008&center=-60.183,46.155&level=13",
    directions: [
      {
        id: "8-loop",
        name: "Whitney Pier Loop",
        nameKey: "route.8.direction.loop",
        stops: [
          { name: "Pitt St./George St." },
          { name: "Ashby Corner" },
          { name: "Pine Tree Park" },
          { name: "Broadway Street" },
          { name: "Henry Street" },
          { name: "Ashby Corner" },
          { name: "High/Townsend" },
          { name: "Pitt St./George St." },
        ],
        schedule: {
          weekday: [
            { stop: "Pitt St./George St.", times: ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"] },
            { stop: "Ashby Corner", times: ["7:10", "8:10", "9:10", "10:10", "11:10", "12:10", "13:10", "14:10", "15:10", "16:10", "17:10", "18:10", "19:10", "20:10", "21:10", "22:10"] },
            { stop: "Pine Tree Park", times: ["7:25", "8:25", "9:25", "10:25", "11:25", "12:25", "13:25", "14:25", "15:25", "16:25", "17:25", "18:25", "19:25", "20:25", "21:25", "22:25"] },
            { stop: "Broadway Street", times: ["7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30", "21:30", "22:30"] },
            { stop: "Henry Street", times: ["7:38", "8:38", "9:38", "10:38", "11:38", "12:38", "13:38", "14:38", "15:38", "16:38", "17:38", "18:38", "19:38", "20:38", "21:38", "22:38"] },
            { stop: "Ashby Corner", times: ["7:45", "8:45", "9:45", "10:45", "11:45", "12:45", "13:45", "14:45", "15:45", "16:45", "17:45", "18:45", "19:45", "20:45", "21:45", "—"] },
            { stop: "High/Townsend", times: ["7:50", "8:50", "9:50", "10:50", "11:50", "12:50", "13:50", "14:50", "15:50", "16:50", "17:50", "18:50", "19:50", "20:50", "21:50", "—"] },
            { stop: "Pitt St./George St.", times: ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "—"] },
          ],
          saturday: [
            { stop: "Pitt St./George St.", times: ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"] },
            { stop: "Ashby Corner", times: ["7:10", "8:10", "9:10", "10:10", "11:10", "12:10", "13:10", "14:10", "15:10", "16:10", "17:10", "18:10", "19:10", "20:10", "21:10", "22:10"] },
            { stop: "Pine Tree Park", times: ["7:25", "8:25", "9:25", "10:25", "11:25", "12:25", "13:25", "14:25", "15:25", "16:25", "17:25", "18:25", "19:25", "20:25", "21:25", "22:25"] },
            { stop: "Broadway Street", times: ["7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30", "21:30", "22:30"] },
            { stop: "Henry Street", times: ["7:38", "8:38", "9:38", "10:38", "11:38", "12:38", "13:38", "14:38", "15:38", "16:38", "17:38", "18:38", "19:38", "20:38", "21:38", "22:38"] },
            { stop: "Ashby Corner", times: ["7:45", "8:45", "9:45", "10:45", "11:45", "12:45", "13:45", "14:45", "15:45", "16:45", "17:45", "18:45", "19:45", "20:45", "21:45", "—"] },
            { stop: "High/Townsend", times: ["7:50", "8:50", "9:50", "10:50", "11:50", "12:50", "13:50", "14:50", "15:50", "16:50", "17:50", "18:50", "19:50", "20:50", "21:50", "—"] },
            { stop: "Pitt St./George St.", times: ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "—"] },
          ],
        },
      },
    ],
  },

  // Route 9: Sydney to New Waterford
  {
    id: 9,
    name: "Sydney to New Waterford",
    nameKey: "route.9.name",
    description: "Service between Sydney Terminal and New Waterford via Scotchtown",
    descriptionKey: "route.9.description",
    color: "#EA580C",
    mapUrl: "https://gis2.cbrm.ns.ca/portal/apps/webappviewer/index.html?id=24cf18d38a704c19b1f6c2bfbae4f04a&showLayers=Route%2009%20Vehicles;Zone%20Boundaries;Route%2009B%20-%20Sydney%20to%20New%20Waterford%20Stops;Route%2009B%20-%20Sydney%20to%20New%20Waterford;Route%2009A%20-%20New%20Waterford%20to%20Sydney%20Stops;Route%2009A%20-%20New%20Waterford%20to%20Sydney&center=-60.183,46.184&level=11",
    directions: [
      {
        id: "9-outbound",
        name: "Sydney to New Waterford",
        nameKey: "route.9.direction.outbound",
        stops: [
          { name: "Pitt St./George St." },
          { name: "Ashby Corner" },
          { name: "Walmart" },
          { name: "Mayflower Mall" },
          { name: "C.B.U." },
          { name: "Plummer Ave" },
          { name: "Daley Road" },
        ],
        schedule: {
          weekday: [
            { stop: "Pitt St./George St.", times: ["8:00", "—", "—", "12:00", "—", "—", "16:00", "18:00", "—", "—", "21:00"] },
            { stop: "Ashby Corner", times: ["8:07", "—", "—", "12:07", "—", "—", "16:07", "18:07", "—", "—", "21:07"] },
            { stop: "Walmart", times: ["8:15", "—", "—", "12:15", "—", "—", "16:15", "18:15", "—", "—", "21:15"] },
            { stop: "Mayflower Mall", times: ["8:20", "—", "—", "12:20", "—", "—", "16:20", "18:20", "—", "—", "21:20"] },
            { stop: "C.B.U.", times: ["8:30", "9:30", "10:30", "12:30", "13:30", "14:30", "16:30", "18:30", "19:30", "20:30", "21:30"] },
            { stop: "Plummer Ave", times: ["8:53", "9:53", "10:53", "12:53", "13:53", "14:53", "16:53", "18:53", "19:53", "20:53", "21:53"] },
            { stop: "Daley Road", times: ["9:00", "9:00", "11:00", "13:00", "14:00", "15:00", "17:00", "19:00", "20:00", "21:00", "22:00"] },
          ],
          saturday: [
            { stop: "Pitt St./George St.", times: ["—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—"] },
            { stop: "Ashby Corner", times: ["—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—"] },
            { stop: "Walmart", times: ["—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—"] },
            { stop: "Mayflower Mall", times: ["—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—"] },
            { stop: "C.B.U.", times: ["7:30", "8:30", "9:30", "10:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30"] },
            { stop: "Plummer Ave", times: ["7:53", "8:53", "9:53", "10:53", "12:53", "13:53", "14:53", "15:53", "16:53", "17:53", "18:53", "19:53", "20:53"] },
            { stop: "Daley Road", times: ["8:00", "9:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"] },
          ],
        },
      },
      {
        id: "9-inbound",
        name: "New Waterford to Sydney",
        nameKey: "route.9.direction.inbound",
        stops: [
          { name: "Daley Road" },
          { name: "Plummer Ave" },
          { name: "C.B.U." },
          { name: "Mayflower Mall" },
          { name: "Walmart" },
          { name: "Ashby Corner" },
          { name: "Pitt St./George St." },
        ],
        schedule: {
          weekday: [
            { stop: "Daley Road", times: ["7:00", "9:00", "10:00", "11:00", "13:00", "14:00", "15:00", "17:00", "19:00", "20:00", "22:00"] },
            { stop: "Plummer Ave", times: ["7:07", "9:07", "10:07", "11:07", "13:07", "14:07", "15:07", "17:07", "19:07", "20:07", "22:07"] },
            { stop: "C.B.U.", times: ["7:30", "9:30", "10:30", "11:30", "13:30", "14:30", "15:30", "17:30", "19:30", "20:30", "22:30"] },
            { stop: "Mayflower Mall", times: ["7:40", "—", "—", "11:40", "—", "—", "15:40", "17:40", "—", "—", "—"] },
            { stop: "Walmart", times: ["7:45", "—", "—", "11:45", "—", "—", "15:45", "17:45", "—", "—", "—"] },
            { stop: "Ashby Corner", times: ["7:53", "—", "—", "11:53", "—", "—", "15:53", "17:53", "—", "—", "—"] },
            { stop: "Pitt St./George St.", times: ["8:00", "—", "—", "12:00", "—", "—", "16:00", "18:00", "—", "—", "—"] },
          ],
          saturday: [
            { stop: "Daley Road", times: ["7:00", "8:00", "9:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "18:00", "19:00", "20:00"] },
            { stop: "Plummer Ave", times: ["7:07", "8:07", "9:07", "10:07", "11:07", "13:07", "14:07", "15:07", "16:07", "18:07", "19:07", "20:07"] },
            { stop: "C.B.U.", times: ["7:30", "8:30", "9:30", "10:30", "11:30", "13:30", "14:30", "15:30", "16:30", "18:30", "19:30", "20:30"] },
            { stop: "Mayflower Mall", times: ["—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—"] },
            { stop: "Walmart", times: ["—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—"] },
            { stop: "Ashby Corner", times: ["—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—"] },
            { stop: "Pitt St./George St.", times: ["—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—"] },
          ],
        },
      },
    ],
  },

  // Route 10: Alexandra Street
  {
    id: 10,
    name: "Alexandra Street",
    nameKey: "route.10.name",
    description: "Loop service through Alexandra Street and surrounding area",
    descriptionKey: "route.10.description",
    color: "#DB2777",
    mapUrl: "https://gis2.cbrm.ns.ca/portal/apps/webappviewer/index.html?id=24cf18d38a704c19b1f6c2bfbae4f04a&showLayers=Route%2010%20Vehicles;Route%2010%20Stops;Route%2010&center=-60.188,46.125&level=13",
    directions: [
      {
        id: "10-loop",
        name: "Alexandra Street Loop",
        nameKey: "route.10.direction.loop",
        stops: [
          { name: "Pitt St./George St." },
          { name: "Alexandra/Churchill Drive" },
          { name: "Rockway/Alexandra" },
          { name: "Kings Road/Churchill Dr." },
          { name: "Pitt St./George St." },
        ],
        schedule: {
          weekday: [
            { stop: "Pitt St./George St.", times: ["7:30", "8:30", "9:30", "10:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "19:30", "20:30", "21:30", "22:30"] },
            { stop: "Alexandra/Churchill Drive", times: ["7:38", "8:38", "9:38", "10:38", "12:38", "13:38", "14:38", "15:38", "16:38", "17:38", "19:38", "20:38", "21:38", "22:38"] },
            { stop: "Rockway/Alexandra", times: ["7:40", "8:40", "9:40", "10:40", "12:40", "13:40", "14:40", "15:40", "16:40", "17:40", "19:40", "20:40", "21:40", "22:40"] },
            { stop: "Kings Road/Churchill Dr.", times: ["7:50", "8:50", "9:50", "10:50", "12:50", "13:50", "14:50", "15:50", "16:50", "17:50", "19:50", "20:50", "21:50", "22:50"] },
            { stop: "Pitt St./George St.", times: ["7:57", "8:57", "9:57", "10:57", "12:57", "13:57", "14:57", "15:57", "16:57", "17:57", "19:57", "20:57", "21:57", "22:57"] },
          ],
          saturday: [
            { stop: "Pitt St./George St.", times: ["", "8:30", "9:30", "10:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "19:30", "20:30", "21:30"] },
            { stop: "Alexandra/Churchill Drive", times: ["7:38", "8:38", "9:38", "10:38", "12:38", "13:38", "14:38", "15:38", "16:38", "17:38", "19:38", "20:38", "21:38"] },
            { stop: "Rockway/Alexandra", times: ["7:40", "8:40", "9:40", "10:40", "12:40", "13:40", "14:40", "15:40", "16:40", "17:40", "19:40", "20:40", "21:40"] },
            { stop: "Kings Road/Churchill Dr.", times: ["7:50", "8:50", "9:50", "10:50", "12:50", "13:50", "14:50", "15:50", "16:50", "17:50", "19:50", "20:50", "21:50"] },
            { stop: "Pitt St./George St.", times: ["7:57", "8:57", "9:57", "10:57", "12:57", "13:57", "14:57", "15:57", "16:57", "17:57", "19:57", "20:57", "21:57"] },
          ],
        },
      },
    ],
  },

  // Route 11: Ashby
  {
    id: 11,
    name: "Ashby",
    nameKey: "route.11.name",
    description: "Loop service through Ashby area of Sydney",
    descriptionKey: "route.11.description",
    color: "#4F46E5",
    mapUrl: "https://gis2.cbrm.ns.ca/portal/apps/webappviewer/index.html?id=24cf18d38a704c19b1f6c2bfbae4f04a&showLayers=Route%2011%20Vehicles;Route%2011%20Stops;Route%2011&center=-60.173,46.139&level=14",
    directions: [
      {
        id: "11-loop",
        name: "Ashby Loop",
        nameKey: "route.11.direction.loop",
        stops: [
          { name: "Pitt St./George St." },
          { name: "Brookland Street" },
          { name: "Ashby Corner" },
          { name: "Welton/Reeves" },
          { name: "Whitney Ave./Terrace St." },
          { name: "Pitt St./George St." },
        ],
        schedule: {
          weekday: [
            { stop: "Pitt St./George St.", times: ["7:30", "8:00", "8:30", "9:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "20:30", "21:00"] },
            { stop: "Brookland Street", times: ["7:35", "8:05", "8:35", "9:05", "12:35", "13:05", "13:35", "14:05", "14:35", "15:05", "15:35", "16:05", "16:35", "17:05", "20:35", "21:05"] },
            { stop: "Ashby Corner", times: ["7:40", "8:10", "8:40", "9:10", "12:40", "13:10", "13:40", "14:10", "14:40", "15:10", "15:40", "16:10", "16:40", "17:10", "20:40", "21:10"] },
            { stop: "Welton/Reeves", times: ["7:42", "8:12", "8:42", "9:12", "12:42", "13:12", "13:42", "14:12", "14:42", "15:12", "15:42", "16:12", "16:42", "17:12", "20:42", "21:12"] },
            { stop: "Whitney Ave./Terrace St.", times: ["7:50", "8:20", "8:50", "9:20", "12:50", "13:20", "13:50", "14:20", "14:50", "15:20", "15:50", "16:20", "16:50", "17:20", "20:50", "21:20"] },
            { stop: "Pitt St./George St.", times: ["8:00", "8:30", "9:00", "9:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "21:00", "21:30"] },
          ],
          saturday: [
            { stop: "Pitt St./George St.", times: ["8:00", "8:30", "9:00", "13:00", "13:30", "14:00", "14:30", "15:00"] },
            { stop: "Brookland Street", times: ["8:05", "8:35", "9:05", "13:05", "13:35", "14:05", "14:35", "15:05"] },
            { stop: "Ashby Corner", times: ["8:10", "8:40", "9:10", "13:10", "13:40", "14:10", "14:40", "15:10"] },
            { stop: "Welton/Reeves", times: ["8:12", "8:42", "9:12", "13:12", "13:42", "14:12", "14:42", "15:12"] },
            { stop: "Whitney Ave./Terrace St.", times: ["8:20", "8:50", "9:20", "13:20", "13:50", "14:20", "14:50", "15:20"] },
            { stop: "Pitt St./George St.", times: ["8:30", "9:00", "9:30", "13:30", "14:00", "14:30", "15:00", "15:30"] },
          ],
        },
      },
    ],
  },

  // Route 12: Sydney - Membertou - Sydney River
  {
    id: 12,
    name: "Sydney - Membertou - Sydney River",
    nameKey: "route.12.name",
    description: "Service between Sydney Terminal, Membertou, and Sydney River",
    descriptionKey: "route.12.description",
    color: "#65A30D",
    mapUrl: "https://gis2.cbrm.ns.ca/portal/apps/webappviewer/index.html?id=24cf18d38a704c19b1f6c2bfbae4f04a&showLayers=Route%2012%20Vehicles;Zone%20Boundaries;Route%2012B%20-%20Sydney%20to%20Sydney%20River%20Stops;Route%2012B%20-%20Sydney%20to%20Sydney%20River%20;Route%2012A%20-%20Sydney%20River%20to%20Sydney%20Stops;Route%2012A%20-%20Sydney%20River%20to%20Sydney%20&center=-60.226,46.122&level=13",
    directions: [
      {
        id: "12-outbound",
        name: "Sydney to Membertou to Sydney River",
        nameKey: "route.12.direction.outbound",
        stops: [
          { name: "Pitt St./George St." },
          { name: "Membertou Trade & Convention" },
          { name: "Seventh Exchange" },
          { name: "Membertou Band Office" },
          { name: "Cabot House" },
          { name: "Sydney River" },
        ],
        schedule: {
          weekday: [
            { stop: "Pitt St./George St.", times: ["7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30", "21:30", "22:15"] },
            { stop: "Membertou Trade & Convention", times: ["7:40", "8:40", "9:40", "10:40", "11:40", "12:40", "13:40", "14:40", "15:40", "16:40", "17:40", "18:40", "19:40", "20:40", "21:40", "—"] },
            { stop: "Seventh Exchange", times: ["7:45", "8:45", "9:45", "10:45", "11:45", "12:45", "13:45", "14:45", "15:45", "16:45", "17:45", "18:45", "19:45", "20:45", "21:45", "—"] },
            { stop: "Membertou Band Office", times: ["7:50", "8:50", "9:50", "10:50", "11:50", "12:50", "13:50", "14:50", "15:50", "16:50", "17:50", "18:50", "19:50", "20:50", "21:50", "—"] },
            { stop: "Cabot House", times: ["7:55", "8:55", "9:55", "10:55", "11:55", "12:55", "13:55", "14:55", "15:55", "16:55", "17:55", "18:55", "19:55", "20:55", "21:55", "22:25"] },
            { stop: "Sydney River", times: ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "22:30"] },
          ],
          saturday: [
            { stop: "Pitt St./George St.", times: ["7:30", "8:30", "9:30", "10:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "20:30", "21:30", "22:15"] },
            { stop: "Membertou Trade & Convention", times: ["7:40", "8:40", "9:40", "10:40", "12:40", "13:40", "14:40", "15:40", "16:40", "17:40", "18:40", "20:40", "21:40", "—"] },
            { stop: "Seventh Exchange", times: ["7:45", "8:45", "9:45", "10:45", "12:45", "13:45", "14:45", "15:45", "16:45", "17:45", "18:45", "20:45", "21:45", "—"] },
            { stop: "Membertou Band Office", times: ["7:50", "8:50", "9:50", "10:50", "12:50", "13:50", "14:50", "15:50", "16:50", "17:50", "18:50", "20:50", "21:50", "—"] },
            { stop: "Cabot House", times: ["7:55", "8:55", "9:55", "10:55", "12:55", "13:55", "14:55", "15:55", "16:55", "17:55", "18:55", "20:55", "21:55", "22:25"] },
            { stop: "Sydney River", times: ["8:00", "9:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "21:00", "22:00", "22:30"] },
          ],
        },
      },
      {
        id: "12-inbound",
        name: "Sydney River to Membertou to Sydney",
        nameKey: "route.12.direction.inbound",
        stops: [
          { name: "Sydney River" },
          { name: "Cabot House" },
          { name: "Membertou Band Office" },
          { name: "Seventh Exchange" },
          { name: "Membertou Trade & Convention" },
          { name: "Pitt St./George St." },
        ],
        schedule: {
          weekday: [
            { stop: "Sydney River", times: ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "22:30"] },
            { stop: "Cabot House", times: ["8:05", "9:05", "10:05", "11:05", "12:05", "13:05", "14:05", "15:05", "16:05", "17:05", "18:05", "19:05", "20:05", "21:05", "22:05", "22:35"] },
            { stop: "Membertou Band Office", times: ["8:07", "9:07", "10:07", "11:07", "12:07", "13:07", "14:07", "15:07", "16:07", "17:07", "18:07", "19:07", "20:07", "21:07", "—", "—"] },
            { stop: "Seventh Exchange", times: ["8:12", "9:12", "10:12", "11:12", "12:12", "13:12", "14:12", "15:12", "16:12", "17:12", "18:12", "19:12", "20:12", "21:12", "—", "—"] },
            { stop: "Membertou Trade & Convention", times: ["8:17", "9:17", "10:17", "11:17", "12:17", "13:17", "14:17", "15:17", "16:17", "17:17", "18:17", "19:17", "20:17", "21:17", "—", "—"] },
            { stop: "Pitt St./George St.", times: ["8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30", "21:30", "22:15", "22:45"] },
          ],
          saturday: [
            { stop: "Sydney River", times: ["8:00", "9:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "21:00", "22:00", "22:30"] },
            { stop: "Cabot House", times: ["8:05", "9:05", "10:05", "11:05", "13:05", "14:05", "15:05", "16:05", "17:05", "18:05", "19:05", "21:05", "22:05", "22:35"] },
            { stop: "Membertou Band Office", times: ["8:07", "9:07", "10:07", "11:07", "13:07", "14:07", "15:07", "16:07", "17:07", "18:07", "19:07", "21:07", "—", "—"] },
            { stop: "Seventh Exchange", times: ["8:12", "9:12", "10:12", "11:12", "13:12", "14:12", "15:12", "16:12", "17:12", "18:12", "19:12", "21:12", "—", "—"] },
            { stop: "Membertou Trade & Convention", times: ["8:17", "9:17", "10:17", "11:17", "13:17", "14:17", "15:17", "16:17", "17:17", "18:17", "19:17", "21:17", "—", "—"] },
            { stop: "Pitt St./George St.", times: ["8:30", "9:30", "10:30", "11:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "21:30", "22:15", "22:45"] },
          ],
        },
      },
    ],
  },

  // Route 13: George Street
  {
    id: 13,
    name: "George Street",
    nameKey: "route.13.name",
    description: "Loop service through George Street area of Sydney",
    descriptionKey: "route.13.description",
    color: "#0EA5E9",
    mapUrl: "https://gis2.cbrm.ns.ca/portal/apps/webappviewer/index.html?id=24cf18d38a704c19b1f6c2bfbae4f04a&showLayers=Route%2013%20Vehicles;Zone%20Boundaries;Route%2013%20Stops;Route%2013&center=-60.173,46.125&level=13",
    directions: [
      {
        id: "13-loop",
        name: "George Street Loop",
        nameKey: "route.13.direction.loop",
        stops: [
          { name: "Pitt St./George St." },
          { name: "George St./Rotary Dr." },
          { name: "Regional Hospital" },
          { name: "Brookland School" },
          { name: "Pitt St./George St." },
        ],
        schedule: {
          weekday: [
            { stop: "Pitt St./George St.", times: ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"] },
            { stop: "George St./Rotary Dr.", times: ["7:08", "8:08", "9:08", "10:08", "11:08", "12:08", "13:08", "14:08", "15:08", "16:08", "17:08", "18:08", "19:08", "20:08", "21:08", "22:08"] },
            { stop: "Regional Hospital", times: ["7:12", "8:12", "9:12", "10:12", "11:12", "12:12", "13:12", "14:12", "15:12", "16:12", "17:12", "18:12", "19:12", "20:12", "21:12", "22:12"] },
            { stop: "Brookland School", times: ["7:20", "8:20", "9:20", "10:20", "11:20", "12:20", "13:20", "14:20", "15:20", "16:20", "17:20", "18:20", "19:20", "20:20", "21:20", "22:20"] },
            { stop: "Pitt St./George St.", times: ["7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30", "21:30", "22:30"] },
          ],
          saturday: [
            { stop: "Pitt St./George St.", times: ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"] },
            { stop: "George St./Rotary Dr.", times: ["7:08", "8:08", "9:08", "10:08", "11:08", "12:08", "13:08", "14:08", "15:08", "16:08", "17:08", "18:08", "19:08", "20:08", "21:08"] },
            { stop: "Regional Hospital", times: ["7:12", "8:12", "9:12", "10:12", "11:12", "12:12", "13:12", "14:12", "15:12", "16:12", "17:12", "18:12", "19:12", "20:12", "21:12"] },
            { stop: "Brookland School", times: ["7:20", "8:20", "9:20", "10:20", "11:20", "12:20", "13:20", "14:20", "15:20", "16:20", "17:20", "18:20", "19:20", "20:20", "21:20"] },
            { stop: "Pitt St./George St.", times: ["7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30", "21:30"] },
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
