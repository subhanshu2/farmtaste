import { BaseValidator } from "../base.validator";

export class UserUpdateSensitiveInformationValidator extends BaseValidator {
    protected getSchemaName(): string {
        return "user/user-update-sensitive-information.schema.json";
    }
}
