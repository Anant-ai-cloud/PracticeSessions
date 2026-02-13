import express from "express"
import { Signup, Login } from "../controllers/authController.js"
import{ validation, signupSchema, loginSchema }from "../middlewares/inputValidation.js"

const router = express.Router()


router.post("/register", validation(signupSchema), Signup)
router.post("/login", validation(loginSchema), Login)

export default router;