import express from 'express';

const app=express();
const port=8004;

app.get("/",(req,res)=>{
  res.status(200).json({
    message:"server is running",
    success:true,
    status:"success",
    data:null,
  });
})
app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`);
});