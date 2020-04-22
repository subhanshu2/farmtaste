import { NextFunction, Request, Response } from "express";
import { UnprocessableEntityException } from "../exceptions/root/unprocessable-entity.exception";
import { CartCreateDto } from "../dtos/cart/cart-create.dto";
import { CartCreateValidator } from "../validator/cart/cart-create.validator";
import { cartService } from "../services/entities/cart.service";
import { CartTransformer } from "../transformers/cart.transformer";
import { CartUpdateDto } from "../dtos/cart/cart-update.dto";
import { CartEmptyException } from "../exceptions/cart/cart-empty.exception";
import { CartItemNotFoundException } from "../exceptions/cart/cart-item-not-found.exception";
import { UserNotAuthorizedException } from "../exceptions/user/user-not-authorized.exception";

export class CartController {

  static async addToCart(req: Request, res: Response) {
    const inputData = req.body as CartCreateDto;
    try {
      await (new CartCreateValidator().validate(inputData));
    } catch (e) {
      throw new UnprocessableEntityException(e);
    }
    const cart = await cartService.addCart(inputData, req.user.id, req.user.city_id);
    return res.json({
      data: await new CartTransformer().transform(cart)
    });
  }

  static async listCart(req: Request, res: Response) {
    const cart = await cartService.listCart(req.user.id);
    if (!cart) {
      throw new CartEmptyException();
    }
    return res.json({
      data: await new CartTransformer().transformList(cart)
    });
  }

  static async updateCart(req: Request, res: Response) {
    const cartId    = +req.params.cartId;
    const inputData = req.body as CartUpdateDto;
    const cart      = await cartService.showCart(cartId);
    if (!cart) {
      throw new CartItemNotFoundException();
    }
    if (cart.user_id != req.user.id) {
      throw new UserNotAuthorizedException();
    }
    const updatedCart = await cartService.updateCart(cart, inputData);
    return res.json({
      data: await new CartTransformer().transform(updatedCart)
    });
  }

  static async deleteCartItem(req: Request, res: Response) {
    const cartId = +req.params.cartId;
    const item   = await cartService.showCart(cartId);
    if (!item) {
      throw new CartItemNotFoundException();
    }
    if (item.user_id != req.user.id) {
      throw new UserNotAuthorizedException();
    }
    await item.destroy();
    return res.json("Success");
  }

  static async emptyCart(req: Request, res: Response) {
    const cart = await cartService.listCart(req.user.id);
    if (!cart) {
      throw new CartEmptyException();
    }
    await cartService.deleteCart(cart);
    return res.json("Success");
  }

}
