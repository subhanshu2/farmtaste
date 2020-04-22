import { TransformerAbstract } from "./transformer.abstract";
import { Dictionary } from "async";
import { Product } from "../models/product.model";
import { isUndefined } from "util";
import { Rate } from "../models/rate.model";
import { RateTransformer } from "./rate.transformer";
import { Helpers } from "../util/helpers.util";

export class ProductTransformer extends TransformerAbstract<Product> {

  defaultIncludes = ["rate"];

  async includeRate(product: Product): Promise<Dictionary<any>> {
    let rate = product.rate;
    if (!rate) {
      return null;
    }

    if (isUndefined(rate)) {
      rate = await product.$get("rate") as Rate[];
    }

    return new RateTransformer().transformList(rate);

  }

  protected _map(product: Product): Dictionary<any> {

    return {
      id             : product.id,
      title          : product.title,
      slug           : product.slug,
      sub_category_id: product.sub_category_id,
      image_url      : product.image_url,
      is_under_gst   : product.is_under_gst,
      gst_rate       : Helpers.replaceUndefinedWithNull(product.gst_rate),
      created_at     : product.createdAt,
      updated_at     : product.updatedAt,
      deleted_at     : product.deletedAt
    };
  }

}

//
// export class ProductTransformer extends TransformerAbstract<Product> {
//   protected _map(product: Product): Dictionary<any> {
//
//     return {
//       id             : product.id,
//       title          : product.title,
//       slug           : product.slug,
//       sub_category_id: product.sub_category_id,
//       image_url      : product.image_url,
//       is_under_gst   : product.is_under_gst,
//       created_at     : product.createdAt,
//       updated_at     : product.updatedAt,
//       deleted_at     : product.deletedAt
//     };
//   }
// }
