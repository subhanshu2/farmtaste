import { ModelNotFoundException } from "../root/model-not-found.exception";
import { ApiErrorCode } from "../root/http.exception";

export class IncorrectOtpException extends ModelNotFoundException {

  constructor() {
    super("Incorrect OTP!", ApiErrorCode.INCORRECT_OTP);
  }
}
