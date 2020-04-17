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

@Table({
  timestamps: true,
  paranoid  : true,
  tableName : "product_sub_categories"
})
export class ProductSubCategory extends Model<ProductSubCategory> {
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

  @ForeignKey(() => ProductCategory)
  @Column(DataType.BIGINT)
  category_id: number;

  @BelongsTo(() => ProductCategory)
  category: ProductCategory;

  @BeforeCreate
  static addSlug(instance: ProductSubCategory) {
    instance.slug = Helpers.slugify(instance.title);
  }

  // @AfterDelete
  // static deleteImage(instance: Address) {
  //   fs.unlinkSync(instance.image_url);
  // }

}
