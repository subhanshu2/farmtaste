import { BaseJob } from "./base.job";
import logger from "../util/logger.util";
import { mailgunService } from "../services/factories/mailgun.service";

export class SendUserWelcomeEmailJob extends BaseJob {
  private name: string;
  private email: string;
  private team_name: string;
  private team_code: string;

  private constructor() {
    super();
  }

  static create(name: string, email: string, team_name: string, team_code: string): SendUserWelcomeEmailJob {
    const welcomeEmailJob     = new SendUserWelcomeEmailJob();
    welcomeEmailJob.name      = name;
    welcomeEmailJob.email     = email;
    welcomeEmailJob.team_name = team_name;
    welcomeEmailJob.team_code = team_code;
    return welcomeEmailJob;
  }

  async handle() {
    logger.debug("[SendUserWelcomeEmailJob] was executed");
    const data = {
      name     : this.name,
      email    : this.email,
      team_code: this.team_code,
      team_name: this.team_name
    };
    await mailgunService.send(this.email, "Welcome to Team CSI", "welcome-template.hbs", data, [], [], [], "", "csichapters@akgec.ac.in");
  }
}
