import { BelongsTo, Column, ForeignKey, Sequelize, Table } from "sequelize-typescript";
import { Address } from "./address.model";
import { City } from "./city.model";
import { Location } from "./location.model";

@Table({
  timestamps: true,
  paranoid  : false,
  tableName : "areas"
})

export class Area extends Address {

  @ForeignKey(() => Location)
  @Column(Sequelize.BIGINT)
  location_id: number;

  @BelongsTo(() => Location)
  location: Location;
}
