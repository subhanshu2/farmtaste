import { NextFunction, Request, Response } from "express";
import { addressService } from "../services/entities/address.service";
import { CityTransformer } from "../transformers/city.transformer";
import { LocationTransformer } from "../transformers/location.transformer";
import { AreaTransformer } from "../transformers/area.transformer";
import { AddressType } from "../enums/address-type.enum";
import { AddressCreateDto } from "../dtos/address/address-create.dto";
import { City } from "../models/address/city.model";
import { dbService } from "../services/db.service";
import { UnprocessableEntityException } from "../exceptions/root/unprocessable-entity.exception";
import { CityCreateValidator } from "../validator/address/city-create.validator";
import { AreaCreateValidator } from "../validator/address/area-create.validator";
import { LocationCreateValidator } from "../validator/address/location-create.validator";
import { AddressCreateValidator } from "../validator/address/address-create.validator";
import { upload } from "../services/factories/multer.service";
import multer from "multer";
import * as fs from "fs";
import { Area } from "../models/address/area.model";
import { Location } from "../models/address/location.model";
import { AddressNotFoundException } from "../exceptions/address/address-not-found.exception";
import { add } from "winston";

export class AddressController {

  static async listCities(req: Request, res: Response) {
    const cities = await addressService.listCities();
    return res.json({
      data: await new CityTransformer().transformList(cities)
    });
  }

  static async listLocations(req: Request, res: Response) {
    const cityId    = +req.params.cityId;
    const locations = await addressService.listLocations(cityId);
    return res.json({
      data: await new LocationTransformer().transformList(locations)
    });
  }

  static async listAreas(req: Request, res: Response) {
    const locationId = +req.params.locationId;
    const areas      = await addressService.listAreas(locationId);
    return res.json({
      data: await new AreaTransformer().transformList(areas)
    });
  }

  static async addAddresses(req: Request, res: Response) {
    req.body.city_id     = +req.body.city_id;
    req.body.location_id = +req.body.location_id;
    const inputData      = req.body as AddressCreateDto;
    let image;
    switch (inputData.type) {
      case AddressType.CITY:
        try {
          await (new CityCreateValidator().validate(inputData));
        } catch (e) {
          throw new UnprocessableEntityException(e);
        }
        image = req.file;
        let city;
        if (image) {
          try {
            city = await addressService.addCity(inputData, image);
          } catch (e) {
            fs.unlinkSync(image.path.replace(/\\/g, "/"));
            throw e;
          }
        } else {
          city = await addressService.addCity(inputData);
        }
        return res.json({
          data: await new CityTransformer().transform(city)
        });


      case AddressType.LOCATION:
        try {
          await (new LocationCreateValidator().validate(inputData));
        } catch (e) {
          throw new UnprocessableEntityException(e);
        }
        image = req.file;
        let location: Location;
        if (image) {
          try {
            location = await addressService.addLocation(inputData, image);
          } catch (e) {
            fs.unlinkSync(image.path.replace(/\\/g, "/"));
            throw e;
          }
        } else {
          location = await addressService.addLocation(inputData);
        }
        return res.json({
          data: await new LocationTransformer().transform(location)
        });


      case AddressType.AREA:
        try {
          await (new AreaCreateValidator().validate(inputData));
        } catch (e) {
          throw new UnprocessableEntityException(e);
        }
        image = req.file;
        let area: Area;
        if (image) {
          try {
            area = await addressService.addArea(inputData, image);
          } catch (e) {
            fs.unlinkSync(image.path.replace(/\\/g, "/"));
            throw e;
          }
        } else {
          area = await addressService.addArea(inputData);
        }
        return res.json({
          data: await new AreaTransformer().transform(area)
        });
    }
  }

  static async updateImage(req: Request, res: Response) {
    const inputData = req.body as { type: AddressType };
    const addressId = +req.params.addressId;

    const address = await addressService.findAddress(inputData.type, addressId);
    if (!address) {
      throw new AddressNotFoundException();
    }
  }

  static async deleteAddress(req: Request, res: Response) {
    const inputData = req.body as { type: AddressType };
    const addressId = +req.params.addressId;
    const address = await addressService.findAddress(inputData.type, addressId);
    if (!address) {
      throw new AddressNotFoundException();
    }
    // await address.destroy;
    await addressService.deleteAddress(address);
    return res.json("Success");
  }

}

