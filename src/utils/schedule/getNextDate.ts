export const dayToIndex = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
} as const;

export type DayName = keyof typeof dayToIndex;

export type RepeatType =
  | "perHour"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | { weekly: DayName; time?: string };

export const getNextDate = (
  currentDAte: Date | string,
  repeat: RepeatType
): Date => {
  const date = new Date(currentDAte);

  if (typeof repeat === "string") {
    switch (repeat) {
      case "perHour":
        date.setHours(date.getHours() + 1);
        break;
      case "daily":
        date.setDate(date.getDate() + 1);
        break;
      case "weekly":
        date.setDate(date.getDate() + 7);
        break;
      case "monthly":
        date.setMonth(date.getMonth() + 1);
        break;
      case "yearly":
        date.setFullYear(date.getFullYear() + 1);
        break;
      default:
        throw new Error("Invalid repeat value");
    }
    return date;
  }


  if ('weekly' in repeat) {
    const targetDayIndex = dayToIndex[repeat.weekly.toLocaleLowerCase() as DayName];
    const currentDayIndex = date.getDay();

    let daysToAdd = (targetDayIndex - currentDayIndex + 7) % 7;
    if (daysToAdd === 0) daysToAdd = 7;

    date.setDate(date.getDate() + daysToAdd);

    const [hours, minutes] = repeat.time ? repeat.time.split(':').map(Number) : [0, 0];
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  throw new Error("Invalid repeat configuration");
};
