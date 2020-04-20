import { NextFunction, Request, Response } from "express";
import { rateService } from "../services/entities/rate.service";
import { UnprocessableEntityException } from "../exceptions/root/unprocessable-entity.exception";
import { RateCreateValidator } from "../validator/product/rate-create.validator";
import { RateCreateDto } from "../dtos/product/rate-create.dto";
import { RateTransformer } from "../transformers/rate.transformer";
import { RateUpdateDto } from "../dtos/product/rate-update.dto";
import { ApiErrorCode } from "../exceptions/root/http.exception";
import { RateNotFoundException } from "../exceptions/product/rate-not-found.exception";

export class RateController {

  static async addRate(req: Request, res: Response) {
    const inputData = req.body as RateCreateDto;
    try {
      await (new RateCreateValidator().validate(inputData));
    } catch (e) {
      throw new UnprocessableEntityException(e);
    }
    const rate = await rateService.addRate(inputData);
    return res.json({
      data: await new RateTransformer().transform(rate)
    });
  }

  static async updateRate(req: Request, res: Response) {
    const rateId    = +req.params.rateId;
    const inputData = req.body as RateUpdateDto;
    const rate      = await rateService.showRate(rateId);
    if (!rate) {
      throw new RateNotFoundException();
    }
    const updatedRate = await rateService.updateRate(rate, inputData);
    return res.json({
      data: await new RateTransformer().transform(updatedRate)
    });
  }

  static async deleteRate(req: Request, res: Response) {
    const rateId = +req.params.rateId;
    const rate   = await rateService.showRate(rateId);
    if (!rate) {
      throw new RateNotFoundException();
    }
    await rateService.deleteRate(rate);
    return res.json("Success");
  }

}
