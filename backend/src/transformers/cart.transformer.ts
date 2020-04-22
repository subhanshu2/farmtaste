import { TransformerAbstract } from "./transformer.abstract";
import { Dictionary } from "async";
import { Cart } from "../models/cart.model";

export class CartTransformer extends TransformerAbstract<Cart> {

  protected _map(cart: Cart): Dictionary<any> {
    return {
      id         : cart.id,
      product_id : cart.product_id,
      user_id    : cart.user_id,
      rate       : cart.rate,
      no_of_units: cart.no_of_units,
      created_at : cart.createdAt,
      updated_at : cart.updatedAt,
      deleted_at : cart.deletedAt
    };
  }

}
