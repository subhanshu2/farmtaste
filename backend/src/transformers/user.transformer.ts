import { TransformerAbstract } from "./transformer.abstract";
import { Dictionary } from "async";
import { User } from "../models/user.model";
import { isUndefined } from "util";
import { Helpers } from "../util/helpers.util";
//
// export class UserCompactTransformer extends TransformerAbstract<User> {
//   protected _map(user: User): Dictionary<any> {
//     return {
//       id        : Helpers.replaceUndefinedWithNull(user.id),
//       name      : Helpers.replaceUndefinedWithNull(user.name),
//       email     : Helpers.replaceUndefinedWithNull(user.email),
//       mobile_no : Helpers.replaceUndefinedWithNull(user.mobile_no),
//       created_at: Helpers.replaceUndefinedWithNull(user.createdAt),
//       updated_at: Helpers.replaceUndefinedWithNull(user.updatedAt)
//     };
//   }
// }

export class UserTransformer extends TransformerAbstract<User> {

  protected _map(user: User): Dictionary<any> {
    return {
      id          : Helpers.replaceUndefinedWithNull(user.id),
      name        : Helpers.replaceUndefinedWithNull(user.name),
      email       : Helpers.replaceUndefinedWithNull(user.email),
      mobile_no   : Helpers.replaceUndefinedWithNull(user.mobile_no),
      alternate_no: Helpers.replaceUndefinedWithNull(user.alternate_no),
      city_id     : Helpers.replaceUndefinedWithNull(user.city_id),
      location_id : Helpers.replaceUndefinedWithNull(user.location_id),
      area_id     : Helpers.replaceUndefinedWithNull(user.area_id),
      pincode     : Helpers.replaceUndefinedWithNull(user.pincode),
      address     : Helpers.replaceUndefinedWithNull(user.address),
      landmark    : Helpers.replaceUndefinedWithNull(user.landmark),
      created_at  : Helpers.replaceUndefinedWithNull(user.createdAt),
      updated_at  : Helpers.replaceUndefinedWithNull(user.updatedAt)
    };
  }

}
