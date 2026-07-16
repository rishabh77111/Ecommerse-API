import mongoose, { Document } from "mongoose";
import { Role } from "../@types/enum.types";

//! interface is optional

interface IUser extends Document {
  full_name: string;
  email: string;
  role: Role;
  password: string;
  profile_image?:{
   path:string,
   public_id:string,
  };
}

//! user Schema
const userSchema = new mongoose.Schema<IUser>(
  {
    full_name: {
      type: String,
      required: [true, "full_name is required"],
      minLength: [3, "name must be atleast 3 character length"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "user already exists with provided"],
      trim: true,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      select: false,
    },
    //profileimage:{path:'nsdn',public id:'jsdnj'}
    profile_image: {
      type: {
        path: {
          type: String,
          required: [true, "image path is required"],
        },
        public_id: {
          type: String,
          required: [true, "image public_id is required"],
        },
      },
      default: null,
    },
  },
  { timestamps: true },
);

//! user model
const User = mongoose.model<IUser>("user", userSchema);

export default User;
