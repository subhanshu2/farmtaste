import { BaseValidator } from "../base.validator";

export class CartCreateValidator extends BaseValidator {
  protected getSchemaName(): string {
    return "cart/cart-create.schema.json";
  }
}
