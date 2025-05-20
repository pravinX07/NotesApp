import mongoose from "mongoose";
import dotenv from 'dotenv'


const connectDb = async() => {
    try {
         await mongoose.connect(process.env.MONGO_URI,)
         console.log("Database Connected Successfully.....");
         
    } catch (error) {
        console.log("DataBase connection failed!....", error);
        
    }
}
export default connectDb