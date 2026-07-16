import multer from "multer";
import fs from "fs";

export const uploader=()=>{

    const folder="uploads/";
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
 
const upload=multer({storage:storage});
return upload;
}