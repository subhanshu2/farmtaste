import { Dictionary } from "async";
import uuidv4 from "uuid";
import { isUndefined } from "util";
import { HttpException } from "../exceptions/root/http.exception";
import { Response } from "express";
import filenamify from "filenamify";

export class Helpers {
  public static generateRandomString(length = 8, options: {
    includeUpperCase: boolean,
    includeLowerCase: boolean,
    includeNumbers: boolean
  }) {
    let dictionary = "";
    let random     = "";

    if (options.includeLowerCase) {
      dictionary += "abcdefghijklmnopqrstuvwxyz";
    }

    if (options.includeUpperCase) {
      dictionary += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (options.includeNumbers) {
      dictionary += "1234567890";
    }

    for (let i = 1; i <= length; i++) {
      random += dictionary.charAt(Math.floor(Math.random() * dictionary.length));
    }

    return random;
  }

  public static generateRandomNumber(max: number, min?: number) {
    const effectiveMin = min || 0;

    const _window = max - min;

    if (_window <= 0) {
      throw "PARAMS_ERROR";
    }

    return min + Math.floor(Math.random() * _window);
  }

  public static replaceUndefinedWithNull(object: any) {
    if (isUndefined(object)) {
      return null;
    }
    return object;
  }

  public static generateUUIDV4(): string {
    return uuidv4();
  }

  public static sanitizeString(subject: string): string {
    const asciiPart     = subject.replace(/[^\x00-\x7F]/g, "");
    const withoutSpaces = asciiPart.replace(" ", "_");
    return withoutSpaces.toLowerCase();
  }

  public static sleep(time: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  /**
   * Ideally, the parameter type any should be replaced by typeof T but the compiler (TS 2.4) can"t understand this syntax.
   * @param enumRef
   * @returns {T[]}
   */
  public static iterateEnum<T>(enumRef: any): T[] {
    return Object.keys(enumRef).map(key => enumRef[key]);
  }

  public static checkInEnum<T>(enumRef: any, value: T): boolean {
    return Object.keys(enumRef)
      .filter(k => isNaN(Number(k))) // Removing reverse mapping in numeric enums.
      .filter(k => enumRef[k] === value).length > 0;
  }

  public static inflate<T>(object: T, params: Dictionary<any>): T {
    return <T>Object.assign(object, params);
  }

  public static removeUndefinedKeys(object: any) {
    Object.keys(object).forEach(key => {
      if (isUndefined(object[key])) {
        delete object[key];
      }
    });
  }

  public static handleError(res: Response, exception: HttpException): void {
    res.statusCode = exception.statusCode;
    res.json({
      code   : exception.errorCode,
      message: exception.message,
      errors : exception.errors
    });

    return;
  }

  public static sanitizePath(path: string): string {
    return filenamify(path, {
      replacement: "_"
    });
  }

  public static slugify(input: string): string {
    return input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, " ")
      .replace(/[\s-]+/g, "_");
  }

  public static unslugify(input: string): string {
    if (!input) {
      return null;
    }
    return Helpers.titlecase(input.replace(new RegExp("_", "g"), " "));
  }

  public static titlecase(input: string): string {
    if (!input) {
      return null;
    }
    return input.split(" ")
      .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
      .join(" ");
  }

}
