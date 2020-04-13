import { Table } from "sequelize-typescript";
import { Address } from "./address.model";

@Table({
  timestamps: true,
  paranoid  : false,
  tableName : "cities"
})

export class City extends Address {
}
