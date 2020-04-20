import { TransformerAbstract } from "./transformer.abstract";
import { Dictionary } from "async";
import { Rate } from "../models/rate.model";

export class RateTransformer extends TransformerAbstract<Rate> {

  protected _map(rate: Rate): Dictionary<any> {
    return {
      id        : rate.id,
      product_id: rate.product_id,
      city_id   : rate.city_id,
      rate      : rate.rate,
      created_at: rate.createdAt,
      updated_at: rate.updatedAt,
      deleted_at: rate.deletedAt
    };
  }

}
