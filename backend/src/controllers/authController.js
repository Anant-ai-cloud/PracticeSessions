import User from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { ENV } from "../config/env.js";
import bcrypt from "bcryptjs"


const generateToken = (userId, role)=>{
    return jwt.sign(
        {
            _id: userId,
            role: role
        },
        ENV.TOKEN_SECRET,
        {
            expiresIn: ENV.TOKEN_EXPIRY
        }

    )

}

const Signup = async(req, res)=>{
    const { email, username, password, role } = req.body
    try {
        if([email, username, password].some(field=> !field || field.trim()=== "")){
            return res.status(400).json({ message: "all fields are neccessary with valid values" })
        }
        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(!emailRegex.test(email)) return res.status(400).json({ message: "email should be valid"})
        if(password.length < 8) return res.status(400).json({message: "Password's length should be minimum 8"})

        const user = await User.findOne({
            $or: [{email}, {username}]
        })
        if(user) return res.status(400).json({message: "user already exist with same email or username"})

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const cleanRole = role && role.trim()? role: undefined // if empty string or whitespaces, undefined then explicitly become undefined

        const newUser= await User.create({
            email,
            username,
            password: hashedPassword,
            role: cleanRole
        })
        if(!newUser) return res.status(500).json({message: "User not registered due to some issue"})

        return res.status(200).json({
               _id: newUser._id,
               email: newUser.email,
               role: newUser.role,
               message: " user registered successfully "
            
            })
    
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "internal server error"})
        
    }
}

const Login = async(req, res)=>{
    const { email, password } = req.body

    try {
        if([email, password].some(field=> !field || field.trim()==="")){
            return res.status(400).json({message: "all fields are required with valid values"})
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(!emailRegex.test(email)) return res.status(400).json({message: "email should be valid"})
        if(password.length < 8) return res.status(400).json({message: "password's length should be of minimum 8"})
            
        const user = await User.findOne({ email })
        
    } catch (error) {
       console.log(error)
       return res.status(500).json({message: "internal server error"})    
    }
}
export {
    Signup
}