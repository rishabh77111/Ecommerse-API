import mongoose,{ Document } from "mongoose";
import { Role } from "../@types/enum.types";

//! interface is optional

interface IUser extends Document{
full_name:string;
email:string;
role:Role;
password:string;
profile_image?:string;
};

//! user Schema
const userSchema=new mongoose.Schema<IUser>({
 full_name:{
    type:String,
    required:[true,"full_name is required"],
    minLength:[3,'name must be atleast 3 character length'],
 },
 email:{
    type:String,
    required:[true,"email is required"],
    unique:[true,"user already exists with provided"],
    trim:true,
 },
 role:{
   type:String,
   enum: Object.values(Role),
   default:Role.USER,
 },
 password:{
    type:String,
    required:[true,"password is required"],
    select:false,
 },
 profile_image:{
    type:String,
    default:null,
 }
},{timestamps:true});

//! user model
const User=mongoose.model<IUser>("user",userSchema);

export default User;

