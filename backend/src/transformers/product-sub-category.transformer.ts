import { TransformerAbstract } from "./transformer.abstract";
import { Dictionary } from "async";
import { ProductSubCategory } from "../models/product-sub-category.model";

export class ProductSubCategoryTransformer extends TransformerAbstract<ProductSubCategory> {

  protected _map(subCategory: ProductSubCategory): Dictionary<any> {

    return {
      id         : subCategory.id,
      title      : subCategory.title,
      slug       : subCategory.slug,
      category_id: subCategory.category_id,
      created_at : subCategory.createdAt,
      updated_at : subCategory.updatedAt,
      deleted_at : subCategory.deletedAt
    };
  }

}
