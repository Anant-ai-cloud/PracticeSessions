import express from "express"
import { Signup, Login } from "../controllers/authController.js"
import{ validation }from "../middlewares/inputValidation.js"

const router = express.Router()

router.use(validation)
router.post("/register", Signup)
router.post("/login", Login)

export default router;