import logger from "../../util/logger.util";
import { Transaction } from "sequelize";
import { Rate } from "../../models/rate.model";
import { RateCreateDto } from "../../dtos/product/rate-create.dto";
import { RateUpdateDto } from "../../dtos/product/rate-update.dto";

class RateService {
  constructor() {
    logger.silly("[N-FT] RateService");
  }

  static getInstance(): RateService {
    return new RateService();
  }


  async listRatesByCity(cityId: number): Promise<Rate> {
    return Rate.findOne({
      where: {
        city_id: cityId
      }
    });
  }

  async showRate(rateId: number): Promise<Rate> {
    return Rate.findById(rateId);
  }

  async addRate(data: RateCreateDto, transaction?: Transaction): Promise<Rate> {
    return Rate.create(data, { transaction });
  }

  async updateRate(rate: Rate, data: RateUpdateDto): Promise<Rate> {
    return rate.update(data);
  }

  async deleteRate(rate: Rate) {
    return rate.destroy();
  }
}

export const rateService = RateService.getInstance();
