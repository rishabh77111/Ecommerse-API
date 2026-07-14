import express from 'express';
import {Request,Response,NextFunction} from 
//import userRouter from './routes/user.routes';

const app=express();


app.get("/",(req,res)=>{
  res.status(200).json({
    message:"server is running",
    success:true,
    status:"success",
    data:null,
  });
})

//!using routes
//app.use("/users",userRouter)


export default app;