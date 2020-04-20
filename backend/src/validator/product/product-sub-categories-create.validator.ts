import { BaseValidator } from "../base.validator";

export class ProductSubCategoriesCreateValidator extends BaseValidator {
  protected getSchemaName(): string {
    return "product/sub-categories-create.schema.json";
  }
}
