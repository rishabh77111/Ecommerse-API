import mongoose from 'mongoose'
export const connectDatabase=async (DB_URI:string)=>{
    try {
        await mongoose.connect(DB_URI);
        console.log("Database connected");
    } catch (error) {
        console.log("-----------------Database connection error---------------");
        console.log(error);
    }
}