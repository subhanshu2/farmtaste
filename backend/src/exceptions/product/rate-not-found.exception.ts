import { ModelNotFoundException } from "../root/model-not-found.exception";
import { ApiErrorCode } from "../root/http.exception";

export class RateNotFoundException extends ModelNotFoundException {

  constructor() {
    super("rate Not Found!", ApiErrorCode.RATE_NOT_FOUND);
  }
}
