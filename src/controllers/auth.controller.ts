import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";

//! register

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {full_name,email,password}=req.body;
    if(!full_name){
      const error:any=new Error("full_name is required");
      error.status="fail";
      error.statusCode=400;
      throw error;
      
    }

    if(!email){
      const error:any=new Error("email is required");
      error.status="fail";
      error.statusCode=400;
      throw error;
      
    }

    if(!password){
      const error:any=new Error("password is required");
      error.status="fail";
      error.statusCode=400;
      throw error;
      
    }

    const user=new User({email,full_name,password});

    //* hash password
    const hash=await hashPassword(password);
    user.password=hash;

    //* upload profile image
    //* save user
     await user.save();
    //* success response
    res.status(200).json({
      message:"Account created",
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
      const error:any=new Error("email is required");
      error.status="fail";
      error.statusCode=400;
      throw error;
      
    }

    if(!password){
      const error:any=new Error("password is required");
      error.status="fail";
      error.statusCode=400;
      throw error;
      
    }
   
    //* find user by email
    const user=await User.findOne({email}).select("+password");
    if(!user){
      const error:any =new Error("Invalis Credentials");
      error.status="fail";
      error.statusCode=400;
      throw error;
    }

    //* check password
      const isPasswordMatched=await comparePassword(password,user.password);
      if(!isPasswordMatched){
      const error:any =new Error("Invalis Credentials");
      error.status="fail";
      error.statusCode=400;
      throw error;
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
