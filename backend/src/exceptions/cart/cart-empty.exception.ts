import { ModelNotFoundException } from "../root/model-not-found.exception";
import { ApiErrorCode } from "../root/http.exception";

export class CartEmptyException extends ModelNotFoundException {

  constructor() {
    super("Your Cart is Empty!", ApiErrorCode.CART_EMPTY);
  }
}
