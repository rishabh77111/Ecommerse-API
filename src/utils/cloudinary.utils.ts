import cloudinary from "../config/cloudinary.config";
import AppError from "./customError.utils";

export const upload = async (file:Express.Multer.File,dir="/") => {
  try {
    const folder='ecommerseAPI' + dir
    const {secure_url:path,public_id} =cloudinary.uploader.upload(file.path, 
        {
        resource_type: "auto",
        unique_filename:true,
        folder,
        }
    );
    return {
        path,
        public_id,
    };
      
  } catch (error) {
    console.log(error);
    throw new AppError("something went wrong", 400);
  }
};
