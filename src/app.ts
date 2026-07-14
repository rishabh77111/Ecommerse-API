import express, { NextFunction, Request, Response } from 'express';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import authRouter from './routes/auth.routes.js';

//import userRouter from './routes/user.routes';


const app=express();

//! using miidlewares
app.use(express.json());


//! health route
app.get("/",(req:Request,res:Response,next:NextFunction)=>{
  res.status(200).json({
    message:"server is running",
    success:true,
    status:"success",
    data:null,
  });
})

//!using routes
app.use("/api/v1/auth",authRouter)

//! path not found
app.use((req,res,next)=>{
  
    const message=`can not ${req.method} on ${req.path}`;

    const error:any=new Error(message);
    error.status="fail";
    error.statusCode=404;
    //console.log(error);
    next(error);
    // next({
    //   message,
    //   status:"fail",
    //   statusCode:404,
    // });
})

//! error handler middleware

app.use(errorHandler);


export default app;