import nodemailer from "nodemailer";

interface Auth {
  user: string;
  pass: string;
}

interface SendMailOptions {
  auth: Auth;
  from: string;
  to: string;
  subject: string;
  message?: string;
  html?: string;
}

const createTransport = ({ user, pass }: Auth) => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });
};

export const sendmail = async ({
  auth,
  from,
  to,
  subject,
  message,
  html,
}: SendMailOptions): Promise<void> => {
  const transporter = createTransport(auth);

  await transporter.sendMail({
    from: auth.user,
    to,
    subject,
    text: message,
    html,
  });
};
