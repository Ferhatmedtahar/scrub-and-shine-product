import nodemailer from "nodemailer";
import path from "path";
import pug from "pug";

export class Email {
  to: string;
  name: string;
  url: string;
  from: string;

  constructor(user: { email: string; name: string }, url: string) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.from = `Ferhat Mohamed <${process.env.EMAIL_FROM}>`; // Sender's email address
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      return nodemailer.createTransport({
        host: process.env.GMAIL_HOST as string,
        port: parseInt(process.env.GMAIL_PORT as string, 10),
        auth: {
          user: process.env.EMAIL_FROM as string,
          pass: process.env.GMAIL_PASSWORD as string,
        },
      });
    }

    // Development transport (e.g., Gmail, local SMTP)
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST as string,
      port: parseInt(process.env.EMAIL_PORT as string, 10),
      auth: {
        user: process.env.EMAIL_USERNAME as string,
        pass: process.env.EMAIL_PASSWORD as string,
      },
    });
  }

  async send(subject: string) {
    // 1) Render HTML from pug template

    const html = pug.renderFile(
      path.join(process.cwd(), "view/emails/emailBase.pug"),
      {
        name: this.name,
        url: this.url,
        subject,
      }
    );

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };

    // 3) Send the email
    await this.newTransport().sendMail(mailOptions);
  }

  // Specific email templates
  async sendMagicLink() {
    await this.send(
      "Your Magic Link (Valid for 15 minutes)" // Customize as needed
    );
  }
}
