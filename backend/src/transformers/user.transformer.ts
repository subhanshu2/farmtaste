import { TransformerAbstract } from "./transformer.abstract";
import { Dictionary } from "async";
import { User } from "../models/user.model";
import { isUndefined } from "util";

export class UserCompactTransformer extends TransformerAbstract<User> {
  protected _map(user: User): Dictionary<any> {
    return {
      id        : user.id,
      name      : user.name,
      email     : user.email,
      mobile_no : user.mobile_no,
      created_at: user.createdAt,
      updated_at: user.updatedAt
    };
  }
}

export class UserTransformer extends TransformerAbstract<User> {

  protected _map(user: User): Dictionary<any> {
    return {
      id          : user.id,
      name        : user.name,
      email       : user.email,
      mobile_no   : user.mobile_no,
      alternate_no: user.alternate_no,
      city_id     : user.city_id,
      location_id : user.location_id,
      area_id     : user.area_id,
      pincode     : user.pincode,
      address     : user.address,
      landmark    : user.landmark,
      created_at  : user.createdAt,
      updated_at  : user.updatedAt
    };
  }

}
