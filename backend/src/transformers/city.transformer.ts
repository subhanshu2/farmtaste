import { TransformerAbstract } from "./transformer.abstract";
import { Dictionary } from "async";
import { City } from "../models/address/city.model";

export class CityTransformer extends TransformerAbstract<City> {

  protected _map(city: City): Dictionary<any> {
    return {
      id        : city.id,
      title     : city.title,
      slug      : city.slug,
      image_url : city.image_url,
      is_active : city.is_active,
      created_at: city.createdAt,
      updated_at: city.updatedAt,
      deleted_at: city.deletedAt
    };
  }

}
