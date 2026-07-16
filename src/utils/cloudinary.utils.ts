import cloudinary from "../config/cloudinary.config";
import AppError from "./customError.utils";
import fs from "fs";

export const upload = async (file:Express.Multer.File,dir="/") => {
  try {
    const folder='ecommerseAPI' + dir
    const {secure_url:path,public_id} =await cloudinary.uploader.upload(file.path, 
        {
        resource_type: "auto",
        unique_filename:true,
        folder,
        transformation:{
            width:800,
            height:800,
            crop:"fill",
            fetch_format:"auto",
            gravity:"face",
            format:"auto",
        }
        }
    );
    //* delete from local uploads folder
    if(fs.existsSync(file.path)){
        fs.unlinkSync(file.path);
    }

    return {
        path,
        public_id,
    };
      
  } catch (error:any) {
    console.log("error:", error);
    //throw new AppError("something went wrong", 400);
     throw new AppError(error.message || "something went wrong", 400);
  }
};
