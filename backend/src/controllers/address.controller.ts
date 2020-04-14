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
        upload.single("image");
        image = req.file;
        let city;
        if (image) {
          // city = await addressService.addCity(inputData, image, transaction);
          // await transaction.commit();
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
        await upload.single("image");
        image = req.file;
        let location;
        if (image) {
          // location = await addressService.addLocation(inputData, image, transaction);
          // await transaction.commit();
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
        let area;
        if (image) {
          // const transaction = await dbService.getSequelize().transaction();
          // try {
          console.log(image.path);
          area = await addressService.addArea(inputData, image);
          // await transaction.commit();
          // } catch (e) {
          //   await transaction.rollback();
          //   throw e;
          // }
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

