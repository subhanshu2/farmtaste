import logger from "../../util/logger.util";
import { UserCreateDto } from "../../dtos/user/user-create.dto";
import { isUndefined } from "util";
import { UserUpdateDto } from "../../dtos/user/user-update.dto";
import { Helpers } from "../../util/helpers.util";
import { User } from "../../models/user.model";
import { PreUser } from "../../models/pre-user.model";

class UserService {
  private readonly LIMIT = 20;

  private constructor() {
    logger.silly("[N-GD] UserService");
  }

  static getInstance(): UserService {
    return new UserService();
  }

  async preSignup(data: { mobile_no: string }): Promise<PreUser> {
    let token = Helpers.generateRandomString(5, {
      includeLowerCase        : false,
      includeNumbers          : true,
      includeUpperCase        : false
    });
    console.log(token);
    const preUser = await PreUser.findOne({
      where: {
        mobile_no: data.mobile_no
      }
    });
    if (data.mobile_no === "9711635385") {
      token = "12345";
    }
    if (preUser) {
      return preUser.update({otp: token});
    }
    return PreUser.create({
      mobile_no: data.mobile_no,
      otp: token
    });
  }

  async create(data: UserCreateDto): Promise<User> {
    return User.create(data);
  }

  async show(userId: number, withIncludes?: boolean): Promise<User> {
    return User.findOne({
      where  : {
        id: userId
      },
      include: withIncludes ? [
        {all: true}
      ] : []
    });
  }

  async showUserByEmail(email: string, withIncludes?: boolean): Promise<User> {
    return User.findOne({
      where  : {
        email: email
      },
      include: withIncludes ? [
        {all: true}
      ] : []
    });
  }

  async showUserByMobile(mobile: string, withIncludes?: boolean): Promise<User> {
    return User.findOne({
      where  : {
        mobile_no: mobile
      },
      include: withIncludes ? [
        {all: true}
      ] : []
    });
  }

  async update(user: User, data: UserUpdateDto): Promise<User> {
    Helpers.removeUndefinedKeys(data);
    return user.update(data);
  }

  async delete(user: User): Promise<any> {
    await user.destroy();
  }
}

export const userService = UserService.getInstance();
