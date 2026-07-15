

import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { hashPassword } from "../utils/bcrypt.utils";

//! login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    
  } catch (error) {
    next(error);
  }
};

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
    res.status(201).json({
      message:"Account created",
      data:user,
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
