import logger from "../../util/logger.util";
import { ProductCategory } from "../../models/product-category.model";
import { ProductSubCategory } from "../../models/product-sub-category.model";
import { Product } from "../../models/product.model";
import { ENV_BASE_URL } from "../../util/secrets.util";
import { ProductCreateDto } from "../../dtos/product/product-create.dto";
import { ProductUpdateDto } from "../../dtos/product/product-update.dto";
import { Rate } from "../../models/rate.model";

class ProductService {
  constructor() {
    logger.silly("[PS-FT] ProductService");
  }

  static getInstance(): ProductService {
    return new ProductService();
  }

  async showCategory(categoryId: number): Promise<ProductCategory> {
    return ProductCategory.findById(categoryId);
  }

  async showSubCategory(categoryId: number): Promise<ProductSubCategory> {
    return ProductSubCategory.findById(categoryId);
  }

  async showProduct(categoryId: number): Promise<Product> {
    return Product.findById(categoryId);
  }

  async listCategories(): Promise<ProductCategory[]> {
    return ProductCategory.findAll();
  }

  async listSubCategories(category_id: number): Promise<ProductSubCategory[]> {
    return ProductSubCategory.findAll({
      where: {
        category_id: category_id
      }
    });
  }

  async listProducts(sub_category_id: number, location_id?: number, withIncludes?: boolean): Promise<Product[]> {
    return Product.findAll({
      where  : {
        sub_category_id: sub_category_id
      },
      include: withIncludes ? [
        {
          model: Rate,
          where: {
            location_id: location_id
          }
        }
      ] : []
    });
  }

  async addCategory(title: string): Promise<ProductCategory> {
    return ProductCategory.create({
      title: title
    });
  }

  async addSubCategory(title: string, category_id: number, image?: Express.Multer.File): Promise<ProductSubCategory> {
    return ProductSubCategory.create({
      title      : title,
      category_id: category_id,
      image_url  : image ? ENV_BASE_URL + image.path.replace(/\\/g, "/") : ""
    });
  }

  async addProduct(data: ProductCreateDto, image?: Express.Multer.File): Promise<Product> {
    return Product.create({
      title          : data.title,
      sub_category_id: data.sub_category_id,
      image_url      : image ? ENV_BASE_URL + image.path.replace(/\\/g, "/") : "",
      is_under_gst   : data.is_under_gst
    });
  }

  async updateCategory(category: ProductCategory, title: string): Promise<ProductCategory> {
    return category.update({
      title: title
    });
  }

  async updateSubCategory(subCategory: ProductSubCategory, title: string, category_id: number, image?: Express.Multer.File): Promise<ProductSubCategory> {
    return subCategory.update({
      title      : title,
      category_id: category_id,
      image_url  : image ? ENV_BASE_URL + image.path.replace(/\\/g, "/") : ""
    });
  }

  async updateProduct(product: Product, data: ProductUpdateDto, image?: Express.Multer.File): Promise<Product> {
    return product.update({
      title       : data.title,
      category_id : data.sub_category_id,
      image_url   : image ? ENV_BASE_URL + image.path.replace(/\\/g, "/") : "",
      is_under_gst: data.is_under_gst
    });
  }

  async deleteCategory(category: ProductCategory) {
    return category.destroy();
  }

  async deleteSubCategory(subCategory: ProductSubCategory) {
    return subCategory.destroy();
  }

  async deleteProduct(product: Product) {
    return product.destroy();
  }

}

export const productService = ProductService.getInstance();
