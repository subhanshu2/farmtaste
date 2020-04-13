import { ValidatorService } from "@devslane/validator-service-node";
import logger from "../../util/logger.util";
import { existsKeyword } from "../../validator/keywords/exists.keyword";
import { userIdKeyword } from "../../validator/keywords/user-id.keyword";
import { phoneNumberKeyword } from "../../validator/keywords/phone-number.keyword";

class ValidatorFactory {
  private static _instance: ValidatorService;

  static getInstance(): ValidatorService {
    logger.silly("[N-AEMC] ValidatorFactory getInstance()");
    this._instance = ValidatorService.init({
      baseSchemaPath: "schema"
    });

    // Add Custom Keywords here...
    this._instance.registerKeywords([
      existsKeyword,
      userIdKeyword,
      phoneNumberKeyword,
    ]);
    return this._instance;
  }
}

export const validatorService = ValidatorFactory.getInstance();
