import { TransformerAbstract } from "./transformer.abstract";
import { Dictionary } from "async";
import { Product } from "../models/product.model";
import { isUndefined } from "util";
import { Rate } from "../models/rate.model";
import { RateTransformer } from "./rate.transformer";

export class ProductTransformer extends TransformerAbstract<Product> {


  async includeRates(product: Product, location_id: number): Promise<Dictionary<any>> {
    let rate = product.rates;
    if (isUndefined(rate)) {
      rate = await product.$get("rates", {
        where: {
          location_id: location_id
        }
      }) as Rate;
    }
    return await new RateTransformer().transform(rate);
  }

  protected _map(product: Product): Dictionary<any> {

    return {
      id             : product.id,
      title          : product.title,
      slug           : product.slug,
      sub_category_id: product.sub_category_id,
      image_url      : product.image_url,
      is_under_gst   : product.is_under_gst,
      created_at     : product.createdAt,
      updated_at     : product.updatedAt,
      deleted_at     : product.deletedAt
    };
  }

}
