import express from 'express';

//import userRouter from './routes/user.routes';

const app=express();

//! using miidlewares
app.use(express.json());


//! health route
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

//! path not found

//! error handler middleware


export default app;