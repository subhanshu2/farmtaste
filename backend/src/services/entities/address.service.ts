import logger from "../../util/logger.util";
import { City } from "../../models/address/city.model";
import { Location } from "../../models/address/location.model";
import { Area } from "../../models/address/area.model";
import { AddressType } from "../../enums/address-type.enum";
import { type } from "os";
import { AddressCreateDto } from "../../dtos/address/address-create.dto";
import { CityTransformer } from "../../transformers/city.transformer";
import { LocationTransformer } from "../../transformers/location.transformer";
import { AreaTransformer } from "../../transformers/area.transformer";
import { ENV_BASE_URL } from "../../util/secrets.util";
import { Transaction } from "sequelize";

class AddressService {
  constructor() {
    logger.silly("[N-FT] AddressService");
  }

  static getInstance(): AddressService {
    return new AddressService();
  }

  async listCities(): Promise<City[]> {
    return City.findAll();
  }

  async listLocations(cityId: number): Promise<Location[]> {
    return Location.findAll({
      where: {
        city_id: cityId
      }
    });
  }

  async listAreas(locationId: number): Promise<Area[]> {
    return Area.findAll({
      where: {
        location_id: locationId
      }
    });
  }

  async findCity(id: number): Promise<City> {
    return City.findById(id);
  }

  async findLocation(id: number): Promise<Location> {
    return Location.findById(id);
  }

  async findArea(id: number): Promise<Area> {
    return Area.findById(id);
  }

  async addCity(data: AddressCreateDto, image?: Express.Multer.File, transaction?: Transaction): Promise<City> {
    return City.create({
      title    : data.title,
      image_url: image ? ENV_BASE_URL + image.path.replace(/\\/g, "/") : ""
    }, { transaction });
  }

  async addLocation(data: AddressCreateDto, image?: Express.Multer.File, transaction?: Transaction): Promise<Location> {
    return Location.create({
      title    : data.title,
      city_id  : data.city_id,
      image_url: image ? ENV_BASE_URL + image.path.replace(/\\/g, "/") : ""
    }, { transaction });
  }

  async addArea(data: AddressCreateDto, image?: Express.Multer.File, transaction?: Transaction): Promise<Area> {
    return Area.create({
      title      : data.title,
      location_id: data.location_id,
      image_url  : image ? ENV_BASE_URL + image.path.replace(/\\/g, "/") : ""
    }, { transaction });
  }
}

export const addressService = AddressService.getInstance();
