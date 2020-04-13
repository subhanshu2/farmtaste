import { ModelNotFoundException } from "../root/model-not-found.exception";
import { ApiErrorCode } from "../root/http.exception";

export class UserAlreadyExistsException extends ModelNotFoundException {

  constructor() {
    super("User Already Exists, kindly login !", ApiErrorCode.USER_ALREADY_EXISTS);
  }
}
