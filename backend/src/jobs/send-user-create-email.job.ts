import { BaseJob } from "./base.job";
import logger from "../util/logger.util";
import { mailgunService } from "../services/factories/mailgun.service";
import { ENV_BASE_URL, ENV_DASHBOARD_URL } from "../util/secrets.util";

export class SendUserCreateEmailJob extends BaseJob {
  private email: string;
  private token: string;

  private constructor() {
    super();
  }

  static create(email: string, token: string): SendUserCreateEmailJob {
    const welcomeEmailJob = new SendUserCreateEmailJob();
    welcomeEmailJob.token = token;
    welcomeEmailJob.email = email;
    console.log("token", token);
    console.log("token", email);
    return welcomeEmailJob;
  }

  async handle() {
    logger.debug("[SendUserCreateEmailJob] was executed");
    const data = {
      reset_link: `${ENV_DASHBOARD_URL}/signup?token=${this.token}`
    };
    await mailgunService.send(this.email, "Registration Successful", "create-template.hbs", data, [], [], [], "", "csichapters@akgec.ac.in");
  }
}
