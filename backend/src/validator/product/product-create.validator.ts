import { BaseValidator } from "../base.validator";

export class ProductCreateValidator extends BaseValidator {
  protected getSchemaName(): string {
    return "product/product-create.schema.json";
  }
}
