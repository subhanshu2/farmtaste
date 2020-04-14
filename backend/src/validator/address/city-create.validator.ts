import { BaseValidator } from "../base.validator";

export class CityCreateValidator extends BaseValidator {
  protected getSchemaName(): string {
    return "address/city-create.schema.json";
  }
}
