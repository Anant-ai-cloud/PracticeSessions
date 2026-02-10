import jwt from "jsonwebtoken"
import { ENV } from "../config/env.js"
import User from "../models/user.model.js"
const verifyJwt = async (req, res, next) => {
    try {

        const token = req.cookies?.token
        if (!token) return res.status(401).json({ message: "Unauthorized, token is required" })

        const decodedToken = jwt.verify(token, ENV.TOKEN_SECRET)
        if (!decodedToken) return res.status(400).json({ message: "invalid token" })

        const user = await User.findById(decodedToken._id)
        if (!user) return res.status(400).json({ message: "user not found" })

        req.user = user
        next()

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }
}

export default verifyJwt