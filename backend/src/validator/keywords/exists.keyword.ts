import { CustomKeyword, ValidationError } from "@devslane/validator-service-node";
import { isArray } from "util";
import { dbService } from "../../services/db.service";
import { Model, Sequelize } from "sequelize-typescript";

export const existsKeyword: CustomKeyword = {
  keyword   : "exists",
  definition: {
    type    : ["array", "string", "number"],
    async   : true,
    validate: async (schema: any, data: any, parentSchema: any, dataPath: any, parentData: any, parentDataProperty: any) => {
      const _tableName     = schema.table;
      const _columnName    = schema.column;
      let values: number[] = [];
      if (!_tableName) {
        console.error("[ValidatorService] INCORRECT_TABLE_NAME");
      }

      if (!_columnName) {
        console.error("[ValidatorService] INCORRECT_COLUMN_NAME");
      }

      if (!isArray(data)) {
        values = [+data];
      } else {
        values = data;
      }

      if (values.length === 0) {
        return true;
      }

      const rows: any[] = await dbService.rawQuery(`SELECT *
      FROM ${_tableName} WHERE ${_columnName} IN (${values})`,
        {type: Sequelize.QueryTypes.SELECT, raw: true, mapToModel: true});

      const count = rows.length;
      if (count !== values.length) {
        throw new ValidationError([
          {
            keyword   : "exists",
            dataPath  : dataPath,
            schemaPath: "#/properties/" + parentDataProperty + "/exists",
            params    : {
              keyword: "exists"
            },
            message   : `Invalid ${_columnName}s`
          }
        ]);
      }
      return true;
    },
    errors  : true
  }
};
