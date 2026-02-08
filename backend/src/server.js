import express from "express"
import "dotenv/config"
import { ENV } from "./config/env.js"
import { dbConnect } from "./config/db.js"



const app = express()

const PORT = ENV.PORT || 3000

dbConnect()
app.listen(PORT, (req, res)=>{
    console.log("Server is listening on PORT", PORT)
})
