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
import { Helpers } from "../../util/helpers.util";
import * as fs from "fs";

@Table({
  timestamps: true,
  paranoid  : false,
  tableName : "addresses"
})
export class Address extends Model<Address> {
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
  image_url: string;

  @Unique
  @Column(DataType.STRING)
  slug: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  is_active: boolean;

  @BeforeCreate
  static addSlug(instance: Address) {
    instance.slug = Helpers.slugify(instance.title);
  }

  // @AfterDelete
  // static deleteImage(instance: Address) {
  //   fs.unlinkSync(instance.image_url);
  // }

}
