import  mongoose  from "mongoose";
import { Role } from "../@types/enum.types";
import AppError from "./customError.utils";
import jwt from "jsonwebtoken";

interface IJwtPayload{
_id:mongoose.Types.ObjectId;
email:string,
role:Role;
}
export const genrateJwtToken=(payload:IJwtPayload)=>{
    try {
        return jwt.sign({payload},"hjdsfhgjgasjfsjdjgjadsgjgghsgh",{
            expiresIn:"7d",
        })
    } catch (error) {
        console.log(error);
        throw new AppError("something went wrong",400);
    }
}