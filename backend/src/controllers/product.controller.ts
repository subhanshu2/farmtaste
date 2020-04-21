import { Request, Response } from "express";
import { productService } from "../services/entities/product.service";
import { ProductCategoryTransformer } from "../transformers/product-category.transformer";
import { ProductSubCategoryTransformer } from "../transformers/product-sub-category.transformer";
import { ProductTransformer } from "../transformers/product.transformer";
import { ProductCategoryNotFoundException } from "../exceptions/product/product-category-not-found.exception";
import { ProductSubCategoryNotFoundException } from "../exceptions/product/product-sub-category-not-found.exception";
import { ProductNotFoundException } from "../exceptions/product/product-not-found.exception";
import * as fs from "fs";
import { ImageUploadType } from "../enums/image-upload-type.enum";
import { ProductCreateDto } from "../dtos/product/product-create.dto";
import { ProductUpdateDto } from "../dtos/product/product-update.dto";
import { UserLoginValidator } from "../validator/user/user-login.validator";
import { UnprocessableEntityException } from "../exceptions/root/unprocessable-entity.exception";
import { ProductSubCategoriesCreateValidator } from "../validator/product/product-sub-categories-create.validator";
import { ProductCreateValidator } from "../validator/product/product-create.validator";
import { ProductSubCategoriesUpdateValidator } from "../validator/product/product-sub-categories-udpate.validator";
import { ProductUpdateValidator } from "../validator/product/product-update.validator";

export class ProductController {

  static async listProductCategories(req: Request, res: Response) {
    const categories = await productService.listCategories();
    return res.json({
      data: await new ProductCategoryTransformer().transformList(categories)
    });
  }

  static async listProductSubCategories(req: Request, res: Response) {
    const categoryId    = +req.params.categoryId;
    const subCategories = await productService.listSubCategories(categoryId);
    return res.json({
      data: await new ProductSubCategoryTransformer().transformList(subCategories)
    });
  }

  static async listProducts(req: Request, res: Response) {
    const city_id       = +req.user.city_id;
    const subCategoryId = +req.params.subCategoryId;
    const products      = await productService.listProducts(subCategoryId, city_id, true);
    return res.json({
      data: await new ProductTransformer().transformList(products)
    });
  }

  static async createProductCategory(req: Request, res: Response) {
    const inputData = req.body as { title: string };
    const category  = await productService.addCategory(inputData.title);
    return res.json({
      data: await new ProductCategoryTransformer().transform(category)
    });
  }

  static async createProductSubCategory(req: Request, res: Response) {
    const inputData = req.body as { title: string, category_id: number, type?: ImageUploadType };
    const image     = req.file;
    try {
      await (new ProductSubCategoriesCreateValidator().validate(inputData));
    } catch (e) {
      fs.unlinkSync(image.path.replace(/\\/g, "/"));
      throw new UnprocessableEntityException(e);
    }
    let subCategory;
    if (image) {
      try {
        subCategory = await productService.addSubCategory(inputData.title, inputData.category_id, image);
      } catch (e) {
        fs.unlinkSync(image.path.replace(/\\/g, "/"));
        throw e;

      }
    } else {
      subCategory = await productService.addSubCategory(inputData.title, inputData.category_id);
    }
    return res.json({
      data: await new ProductSubCategoryTransformer().transform(subCategory)
    });
  }

  static async createProduct(req: Request, res: Response) {
    const inputData = req.body as ProductCreateDto;
    const image     = req.file;
    try {
      await (new ProductCreateValidator().validate(inputData));
    } catch (e) {
      fs.unlinkSync(image.path.replace(/\\/g, "/"));
      throw new UnprocessableEntityException(e);
    }
    let product;
    if (image) {
      try {
        product = await productService.addProduct(inputData, image);
      } catch (e) {
        fs.unlinkSync(image.path.replace(/\\/g, "/"));
        throw e;

      }
    } else {
      product = await productService.addProduct(inputData);
    }
    return res.json({
      data: await new ProductTransformer().transform(product)
    });
  }

  static async updateProductCategory(req: Request, res: Response) {
    const categoryId = +req.params.categoryId;
    const inputData  = req.body as { title: string };
    const category   = await productService.showCategory(categoryId);
    if (!category) {
      throw new ProductCategoryNotFoundException();
    }
    const updatedCategory = await productService.updateCategory(category, inputData.title);
    return res.json({
      data: await new ProductCategoryTransformer().transform(updatedCategory)
    });
  }

  static async updateProductSubCategory(req: Request, res: Response) {
    const subCategoryId = +req.params.subCategoryId;
    const inputData     = req.body as { title: string, category_id: number, type?: ImageUploadType };
    const subCategory   = await productService.showSubCategory(subCategoryId);
    if (!subCategory) {
      throw new ProductSubCategoryNotFoundException();
    }
    const image = req.file;
    try {
      await (new ProductSubCategoriesUpdateValidator().validate(inputData));
    } catch (e) {
      fs.unlinkSync(image.path.replace(/\\/g, "/"));
      throw new UnprocessableEntityException(e);
    }
    let updatedSubCategory;
    if (image) {
      try {
        updatedSubCategory = await productService.updateSubCategory(subCategory, inputData.title, inputData.category_id, image);
      } catch (e) {
        fs.unlinkSync(image.path.replace(/\\/g, "/"));
        throw e;

      }
    } else {
      updatedSubCategory = await productService.updateSubCategory(subCategory, inputData.title, inputData.category_id);
    }
    return res.json({
      data: await new ProductCategoryTransformer().transform(updatedSubCategory)
    });
  }

  static async updateProduct(req: Request, res: Response) {
    const productId = +req.params.productId;
    const inputData = req.body as ProductUpdateDto;
    const product   = await productService.showProduct(productId);
    if (!product) {
      throw new ProductNotFoundException();
    }
    const image = req.file;
    try {
      await (new ProductUpdateValidator().validate(inputData));
    } catch (e) {
      fs.unlinkSync(image.path.replace(/\\/g, "/"));
      throw new UnprocessableEntityException(e);
    }
    let updatedProduct;
    if (image) {
      try {
        updatedProduct = await productService.updateProduct(product, inputData, image);
      } catch (e) {
        fs.unlinkSync(image.path.replace(/\\/g, "/"));
        throw e;
      }
    } else {
      updatedProduct = await productService.updateProduct(product, inputData);
    }

    return res.json({
      data: await new ProductCategoryTransformer().transform(updatedProduct)
    });
  }

  static async deleteProductCategory(req: Request, res: Response) {
    const categoryId = +req.params.categoryId;

    const category = await productService.showCategory(categoryId);
    if (!category) {
      throw new ProductCategoryNotFoundException();
    }
    await productService.deleteCategory(category);
    return res.json("Success");
  }

  static async deleteProductSubCategory(req: Request, res: Response) {
    const subCategoryId = +req.params.subCategoryId;

    const subCategory = await productService.showSubCategory(subCategoryId);
    if (!subCategory) {
      throw new ProductSubCategoryNotFoundException();
    }
    await productService.deleteSubCategory(subCategory);
    return res.json("Success");
  }

  static async deleteProduct(req: Request, res: Response) {
    const productId = +req.params.productId;

    const product = await productService.showProduct(productId);
    if (!product) {
      throw new ProductNotFoundException();
    }
    await productService.deleteProduct(product);
    return res.json("Success");
  }

}
