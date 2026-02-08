import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

const verifyJwt = async (req, _, next) => {
    try {
        const token = req.cookies?.accesstoken
        console.log(token)
        if (!token) throw new Error("Token required")

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshtoken")
        if (!user) throw new Error("invalid token")
        req.user = user
        next()

    } catch (error) {
        console.log("some error occured", error)
    }
}

export default verifyJwt