import { ModelNotFoundException } from "../root/model-not-found.exception";
import { ApiErrorCode } from "../root/http.exception";

export class ProductCategoryNotFoundException extends ModelNotFoundException {

  constructor() {
    super("Product Category Not Found!", ApiErrorCode.PRODUCT_CATEGORY_NOT_FOUND);
  }
}
