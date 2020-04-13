import { BaseValidator } from "../base.validator";

export class ChangePasswordValidator extends BaseValidator {
  protected getSchemaName(): string {
    return "user/change-password.schema.json";
  }
}
