import express from "express"
import { createTodo, getUserTodos, getAdminTodos, editTodo, deleteTodo, getAllUsers, changeUserStatus, todoCompleted, getCompletedTodos, getUrgentTodos, getNonUrgentTodos, deleteUser } from "../controllers/todoController.js"
import verifyJwt from "../middlewares/verifyJwt.js"
import checkingRole from "../middlewares/checkingRole.js"


const router = express.Router()

router.use(verifyJwt) 

//create
router.post("/todos", createTodo)

//view
router.get("/user/todos", getUserTodos)
router.get("/admin/todos", checkingRole, getAdminTodos)

//update
router.put("/todos/:id", editTodo )

//delete
router.delete("/todos/:id", deleteTodo)

//for admin get all users
router.get("/admin/users", checkingRole, getAllUsers)

//for admin change status
router.post("/admin/users/:id", checkingRole, changeUserStatus)

//mark todo as completed
router.patch("/completed/todo/:id", todoCompleted)

//get completed todo
 router.get("/completed/todos", getCompletedTodos)

 //get urgent todos
 router.get("/urgent/todos", getUrgentTodos)

 //get non urgent todos
 router.get("/non-urgent/todos", getNonUrgentTodos)

 //delete particular user
 router.delete("/admin/user/:id", checkingRole, deleteUser)



export default router;
