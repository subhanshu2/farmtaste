import { BaseValidator } from "../base.validator";

export class CartUpdateValidator extends BaseValidator {
  protected getSchemaName(): string {
    return "cart/cart-update.schema.json";
  }
}
