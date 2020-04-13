import { BaseValidator } from "../base.validator";

export class ForgotPasswordValidator extends BaseValidator {
  protected getSchemaName(): string {
    return "user/forgot-password.schema.json";
  }
}
