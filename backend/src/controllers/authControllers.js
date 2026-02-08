import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

const generateAccessandRefreshTokens = async (userId) => {

    try {
        const user = await User.findById(userId)

        const accesstoken = user.generateAccessToken()
        const refreshtoken = user.generateRefreshToken()

        user.refreshtoken = refreshtoken
        await user.save({ validateBeforeSave: false })

        return { accesstoken, refreshtoken }
    } catch (error) {
        console.log(error)
        throw new Error("some error occured in generateAccessandRefreshTokens")
    }

}
const Signup = async (req, res) => {
    const { fullname, email, password } = req.body
    try {
        if ([fullname, email, password].some(field => !field || field.trim() === "")) {
            return res.status(400).json({ message: " all fields are required with valid values " })
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
        if (!emailRegex.test(email)) return res.status(400).json({ message: "Invalid email address" })
        if (password.length < 6) return res.status(400).json({ message: "password's length should be of minimum 6" })

        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "User already exists" })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({ fullname, email, password: hashedPassword })

        if (!newUser) return res.status(500).json({ message: "something went wrong while Registering the user" })

        const { accesstoken, refreshtoken } = await generateAccessandRefreshTokens(newUser._id)

        return res.status(201)
            .cookie("accesstoken", accesstoken)
            .cookie("refreshtoken", refreshtoken)
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

const Login = async (req, res) => {

    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "all fields are neccessary" })
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

        if (!emailRegex.test(email)) return res.status(400).json({ message: "email address Should be valid" })
        if (password.length < 6) return res.status(400).json({ message: "password should be of minimum 6 length" })

        const user = await User.findOne({ email })

        if (!user) return res.status(400).json({ message: "invalid credentials" })

        const correctPassword = await bcrypt.compare(password, user.password)
        if (!correctPassword) return res.status(400).json({ message: " pinvalid credentials " })

        const { accesstoken, refreshtoken } = await generateAccessandRefreshTokens(user._id)

        // const options= {
        //     httpOnly: true,//cookies can be modified by server Only
        //     secure: true // cookies can be sent on https secure request
        // }

        return res.status(201)
            .cookie("accesstoken", accesstoken)
            .cookie("refreshtoken", refreshtoken)
            .json({
                message: "User logged in successfully",
                _id: user._id,
                email: user.email,
                fullname: user.fullname

            })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

const Logout = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshtoken: 1
                }
            },
            {
                new: true
            }
        )
        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200)
            .clearCookie("accesstoken", options)
            .clearCookie("refreshtoken", options)
            .json({ message: "Logged out successfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }
}

const deleteAccount = async (req, res) => {
    try {
        const email = req.user.email
        const result = await User.deleteOne({ email })

        if (result.deletedCount === 0) throw new Error("there is some problem occured while deleting the account")

        return res.status(200).json({ message: " account deleted successfully" })

    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}

export {
    Signup,
    Login,
    Logout,
    deleteAccount
}

