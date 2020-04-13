import { BaseValidator } from "../base.validator";

export class MeUpdateValidator extends BaseValidator {
    protected getSchemaName(): string {
        return "user/me-update.schema.json";
    }
}
