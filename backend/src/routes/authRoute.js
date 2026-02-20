import express from "express"
import { Signup, Login } from "../controllers/authController.js"
import{ validation, signupSchema, loginSchema }from "../middlewares/inputValidation.js"
import verifyJwt from "../middlewares/verifyJwt.js"
const router = express.Router()


router.post("/register", validation(signupSchema), Signup)
router.post("/login", validation(loginSchema), Login)

router.get("/check", verifyJwt, (req, res)=> res.status(200).json(req.user))

export default router;