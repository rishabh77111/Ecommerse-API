
import mongoose, { Document } from "mongoose";

interface IBrand extends Document{
    name:string,
    description:string,
    logo?:string,
}
const brandSchema=new mongoose.Schema<IBrand>({
    name:{
        type:String,
        unique: true,
        trim: true,
    },
    description:{
        type:String,
        minLength: 25,
        trim: true,
    },
    logo:{
        type:String,
        //required: [true, "logo is required"],
    }
    },{timestamps:true});

    const Brand=mongoose.model<IBrand>("brand",brandSchema);

    export default Brand;