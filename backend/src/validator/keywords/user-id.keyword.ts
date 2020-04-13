import { CustomKeyword, ValidationError } from "@devslane/validator-service-node";
import { userService } from "../../services/entities/user.service";

export const userIdKeyword: CustomKeyword = {
    keyword: "user_id",
    definition: {
        type: "number",
        async: true,
        validate: async (schema: any, data: any, parentSchema: any, dataPath: any, parentData: any, parentDataProperty: any) => {
            const user = await userService.show(data);

            if (!user) {
                throw new ValidationError([
                    {
                        keyword: "user_id",
                        dataPath: dataPath,
                        schemaPath: "#/properties/" + parentDataProperty + "/user_id",
                        params: {
                            keyword: "user_id"
                        },
                        message: "Invalid User Id"
                    }
                ]);
            }

            return true;
        },
        errors: true
    }
};
