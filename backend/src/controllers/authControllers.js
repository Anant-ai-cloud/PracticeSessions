import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

const generateAccessandRefreshToken= async (userId)=>{
   try {
     const user = await User.findOne({ userId })
 
     const refreshtoken = user.generateRefreshToken()
     const accesstoken = user.generateAccessToken()
     user.refreshtoken = refreshtoken
     await user.save({ validateBeforeSave: false })

     return { accesstoken, refreshtoken }
 
   } catch (error) {
     console.log(error)
   }
}


const Signup = async (req, res) => {
    const { fullname, email, password } = req.body

    try {
       if([fullname, email, password].some(field=> !field || field.trim()=== "")){
         return res.status(400).json({message: " all fields are required"})
        }
       

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
        if (!emailRegex.test(email)) return res.status(400).json({ message: "email should be valid" })

        if (password.length < 6) return res.status(400).json({ message: " password's length should be more than 6 " })

        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "user already exists" })

       const salt = await bcrypt.genSalt(10)
       const hashedPassword =  await bcrypt.hash(password, salt)

        const newUser = await User.create({ fullname, email, password: hashedPassword })

        if (newUser) {
            return res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                fullname: newUser.fullname,
                message: " User registered successfully "
            })
        } else {
            return res.status(400).json({ message: " Invalid User data " })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }


}

export {
    Signup
}