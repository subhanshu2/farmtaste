import { UnauthorizedException } from "./root/unauthorized.exception";
import { ApiErrorCode } from "./root/http.exception";

export class InvalidJwtPayloadException extends UnauthorizedException {

  constructor() {
    super("Invalid JWT Payload", ApiErrorCode.JWT_INCORRECT_PAYLOAD_TYPE);
  }
}