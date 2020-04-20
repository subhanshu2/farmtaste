import { Table } from "sequelize-typescript";
import { Address } from "./address.model";

@Table({
  timestamps: true,
  paranoid  : true,
  tableName : "cities"
})

export class City extends Address {
}
