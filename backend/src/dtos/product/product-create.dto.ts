import { ImageUploadType } from "../../enums/image-upload-type.enum";

export interface ProductCreateDto {
  title: string;
  sub_category_id: number;
  is_under_gst: boolean;
  type?: ImageUploadType;
}
