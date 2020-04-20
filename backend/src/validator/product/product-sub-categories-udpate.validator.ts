import { BaseValidator } from "../base.validator";

export class ProductSubCategoriesUpdateValidator extends BaseValidator {
  protected getSchemaName(): string {
  return "product/sub-categories-update.schema.json";
  }
}
