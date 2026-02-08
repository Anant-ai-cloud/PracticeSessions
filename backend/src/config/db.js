import mongoose from "mongoose"
import { ENV } from "./env.js"

export const dbConnect = async()=>{
    try {
        const MONGO_URI = ENV.MONGO_URI
        const conn = await mongoose.connect(MONGO_URI)
        console.log("Database connected successfully", conn.connection.host)
    } catch (error) {
        console.log("Error while connecting to mongoDB", error)
    }
}