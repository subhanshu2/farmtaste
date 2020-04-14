import { BaseValidator } from "../base.validator";

export class LocationCreateValidator extends BaseValidator {
  protected getSchemaName(): string {
    return "address/location-create.schema.json";
  }
}
