import logger from "../../util/logger.util";
import { City } from "../../models/address/city.model";
import { Location } from "../../models/address/location.model";
import { Area } from "../../models/address/area.model";
import { AddressCreateDto } from "../../dtos/address/address-create.dto";
import { ENV_BASE_URL } from "../../util/secrets.util";
import { Transaction } from "sequelize";
import { AddressType } from "../../enums/address-type.enum";
import { AddressNotFoundException } from "../../exceptions/address/address-not-found.exception";

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
      image_url: image ? image.path.replace(/\\/g, "/") : ""
    }, { transaction });
  }

  async addLocation(data: AddressCreateDto, image?: Express.Multer.File, transaction?: Transaction): Promise<Location> {
    return Location.create({
      title    : data.title,
      city_id  : data.city_id,
      image_url: image ? image.path.replace(/\\/g, "/") : ""
    }, { transaction });
  }

  async addArea(data: AddressCreateDto, image?: Express.Multer.File, transaction?: Transaction): Promise<any> {

    return Area.create({
      title      : data.title,
      location_id: data.location_id,
      image_url  : image ? image.path.replace(/\\/g, "/") : ""
    }, { transaction });
  }

  async findAddress(type: AddressType, address_id: number) {
    let address;
    switch (type) {
      case AddressType.CITY:
        address = await addressService.findCity(address_id);
        break;
      case AddressType.LOCATION:
        address = await addressService.findLocation(address_id);
        break;
      case AddressType.AREA:
        address = await addressService.findArea(address_id);
        break;
    }
    return address;
  }
  async deleteAddress(address: City | Location | Area) {
    return address.destroy();
  }
}

export const addressService = AddressService.getInstance();
