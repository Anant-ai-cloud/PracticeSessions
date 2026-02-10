import express from "express"
import { getUserTodos, getAdminTodos } from "../controllers/todoController.js"
import verifyJwt from "../middlewares/verifyJwt.js"

const router = express.Router()

router.use(verifyJwt) 

router.get("user/todos", getUserTodos)
router.get("admin/todos", getAdminTodos)

export default router;
