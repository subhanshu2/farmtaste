import logger from "../../util/logger.util";
import { Transaction } from "sequelize";
import { Rate } from "../../models/rate.model";
import { RateCreateDto } from "../../dtos/product/rate-create.dto";
import { RateUpdateDto } from "../../dtos/product/rate-update.dto";
import { Cart } from "../../models/cart.model";
import { CartCreateDto } from "../../dtos/cart/cart-create.dto";
import { CartUpdateDto } from "../../dtos/cart/cart-update.dto";
import { productService } from "./product.service";
import { prependListener } from "cluster";
import { RateNotFoundException } from "../../exceptions/product/rate-not-found.exception";
import { ProductNotFoundException } from "../../exceptions/product/product-not-found.exception";

class CartService {
  constructor() {
    logger.silly("[N-FT] CartService");
  }

  static getInstance(): CartService {
    return new CartService();
  }

  async showCart(cartId: number): Promise<Cart> {
    return Cart.findById(cartId);
  }

  async listCart(user_id: number): Promise<Cart[]> {
    return Cart.findAll({
      where: {
        user_id: user_id
      }
    });
  }

  async addCart(data: CartCreateDto, user_id: number, city_id: number, transaction?: Transaction): Promise<Cart> {
    const product = await productService.showProductById(data.product_id, city_id, true);
    if (!product) {
      throw new ProductNotFoundException();
    }
    const rate = product.is_under_gst ? product.rate[0].rate * (100 + product.gst_rate) / 100 : product.rate[0].rate;
    return Cart.create({
      ...data,
      user_id: user_id,
      rate   : rate
    }, { transaction });
  }

  async updateCart(cart: Cart, data: CartUpdateDto): Promise<Cart> {
    return cart.update(data);
  }

  async deleteCart(carts: Cart[]) {
    for (let i = 0; i < carts.length; i++) {
      const cart = carts[i];
      await cart.destroy();
    }
    return 1;
  }
}

export const cartService = CartService.getInstance();
