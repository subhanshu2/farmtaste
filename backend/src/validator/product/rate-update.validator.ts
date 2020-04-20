import { BaseValidator } from "../base.validator";

export class RateUpdateValidator extends BaseValidator {
  protected getSchemaName(): string {
    return "product/rate-update.schema.json";
  }
}
