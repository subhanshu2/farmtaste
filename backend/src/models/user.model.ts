import {
  AutoIncrement, BelongsTo, BelongsToMany,
  Column,
  DataType, Default, ForeignKey, HasMany, HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique
} from "sequelize-typescript";
import { City } from "./address/city.model";
import { Location } from "./address/location.model";
import { Area } from "./address/area.model";

@Table({
  timestamps: true,
  paranoid  : false,
  tableName : "users"
})
export class User extends Model<User> {
  @Unique
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @Column(DataType.STRING)
  name?: string;

  @Unique
  @Column(DataType.STRING)
  email?: string;

  @Unique
  @Column(DataType.STRING)
  mobile_no: string;

  @Unique
  @Column(DataType.STRING)
  alternate_no?: string;

  @Column(DataType.STRING)
  address?: string;

  @Column(DataType.STRING)
  landmark?: string;

  @Column(DataType.STRING)
  state?: string;

  @ForeignKey(() => City)
  @Column(DataType.BIGINT)
  city_id?: number;

  @ForeignKey(() => Location)
  @Column(DataType.BIGINT)
  location_id?: number;

  @ForeignKey(() => Area)
  @Column(DataType.BIGINT)
  area_id?: number;

  @Column(DataType.INTEGER)
  pincode?: number;

  @Default(true)
  @Column(DataType.BOOLEAN)
  is_active: boolean;

  @BelongsTo(() => City)
  city: City;

  @BelongsTo(() => Location)
  location: Location;

  @BelongsTo(() => Area)
  area: Area;
}
