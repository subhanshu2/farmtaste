import { BelongsTo, Column, ForeignKey, Sequelize, Table } from "sequelize-typescript";
import { Address } from "./address.model";
import { City } from "./city.model";

@Table({
  timestamps: true,
  paranoid  : false,
  tableName : "locations"
})

export class  Location extends Address {

  @ForeignKey(() => City)
  @Column(Sequelize.BIGINT)
  city_id: number;

  @BelongsTo(() => City)
  city: City;
}
