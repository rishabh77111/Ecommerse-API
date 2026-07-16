import multer, { FileFilterCallback } from "multer";
import fs from "fs";
import { Request } from "express";
import path from 'path';
import AppError from "../utils/customError.utils";
export const uploader=()=>{

    const folder="uploads/";
    const fileSize=5*1024*1024; //5mb in bytes
    const allowed_extensions=['.png','.jpg','.webp','.jpeg','.svg','.pdf'];
    const allowed_mimetypes=['image/png','image/jpeg','image/webp','image/jpg','image/svg/xml','application/pdf']

    //* create folder if not exists
    if(!fs.existsSync(folder)){
       fs.mkdirSync(folder,{recursive:true});
    }
    //* multer disk storage
    const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,folder); 
    },
    filename:(req,file,cb)=>{
        const fileName=Date.now() + "-" + file.originalname;
        cb(null,fileName);
    }
})

//* file filter
const fileFilter=(req:Request,file:Express.Multer.File,cb:FileFilterCallback)=>{

    //* check file_ext allowed
const file_ext=path.extname(file.originalname).toLocaleLowerCase();
if(!allowed_extensions.includes(file_ext)){
    cb(new AppError(`Invalid File extension.Only ${allowed_extensions.join(",")}are allowed`,400));
    return;
}

 //* check file type allowed
if(!allowed_mimetypes.includes(file.mimetype)){
    cb(new AppError(`Invalid File format.Only ${allowed_mimetypes.join(",")}are allowed`,400)
    );
    return;
}
cb(null,true);  //upload  current file
}
 
const upload=multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{
    fileSize:fileSize,
    },
});
return upload;
}