import { CustomKeyword, ValidationError } from "@devslane/validator-service-node";
import { parsePhoneNumber } from "libphonenumber-js";

export const phoneNumberKeyword: CustomKeyword = {
  keyword   : "phone_number",
  definition: {
    type    : "string",
    async   : true,
    validate: async (schema: any, data: any, parentSchema: any, dataPath: any, parentData: any, parentDataProperty: any) => {
      let isValid = false;
      try {
        isValid = parsePhoneNumber(data, "IN").isValid();
      } catch (e) {
        console.log(e);
      }

      if (!isValid) {
        throw new ValidationError([
          {
            keyword   : "phone_number",
            dataPath  : dataPath,
            schemaPath: "#/properties/" + parentDataProperty + "/phone_number",
            params    : {
              keyword: "phone_number"
            },
            message   : "Invalid Phone Number"
          }
        ]);
      }
      return true;
    },
    errors  : true
  }
};
