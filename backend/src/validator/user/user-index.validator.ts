import { BaseValidator } from "../base.validator";

export class UserIndexValidator extends BaseValidator {
  protected getSchemaName(): string {
    return "user/user-index.schema.json";
  }
}
