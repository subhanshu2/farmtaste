import { BaseValidator } from "../base.validator";

export class RateCreateValidator extends BaseValidator {
  protected getSchemaName(): string {
    return "product/rate-create.schema.json";
  }
}
