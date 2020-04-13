import {
  AutoIncrement, BelongsTo, BelongsToMany,
  Column,
  DataType, Default, ForeignKey, HasMany, HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique
} from "sequelize-typescript";

@Table({
  timestamps: true,
  paranoid: false,
  tableName: "employees"
})
export class Employee extends Model<Employee> {
  @Unique
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @Column(DataType.STRING)
  name: string;

  @Unique
  @Column(DataType.STRING)
  email: string;

  @Unique
  @Column(DataType.STRING)
  mobile_no: string;

  @Unique
  @Column(DataType.STRING)
  aadhar_no: string;

  @Unique
  @Column(DataType.STRING)
  driver_license: string;

  @Column(DataType.STRING)
  category: string;

  @Column(DataType.STRING)
  state: string;

  @Column(DataType.STRING)
  city: string;

  @Column(DataType.STRING)
  area: string;

  @Column(DataType.STRING)
  location: string;

  @Column(DataType.INTEGER)
  pincode: number;

  @Default(true)
  @Column(DataType.BOOLEAN)
  is_active: boolean;

}
