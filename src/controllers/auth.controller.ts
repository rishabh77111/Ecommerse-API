import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";
import AppError from "../utils/customError.utils";
import { catchAsync } from "../utils/catchAsync.utils";
import { sendResponse } from "../utils/sendResonse.utils";
import { upload } from "../utils/cloudinary.utils";

//! register

export const register = catchAsync(async ( req: Request,res: Response) => {
 
    const {full_name,email,password}=req.body;
    console.log(req.file);
    const file=req.file;
    if(!full_name){

      // const error:any=new Error("full_name is required");
      // error.status="fail";
      // error.statusCode=400;
      // throw error;

      throw new AppError("full_name is required",400);
      
    }

    if(!email){
      // const error:any=new Error("email is required");
      // error.status="fail";
      // error.statusCode=400;
      // throw error;
      throw new AppError("email is required",400);
      
    }

    if(!password){
      // const error:any=new Error("password is required");
      // error.status="fail";
      // error.statusCode=400;
      // throw error;

      throw new AppError("password is required",400);
      
    }

    const user=new User({email,full_name,password});

    //* hash password
    const hash=await hashPassword(password);
    user.password=hash;

    //* upload profile image
    if(file){
      // user.profile_image=file.path;
      const {path,public_id}=await upload(file,"/profile_image")
      user.profile_image={
        path:path,
        public_id:public_id,
      }
    }
    //* save user
     await user.save();
    //* success response

    sendResponse(res,{message:"Account created",
      data:{
        _id:user._id,
        email:user.email,
        full_name:user.full_name,
        profile_image:user.profile_image,
        role:user.role,
      },
    statusCode:201});
    });
    // res.status(201).json({
    //   message:"Account created",
    //   data:{
    //     _id:user._id,
    //     email:user.email,
    //     full_name:user.full_name,
    //     role:user.role,
    //   },
    //   status:"success",
    //   success:true,
    // });

//! get profile

//! change email

//! change password

//! forgot password



//! login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    
    const {email,password}=req.body;

      if(!email){
      // const error:any=new Error("email is required");
      // error.status="fail";
      // error.statusCode=400;
      // throw error;

       throw new AppError("email is required",400);
      
    }

    if(!password){
      // const error:any=new Error("password is required");
      // error.status="fail";
      // error.statusCode=400;
      // throw error;

       throw new AppError("password is required",400);
      
    }
   
    //* find user by email
    const user=await User.findOne({email}).select("+password");
    if(!user){
      // const error:any =new Error("Invalis Credentials");
      // error.status="fail";
      // error.statusCode=400;
      // throw error;
       throw new AppError("Invalid Credentials",400);
    }

    //* check password
      const isPasswordMatched=await comparePassword(password,user.password);
      if(!isPasswordMatched){
      // const error:any =new Error("Invalis Credentials");
      // error.status="fail";
      // error.statusCode=400;
      // throw error;
      throw new AppError("Invalid Credentials",400);
    }

     res.status(200).json({
      message:"Login successfull",
      data:{
        _id:user._id,
        email:user.email,
        full_name:user.full_name,
        role:user.role,
      },
      status:"success",
      success:true,
    });

  } catch (error) {
    next(error);
  }
};
