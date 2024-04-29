import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config(); 

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to the database", conn.connection.host)
    } catch (error) {
        console.log( "database connection failed : ", error.message );
    }
}

export default connectDB;

