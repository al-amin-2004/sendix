import {
  getDelay,
  RepeatType,
  getNextDate,
  getNextWeeklyDate,
} from "../utils/schedule/index.js";

type RepeatDetails = RepeatType | { weekly: string; time?: string };

type ScheduleType = "now" | "once" | { repeat: RepeatDetails };

interface ScheduleOptions {
  type: ScheduleType;
  date?:
    | string
    | Date
    | [number, number, number?, number?, number?, number?, number?];
  job: () => void;
}

export const schedule = ({
  type = "now",
  date,
  job,
}: ScheduleOptions): void => {
  let scheduleDate: Date | undefined;

  if (Array.isArray(date)) {
    scheduleDate = new Date(...date);
  } else if (typeof date === "string" || date instanceof Date) {
    scheduleDate = new Date(date);
  }
  const delay = getDelay(scheduleDate);

  const isNowType = type === "now";
  const isOnceType = type === "once";
  const isRepeatType = typeof type === "object" && "repeat" in type;

  // for now type, execute immediately, don't need to schedule/delay
  if (isNowType) {
    job();
  }

  // for once type, schedule the job to run at the specified date
  else if (isOnceType) {
    if (!scheduleDate)
      throw new Error("Date is required for 'once' type scheduling");

    if (delay <= 0) throw new Error("Given time has already passed.");

    setTimeout(() => {
      job();
    }, delay);
  }

  // for repeat type.
  else if (isRepeatType) {
    const repeat = type.repeat;

    if (typeof repeat === "string") {
      if (!scheduleDate)
        throw new Error("Date is required for 'repeat' type scheduling");

      const repeatRunner = (nextDate: Date): void => {
        job();
        const upComingDate = getNextDate(nextDate, repeat);
        const nextDelay = getDelay(upComingDate);
        setTimeout(() => repeatRunner(upComingDate), nextDelay);
      };

      setTimeout(() => repeatRunner(scheduleDate!), delay);
      return;
    }
    if (typeof repeat === "object" && repeat.weekly) {
      let nextDate = getNextWeeklyDate(repeat.weekly, new Date(), repeat.time);

      if (scheduleDate && nextDate < scheduleDate) {
        nextDate = getNextWeeklyDate(repeat.weekly, scheduleDate, repeat.time);
      }

      const repeatRunner = (currentDate: Date): void => {
        job();
        const upcomingDate = getNextWeeklyDate(
          repeat.weekly!,
          currentDate,
          repeat.time
        );
        const nextDelay = getDelay(upcomingDate);
        setTimeout(() => repeatRunner(upcomingDate), nextDelay);
      };

      const delay = getDelay(nextDate);
      setTimeout(() => repeatRunner(nextDate), delay);
      return;
    }

    throw new Error("'date' and 'repeat' are required for type 'repeat'");
  } else {
    throw new Error(
      "Invalid schedule type provided. Must be 'now', 'once', or a repeat type."
    );
  }
};
