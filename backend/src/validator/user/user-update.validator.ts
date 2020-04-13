import { BaseValidator } from "../base.validator";

export class UserUpdateValidator extends BaseValidator {
    protected getSchemaName(): string {
        return "user/user-update.schema.json";
    }
}
