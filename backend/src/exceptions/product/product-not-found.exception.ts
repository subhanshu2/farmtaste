import { ModelNotFoundException } from "../root/model-not-found.exception";
import { ApiErrorCode } from "../root/http.exception";

export class ProductNotFoundException extends ModelNotFoundException {

  constructor() {
    super("Product Not Found!", ApiErrorCode.PRODUCT_NOT_FOUND);
  }
}
