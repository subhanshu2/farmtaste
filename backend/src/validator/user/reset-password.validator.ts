import { BaseValidator } from "../base.validator";

export class ResetPasswordValidator extends BaseValidator {
  protected getSchemaName(): string {
    return "user/reset-password.schema.json";
  }
}
