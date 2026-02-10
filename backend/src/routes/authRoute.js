import express from "express"
import { Signup, Login } from "../controllers/authController.js"

const router = express.Router()

router.post("/register", Signup)
router.post("/login", Login)

export default router;