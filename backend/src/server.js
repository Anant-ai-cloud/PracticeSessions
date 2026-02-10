import express from "express"
import "dotenv/config"
import cookieParser from "cookie-parser"
import { ENV } from "./config/env.js"
import { dbConnect } from "./config/db.js"
import authRouter from "./routes/authRoute.js"
import todoRouter from "./routes/todoRoute.js"



const app = express()
app.use(express.json({ limit: "5mb"}))
app.use(cookieParser())

const PORT = ENV.PORT || 3000

dbConnect()
app.listen(PORT, (req, res)=>{
    console.log("Server is listening on PORT", PORT)
})
app.use("/api/auth", authRouter)
app.use("/api/", todoRouter)
