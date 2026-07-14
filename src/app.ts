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
app.use((req,res)=>{
    const message=`can not ${req.method} on ${req.path}`;
    res.status(404).json({
        message,
        status:"fail",
        sucess:false,
        data:null,
    })
})

//! error handler middleware


export default app;