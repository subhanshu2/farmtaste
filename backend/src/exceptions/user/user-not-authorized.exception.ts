import { ModelNotFoundException } from "../root/model-not-found.exception";
import { ApiErrorCode } from "../root/http.exception";

export class UserNotAuthorizedException extends ModelNotFoundException {

  constructor() {
    super("User Not Authorized!", ApiErrorCode.USER_NOT_AUTHORIZED);
  }
}
