import { BaseValidator } from "../base.validator";

export class ProductUpdateValidator extends BaseValidator {
  protected getSchemaName(): string {
    return "product/product-update.schema.json";
  }
}
