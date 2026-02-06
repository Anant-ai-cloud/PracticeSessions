import mongoose from "mongoose"

const dbConnect = async()=>{
    const { MONGO_URI } = process.env
    try{
        const conn = await mongoose.connect(MONGO_URI)
        console.log("Database is connected!", conn.connection.host)

    }catch(error){
        console.log(error.message)

    }
}
export default dbConnect