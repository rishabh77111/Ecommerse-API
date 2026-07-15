import express, { NextFunction, Request, Response } from 'express';

export const errorHandler=(error:any,req:Request,res:Response,next:NextFunction)=>{
  //console.log(error);
  const message=error?.message ?? "something went wrong";
  const status=error?.status ?? "error";
  const statusCode=error?.statusCode ??500;

   res.status(statusCode).json({
      message,
      status,
      success:false,
      data:null,
      stack:error?.stack,
   });

   // sendResponse(res,{message,
            
   //       
   //     statusCode,
   //     data:null,
   //     stack:error?.stack, 
   //     });
}