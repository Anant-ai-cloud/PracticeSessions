import express from "express"
import { Signup, Login, Logout, deleteAccount } from "../controllers/authControllers.js"
import verifyJwt from "../middlewares/verifyJwt.js"

const router = express.Router()

router.post("/signup", Signup)
router.post("/login", Login)
router.post("/logout", verifyJwt, Logout)
router.post("/deleteaccount", verifyJwt, deleteAccount)

export default router;