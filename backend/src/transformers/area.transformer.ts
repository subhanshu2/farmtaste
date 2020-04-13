import { TransformerAbstract } from "./transformer.abstract";
import { Dictionary } from "async";
import { Area } from "../models/address/area.model";

export class AreaTransformer extends TransformerAbstract<Area> {

  protected _map(area: Area): Dictionary<any> {
    return {
      id         : area.id,
      title      : area.title,
      slug       : area.slug,
      image_url  : area.image_url,
      location_id: area.location_id,
      is_active  : area.is_active,
      created_at : area.createdAt,
      updated_at : area.updatedAt,
      deleted_at : area.deletedAt
    };
  }

}
