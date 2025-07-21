export const getNextWeeklyDate = (dayName: string, fromDate: Date, timeStr?: string) => {
  
    const daysMap: Record<string, number> = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  const targetDay = daysMap[dayName.toLowerCase()];
  
  if (targetDay === undefined) throw new Error(`Invalid day name: ${dayName}`);

  const date = new Date(fromDate);
  
  date.setHours(0, 0, 0, 0); // Reset time

  const currentDay = date.getDay();
  let diff = targetDay - currentDay;
  
  if (diff < 0) diff += 7;

  if (diff === 0) {
  if (timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const now = new Date(fromDate);
    if (
      now.getHours() > hours ||
      (now.getHours() === hours && now.getMinutes() >= minutes)
    ) {
      diff = 7;
    }
  } else {
    const now = new Date(fromDate);
    if (now.getHours() > 0 || now.getMinutes() > 0 || now.getSeconds() > 0 || now.getMilliseconds() > 0) {
      diff = 7;
    }
  }
}

  date.setDate(date.getDate() + diff);

  if (timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    date.setHours(hours, minutes, 0, 0);
  } else {
    date.setHours(0, 0, 0, 0); // Default to midnight if no time is provided
  }

  return date;
}