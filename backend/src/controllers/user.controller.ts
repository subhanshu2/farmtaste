import { NextFunction, Request, Response } from "express";
import { userService } from "../services/entities/user.service";
import { UserTransformer } from "../transformers/user.transformer";
import { UserCreateDto } from "../dtos/user/user-create.dto";
import jwt from "jsonwebtoken";
import { compareSync } from "bcrypt";
import { UserUpdateDto } from "../dtos/user/user-update.dto";
import { UnauthorizedException } from "../exceptions/root/unauthorized.exception";
import { UserNotFoundException } from "../exceptions/user/user-not-found.exception";
import { User } from "../models/user.model";
import { UnprocessableEntityException } from "../exceptions/root/unprocessable-entity.exception";
import { UserLoginValidator } from "../validator/user/user-login.validator";
import { UserCreateValidator } from "../validator/user/user-create.validator";
import { UserUpdateValidator } from "../validator/user/user-update.validator";
import { PreUserCreateValidator } from "../validator/user/pre-user-create.validator";
import { PreUser } from "../models/pre-user.model";
import { IncorrectOtpException } from "../exceptions/user/incorrect-otp.exception";
import { UserAlreadyExistsException } from "../exceptions/user/user-already-exists.exception";

export class UserController {

  static async show(req: Request, res: Response) {
    const userId = +req.params.userId;
    const user   = await userService.show(userId);

    if (!user) {
      throw new UserNotFoundException();
    }

    return res.json({
      data: await new UserTransformer().transform(user)
    });
  }

  static async authenticate(req: Request, res: Response, next: NextFunction) {
    const inputData = req.body as { mobile_no: string, otp: string };
    try {
      await (new UserLoginValidator().validate(inputData));
    } catch (e) {
      throw new UnprocessableEntityException(e);
    }
    const preUser = await PreUser.findOne({
      where: {
        mobile_no: inputData.mobile_no
      }
    });

    if (!preUser) {
      throw new UnauthorizedException("You are Not Authorized", 401);
    }

    if (preUser.otp != inputData.otp) {
      throw new IncorrectOtpException();
    }
    const user = await userService.showUserByMobile(inputData.mobile_no);
    await preUser.destroy();

    return res.json({
      token: jwt.sign({ user }, "secret"),
      user : await (new UserTransformer()).transform(user),
    });

  }


  static async signup(req: Request, res: Response, next: NextFunction) {
    req.body.city_id     = +req.body.city_id;
    req.body.location_id = +req.body.location_id;
    const inputData      = req.body as UserCreateDto;

    const preUser = await PreUser.findOne({
      where: {
        mobile_no: inputData.mobile_no
      }
    });

    if (!preUser) {
      throw new UnauthorizedException("Kindly Request for OTP first", 401);
    }

    try {
      await (new UserCreateValidator().validate(inputData));
    } catch (e) {
      throw new UnprocessableEntityException(e);
    }

    if (preUser.otp != inputData.otp) {
      throw new IncorrectOtpException();
    }
    const user = await userService.create(inputData);
    await preUser.destroy();
    return res.json({
      token: jwt.sign({ user }, "secret"),
      user : await new UserTransformer().transform(user),
    });
  }

  static async generateOtp(req: Request, res: Response) {
    const inputData = req.body as { mobile_no: string };
    const preUser   = await userService.preSignup(inputData);
    // todo: sendOtp
    const user      = await userService.showUserByMobile(inputData.mobile_no);
    if (user) {
      return res.json("OTP Generated, Kindly Login");
    }
    return res.json("OTP Generated, Kindly Register");
  }

  static async me(req: Request, res: Response) {
    return res.json({
      user: await (new UserTransformer()).transform(req.user),
    });
  }

  static async updateMe(req: Request, res: Response) {
    const user = req.user;
    const body = req.body as UserUpdateDto;
    // body.city_id     = +req.body.city_id;
    // body.location_id = +req.body.location_id;
    // body.area_id     = +req.body.area_id;
    //
    // req.body.pincode = +req.body.pincode;

    try {
      await new UserUpdateValidator().validate(body);
    } catch (e) {
      throw new UnprocessableEntityException(e);
    }

    const updatedUser = await userService.update(user, body);

    return res.json({
      token: jwt.sign({ user }, "secret"),
      user : await (new UserTransformer()).transform(updatedUser)
    });
  }

  static async deleteMe(req: Request, res: Response) {
    const user = req.user;
    await userService.delete(user);
  }

}
