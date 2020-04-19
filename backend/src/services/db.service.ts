import { Sequelize } from "sequelize-typescript";
import { ENV_MYSQL_DB, ENV_MYSQL_HOSTNAME, ENV_MYSQL_PASSWORD, ENV_MYSQL_USER } from "../util/secrets.util";
import logger from "../util/logger.util";
import { QueryOptions } from "sequelize";
import { User } from "../models/user.model";
import { PreUser } from "../models/pre-user.model";
import { Location } from "../models/address/location.model";
import { City } from "../models/address/city.model";
import { Area } from "../models/address/area.model";
import { Address } from "../models/address/address.model";
import { Employee } from "../models/employee.model";
import { ProductCategory } from "../models/product-category.model";
import { ProductSubCategory } from "../models/product-sub-category.model";
import { Product } from "../models/product.model";

class DBService {
  private _sequelize: Sequelize;

  private constructor() {
    logger.silly("[GD] DBService");
    this._sequelize = new Sequelize({
      dialect : "mysql",
      host    : ENV_MYSQL_HOSTNAME,
      database: ENV_MYSQL_DB,
      username: ENV_MYSQL_USER,
      password: ENV_MYSQL_PASSWORD,
    });

    this._sequelize.addModels([
      User,
      PreUser,
      Location,
      City,
      Area,
      Address,
      Employee,
      ProductCategory,
      ProductSubCategory,
      Product
    ]);
  }

  static getInstance(): DBService {
    return new DBService();
  }

  async rawQuery(sql: string | { query: string, values: any[] }, options?: QueryOptions): Promise<any> {
    return this._sequelize.query(sql, options);
  }

  getSequelize(): Sequelize {
    return this._sequelize;
  }
}

export const dbService = DBService.getInstance();
