import { TransformerAbstract } from "./transformer.abstract";
import { Dictionary } from "async";
import { Location } from "../models/address/location.model";

export class LocationTransformer extends TransformerAbstract<Location> {

  protected _map(location: Location): Dictionary<any> {
    return {
      id        : location.id,
      title     : location.title,
      slug      : location.slug,
      image_url : location.image_url,
      city_id   : location.city_id,
      is_active : location.is_active,
      created_at: location.createdAt,
      updated_at: location.updatedAt,
      deleted_at: location.deletedAt
    };
  }

}
