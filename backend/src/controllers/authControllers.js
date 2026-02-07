import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

const generateAccessandRefreshTokens = async (userId) => {

    const user = await User.findById(userId)

    const accesstoken = user.generateAccessToken()
    const refreshtoken = user.generateRefreshToken()

    user.refreshtoken = refreshtoken
    await user.save({ validateBeforeSave: false })

    return { accesstoken, refreshtoken }

}
const Signup = async (req, res) => {
    const { fullname, email, password } = req.body
    try {
        if ([fullname, email, password].some(field => !field || field.trim() === "")) {
            return res.status(400).json({ message: " all fields are required with valid values " })
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
        if (!emailRegex.test(email)) return res.status(400).json({ message: "Invalid email address" })
        if(password.length < 6 ) return res.status(400).json({message: "password's length should be of minimum 6"})

        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "User already exists" })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({ fullname, email, password: hashedPassword })

        if (!newUser) return res.status(500).json({ message: "something went wrong while Registering the user" })

        const { accesstoken, refreshtoken } = await generateAccessandRefreshTokens(newUser._id)

        return res.status(201)
            .cookie("accessToken", accesstoken)
            .cookie("refreshToken", refreshtoken)
            .json({
                message: "User Registered Successfully",
                id: newUser._id,
                email: newUser.email,
                fullname: newUser.fullname
            })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: " Internal server error" })
    }
}

export {
    Signup
}

