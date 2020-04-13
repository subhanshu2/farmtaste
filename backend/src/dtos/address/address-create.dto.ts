import { AddressType } from "../../enums/address-type.enum";

export interface AddressCreateDto {
  type: AddressType;
  title: string;
  city_id?: number;
  location_id?: string;
}
