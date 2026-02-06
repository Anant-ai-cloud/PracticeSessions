import express from "express"
import dotenv from "dotenv"
import dbConnect from "./config/dbCon.js"
import authRoutes from "./Routes/authRoutes.js"

dotenv.config()
const app = express()

const { PORT } = process.env

app.use(express.json({ limit: "5mb" }))
app.use("/api/auth", authRoutes)

dbConnect()
app.listen(PORT, (req, res)=>{
    console.log("Your server is running on port",PORT)
})
