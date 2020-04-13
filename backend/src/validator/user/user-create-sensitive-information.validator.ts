import { BaseValidator } from "../base.validator";

export class UserCreateSensitiveInformationValidator extends BaseValidator {
    protected getSchemaName(): string {
        return "user/user-create-sensitive-information.schema.json";
    }
}