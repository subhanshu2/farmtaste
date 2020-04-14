import { BaseValidator } from "../base.validator";

export class AreaCreateValidator extends BaseValidator {
  protected getSchemaName(): string {
    return "address/area-create.schema.json";
  }
}
