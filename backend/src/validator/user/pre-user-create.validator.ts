import { BaseValidator } from "../base.validator";

export class PreUserCreateValidator extends BaseValidator {
    protected getSchemaName(): string {
        return "user/pre-user-create.schema.json";
    }
}