import { login,register } from "../controllers/auth.controller";
import express from "express";
import { uploader } from "../middlewares/multer.middleware";
//import multer from 'multer';

const router=express.Router();

//* multer upload instance

//const upload=multer({dest:"uploads/"});

// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"uploads/");
//     },
//     filename:(req,file,cb)=>{
//         cb(null,file.originalname);
//     }
// })
 
// const upload=multer({storage:storage});

//* multer uploader
const upload=uploader();

router.post("/register",upload.single('profile_image'),register);
router.post("/login",login);
export default router;