import { Response } from "express";


interface IResponseData<T>{
    message:string;
    statusCode:number;
    data:T
}
export const sendResponse =<T>(res:Response,data:IResponseData)=>{
    const {data:resData,message,statusCode}=data;
     res.status(statusCode).json({
        message,
        data:resData,
        success:String(statusCode).startsWith("2"),
        status:String(statusCode).startsWith('2')?"success" :String(statusCode).startsWith('4')?"fail" :"error",
     });
}