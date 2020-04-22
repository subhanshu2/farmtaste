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
import { User } from "./user.model";

@Table({
  timestamps: true,
  paranoid  : false,
  tableName : "carts"
})
export class Cart extends Model<Cart> {
  @Unique
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @ForeignKey(() => User)
  @Column(DataType.BIGINT)
  user_id: number;

  @ForeignKey(() => Product)
  @Column(DataType.BIGINT)
  product_id: number;

  @Column(DataType.FLOAT)
  rate: number;

  @Column(DataType.INTEGER)
  no_of_units: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Product)
  product: Product;

}
