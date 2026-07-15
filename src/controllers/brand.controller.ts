import { NextFunction, Request, Response } from "express";
import AppError from "../utils/customError.utils";
import Brand from "../models/brand.model";
import { catchAsync } from "../utils/catchAsync.utils";

export const create=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const {name,description}=req.body;
    if(!name){
        throw new AppError("Name is required",400);
    }
    if(!description){
        throw new AppError("Description is required",400);
    }
    const brand= await Brand.create({name,description});

    res.status(201).json({
        message:"Brand created Successfully",
        data:brand,
    });
});

export const getAll=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const brands=await Brand.find();

    res.status(200).json({
        message:"Brands fetched successfully",
        data:brands,
    });
});

export const getBrandById=catchAsync(async (req:Request,res:Response,next:NextFunction)=>{
    const {id}=req.params;
    const brand=await Brand.findById({_id:id});
    res.status(200).json({
        message:"Brand fetched successfully",
        data:brand,
    });
})


export const update=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const {name,description}=req.body;
    const {id}=req.params;
    const brand=await Brand.findOne({_id:id});
    console.log(brand);

    if(!brand){
        throw new AppError(`brand:${id} not found`,400);
    }
    if(name){
        brand.name=name;
    }
    if(description){
        brand.description=description;
    }

    await brand.save();
    res.status(200).json({
        message:"Brand fetched successfully",
        data:brand,
    });
});


export const deleteBrand=async(req:Request,res:Response,next:NextFunction)=>{
    const {id}=req.params;
    const brand= await Brand.findByIdAndDelete({_id:id});
    if(!brand){
        throw new AppError(`brand:${id} not found`, 400);
    }
    res.status(200).json({
        message:"Brand deleted successfully",
        data:brand,
    });
}