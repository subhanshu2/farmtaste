import { ModelNotFoundException } from "../root/model-not-found.exception";
import { ApiErrorCode } from "../root/http.exception";

export class CartItemNotFoundException extends ModelNotFoundException {

  constructor() {
    super("Cart Item Not Found!", ApiErrorCode.CAR_ITEM_NOT_FOUND);
  }
}
