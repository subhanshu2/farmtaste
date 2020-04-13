import { UnauthorizedException } from "./root/unauthorized.exception";
import { ApiErrorCode } from "./root/http.exception";

export class InvalidJwtTokenException extends UnauthorizedException {

  constructor() {
    super("Invalid Token", ApiErrorCode.JWT_INVALID);
  }
}