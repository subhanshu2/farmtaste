import { ModelNotFoundException } from "../root/model-not-found.exception";
import { ApiErrorCode } from "../root/http.exception";

export class AddressNotFoundException extends ModelNotFoundException {

  constructor() {
    super("Address Not Found!", ApiErrorCode.ADDRESS_NOT_FOUND);
  }
}
