import {
  AutoIncrement, BelongsTo, BelongsToMany,
  Column,
  DataType, ForeignKey, HasMany, HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique
} from "sequelize-typescript";

@Table({
  timestamps: true,
  paranoid  : false,
  tableName : "pre-users"
})
export class PreUser extends Model<PreUser> {
  @Unique
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @Unique
  @Column(DataType.STRING)
  mobile_no: string;

  @Column(DataType.STRING)
  otp: string;
}
