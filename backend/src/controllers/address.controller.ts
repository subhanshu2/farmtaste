import { NextFunction, Request, Response } from "express";
import { addressService } from "../services/entities/address.service";
import { CityTransformer } from "../transformers/city.transformer";
import { LocationTransformer } from "../transformers/location.transformer";
import { AreaTransformer } from "../transformers/area.transformer";
import { AddressType } from "../enums/address-type.enum";
import { AddressCreateDto } from "../dtos/address/address-create.dto";
import { City } from "../models/address/city.model";

export class AddressController {

  static async listCities(req: Request, res: Response) {
    const cities = await addressService.listCities();
    return res.json({
      data: await new CityTransformer().transformList(cities)
    });
  }

  static async listLocations(req: Request, res: Response) {
    const locations = await addressService.listLocations();
    return res.json({
      data: await new LocationTransformer().transformList(locations)
    });
  }

  static async listAreas(req: Request, res: Response) {
    const areas = await addressService.listAreas();
    return res.json({
      data: await new AreaTransformer().transformList(areas)
    });
  }

  static async addAddresses(req: Request, res: Response) {
    const inputData = req.body as AddressCreateDto;
    const image = req.file;
    switch (inputData.type) {
      case AddressType.CITY:
        let city;
        if (image) {
          city = await addressService.addCity(inputData, image);
        } else {
          city = await addressService.addCity(inputData);
        }
        return res.json({
          data: await new CityTransformer().transform(city)
        });
      case AddressType.LOCATION:
        let location;
        if (image) {
          location = await addressService.addLocation(inputData, image);
        } else {
          location = await addressService.addLocation(inputData);
        }
        return res.json({
          data: await new LocationTransformer().transform(location)
        });
      case AddressType.AREA:
        let area;
        if (image) {
          area = await addressService.addArea(inputData, image);
        } else {
          area = await addressService.addArea(inputData);
        }
        return res.json({
          data: await new AreaTransformer().transform(area)
        });
    }
  }

  static async deleteAddress(req: Request, res: Response) {
    const inputData = req.body as { type: AddressType };
    const addressId = +req.query.addressId;
    let address;
    switch (inputData.type) {
      case AddressType.CITY:
        address = await addressService.findCity(addressId);
        await address.destroy();
        break;
      case AddressType.LOCATION:
        address = await addressService.findLocation(addressId);
        await address.destroy();
        break;
      case AddressType.AREA:
        address = await addressService.findArea(addressId);
        await address.destroy();
        break;
    }
    return res.json("Success");
  }

}

