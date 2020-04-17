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

@Table({
  timestamps: true,
  paranoid  : true,
  tableName : "products"
})
export class Product extends Model<Product> {
  @Unique
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @Unique
  @Column(DataType.STRING)
  title: string;

  @Unique
  @Column(DataType.STRING)
  slug: string;

  @Column(DataType.STRING)
  image_url: string;

  @ForeignKey(() => ProductSubCategory)
  @Column(DataType.BIGINT)
  sub_category_id: number;

  @BelongsTo(() => ProductSubCategory)
  sub_category: ProductSubCategory;

  @BeforeCreate
  static addSlug(instance: Product) {
    instance.slug = Helpers.slugify(instance.title);
  }

  // @AfterDelete
  // static deleteImage(instance: Address) {
  //   fs.unlinkSync(instance.image_url);
  // }

}