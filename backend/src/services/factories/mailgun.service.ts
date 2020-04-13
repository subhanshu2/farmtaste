import logger from "../../util/logger.util";
import {
  ENV_FROM_WHO,
  ENV_SMTP_AUTH_PASS,
  ENV_SMTP_AUTH_USER,
  ENV_SMTP_HOST,
  ENV_SMTP_PORT
} from "../../util/secrets.util";
import * as fs from "fs";
import * as path from "path";
import * as handlebars from "handlebars";
import { isArray } from "util";
import nodeMailer from "nodemailer";
import { Attachment } from "nodemailer/lib/mailer";

class MailgunService {

  mailer: nodeMailer.Transporter;
  fromTitle = "Team CSI";
  fromEmail = ENV_FROM_WHO;

  private constructor() {
    logger.silly("[N-IB] MailgunService");
    this.mailer = nodeMailer.createTransport({
      host  : ENV_SMTP_HOST,
      port  : +ENV_SMTP_PORT,
      secure: false,
      auth  : {
        user: ENV_SMTP_AUTH_USER,
        pass: ENV_SMTP_AUTH_PASS
      },
    });
  }

  static getInstance(): MailgunService {
    return new MailgunService();
  }

  async send(sendTo: string | string[], subject: string, templateName: string, data: any, attachmentPaths: any[] = [], cc: string[] = [], bcc: string[] = [], fromTitle?: string, fromEmail?: string) {
    try {
      const templateHtml = fs.readFileSync(path.join(`public/views/${templateName}`), "utf8");
      const template     = handlebars.compile(templateHtml, {noEscape: true});
      const html         = template(data, {
        allowProtoMethodsByDefault   : true,
        allowProtoPropertiesByDefault: true
      });
      console.log(html);

      if (fromTitle && fromEmail) {
        this.fromEmail = fromEmail;
        this.fromTitle = fromTitle;
      }

      const messageOptions: nodeMailer.SendMailOptions = {
        from: `${this.fromTitle} <${this.fromEmail}>`,
        to  : isArray(sendTo) ? sendTo.join(",") : sendTo,
        subject,
        html
      };
      if (bcc.length) {
        messageOptions.bcc = bcc.join(",");
      }

      if (cc.length) {
        messageOptions.cc = cc.join(",");
      }

      if (attachmentPaths.length) {
        messageOptions.attachments = attachmentPaths;
      }

      console.log("message options", messageOptions);
      this.mailer.sendMail(messageOptions, (err: Error) => {
        if (err) {
          throw err;
        }
        return "Email Sent Successfully";
      });
    } catch (e) {
      console.error("mail failed", e);
      logger.error("mail failed", e);
    }
  }

  createAttachment(blob: Buffer, fileName: string): Attachment {
    return {
      content : blob,
      filename: fileName
    };
  }

}

export const mailgunService = MailgunService.getInstance();
