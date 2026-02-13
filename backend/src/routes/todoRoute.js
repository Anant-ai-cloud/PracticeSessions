import express from "express"
import { createTodo, getUserTodos, getAdminTodos, editTodo, deleteTodo, getAllUsers, changeUserStatus } from "../controllers/todoController.js"
import verifyJwt from "../middlewares/verifyJwt.js"
import checkingRole from "../middlewares/checkingRole.js"


const router = express.Router()

router.use(verifyJwt) 

//create
router.post("/create/todo", createTodo)

//view
router.get("/user/todos", getUserTodos)
router.get("/admin/todos", checkingRole, getAdminTodos)

//update
router.patch("/update/:id", editTodo )

//delete
router.delete("/delete/:id", deleteTodo)

//for admin get all users
router.get("/admin/users", checkingRole, getAllUsers)

//for admin change status
router.post("/admin/updatestatus", checkingRole, changeUserStatus)


export default router;
