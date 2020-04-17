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

@Table({
  timestamps: true,
  paranoid  : true,
  tableName : "product_categories"
})
export class ProductCategory extends Model<ProductCategory> {
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

  @BeforeCreate
  static addSlug(instance: ProductCategory) {
    instance.slug = Helpers.slugify(instance.title);
  }

  // @AfterDelete
  // static deleteImage(instance: Address) {
  //   fs.unlinkSync(instance.image_url);
  // }

}
