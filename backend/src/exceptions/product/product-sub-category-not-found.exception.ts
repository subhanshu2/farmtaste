import { ModelNotFoundException } from "../root/model-not-found.exception";
import { ApiErrorCode } from "../root/http.exception";

export class ProductSubCategoryNotFoundException extends ModelNotFoundException {

  constructor() {
    super("Product Sub Category Not Found!", ApiErrorCode.PRODUCT_SUB_CATEGORY_NOT_FOUND);
  }
}
