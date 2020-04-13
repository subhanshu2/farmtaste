import { BaseValidator } from "../base.validator";

export class UserBulkUpdateValidator extends BaseValidator {
  protected getSchemaName(): string {
    return "user/user-bulk-update.schema.json";
  }
}