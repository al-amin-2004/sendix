import { schedule as runSchedule } from "./shared/schedule.js";
import { sendmail } from "./shared/sendmail.js";
import type { RepeatType } from "./utils/schedule/getNextDate.js";

interface MailOptions {
  auth: {
    user: string;
    pass: string;
  };
  from: string;
  to: string;
  subject: string;
  message: string;
  html?: string;
}

type DateTuple = [number, number, number?, number?, number?, number?, number?];

type SendixOptions =
  | { type: "now"; schedule?: never; mail: MailOptions }
  | { type: "once"; schedule: Date | DateTuple; mail: MailOptions }
  | {
      type: { repeat: RepeatType };
      schedule?: Date | DateTuple;
      mail: MailOptions;
    };

export const sendix = (options: SendixOptions) => {
  let scheduleDate: Date | undefined;

  if (options.type === "now") {
    scheduleDate = new Date();
  } else if (Array.isArray(options.schedule)) {
    scheduleDate = new Date(...options.schedule);
  } else if (options.schedule) {
    scheduleDate = new Date(options.schedule);
  }

  runSchedule({
    type: options.type,
    date: scheduleDate,
    job: () => {
      sendmail(options.mail);
    },
  });
};
