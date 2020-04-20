import {
  AfterDelete,
  AutoIncrement, BeforeCreate, BelongsTo, BelongsToMany,
  Column,
  DataType, Default, ForeignKey, HasMany, HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique
} from "sequelize-typescript";
import { Helpers } from "../util/helpers.util";
import { ProductCategory } from "./product-category.model";
import { ProductSubCategory } from "./product-sub-category.model";
import { City } from "./address/city.model";
import { Product } from "./product.model";

@Table({
  timestamps: true,
  paranoid  : true,
  tableName : "rates"
})
export class Rate extends Model<Rate> {
  @Unique
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @Column(DataType.FLOAT)
  rate: number;

  @ForeignKey(() => City)
  @Column(DataType.BIGINT)
  city_id: number;

  @ForeignKey(() => Product)
  @Column(DataType.BIGINT)
  product_id: number;

  @BelongsTo(() => City)
  city: City;

  @BelongsTo(() => Product)
  product: Product;

}
