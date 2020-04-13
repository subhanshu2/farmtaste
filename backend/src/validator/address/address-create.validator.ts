import { BaseValidator } from "../base.validator";

export class AddressCreateValidator extends BaseValidator {
  protected getSchemaName(): string {
    return "address/address-create.schema.json";
  }
}
