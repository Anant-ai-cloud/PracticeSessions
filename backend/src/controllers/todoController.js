import Todo from "../models/todo.model.js"
import User from "../models/user.model.js"

const createTodo = async (req, res) => {
    const { title, description, dueDate, category, completed } = req.body
    try {

        if (!title) return res.status(400).json({ message: "title is required and should be valid" })

        const userId = req.user._id

        const todo = await Todo.create({
            title,
            description,
            dueDate: new Date(dueDate),
            category,
            completed,
            user: userId

        })

        if (!todo) return res.status(400).json({ message: "Todo not created because of some issues" })

        return res.status(200).json({ message: "todo created successfully" })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }
}

const getUserTodos = async (req, res) => {
    try {
        const id = req.user._id
        const todos = await Todo.find({ user: id }).sort({ duedate: 1 }) //sorting is easy after indexing or duedate
        if (!todos) return res.status(400).json({ message: "no todo found" })
        return res.status(200).json(todos)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }
}
const getAdminTodos = async (req, res) => {
    try {
        const todos = await Todo.find({}).sort({ duedate: 1 })
        if (!todos) return res.status(400).json({ message: "no todo found" })

        return res.status(200).json(todos)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }
}

const editTodo = async (req, res) => {
    const { title, description } = req.body
    try {

        if (!title && !description) return res.status(400).json({ message: "all  field are required" })

        const todoId = req.params.id
        const userId = (req.user._id).toString()
        console.log(userId)
        const role = req.user.role

        const todo = await Todo.findById(todoId)
        if (!todo) return res.status(400).json({ message: "todo not found" })

        const todoUserId = (todo.user).toString()
        console.log(todoUserId)

        if (role === "user") {
            if (todoUserId == userId) {
                const updatedtodo = await Todo.findByIdAndUpdate(
                    todoId,
                    {
                        $set: {
                            title: title ? title : todo.title,
                            description: description ? description : todo.description
                        }
                    },
                    { new: true }

                )

                return res.status(200).json(updatedtodo, "todo updated successfully")
            } else {
                return res.status(400).json({ message: "User can edit their own todo only" })
            }

        }

        const updatedtodo = await Todo.findByIdAndUpdate(
            todoId,
            {
                $set: {
                    title: title ? title : todo.title,
                    description: description ? description : todo.description
                }
            },
            { new: true }
        ).select("-password")

        return res.status(200).json(updatedtodo, "todo updated successfully")



    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })

    }
}

const deleteTodo = async (req, res) => {

    try {

        const todoId = req.params.id
        const userId = (req.user._id).toString()
        const role = req.user.role

        const todo = await Todo.findById(todoId)
        if (!todo) return res.status(400).json({ message: "todo not found" })

        const todoUserId = (todo.user).toString()

        if (role === "user") {
            if (userId === todoUserId) {

                const deleted = await Todo.findByIdAndDelete(todoId)
                if (!deleted) return res.status(400).json({ message: "can'nt delete the todo due to some issue" })
                return res.status(200).json({ message: "Todo deleted successfully" })
            } else {
                return res.status(400).json({ message: "user can delete their own todo only" })
            }
        }

        const deleted = await Todo.findByIdAndDelete(todoId)
        if (!deleted) return res.status(400).json({ message: "can't delete the todo due to some issue" })

        return res.status(200).json({ message: "Todo deleted successfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({ createdAt: 1 })

        if (!users) return res.status(400).json({ message: "Unable to find users" })

        return res.status(200).json(users)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }
}

const changeUserStatus = async (req, res) => {
    try {

        const userId = req.params.id
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            [
                {
                    $set: {
                        role: {
                            $cond: {
                                if: { $eq: ["$role", "user"] },
                                then: "admin",
                                else: "user"
                            }
                        }
                    }
                },
            ],
            { new: true, updatePipeline: true }
        ).select("-password")
        if (!updatedUser) return res.status(400).json({ message: "User's status cannot get edited" })

        return res.status(200).json(updatedUser, "User's status edited successfully")

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }

}

const todoCompleted = async (req, res) => {
    try {
        const todoId = req.params.id
        const userId = (req.user.id).toString()
        const todo = await Todo.findById(todoId)
        const todoUserId = (todo.user).toString()
        const role = req.user.role

        if (role === "user") {
            if (userId === todoUserId) {
                const updatedTodo = await Todo.findByIdAndUpdate(
                    todoId,
                    {
                        $set: {
                            completed: true
                        }
                    },
                    { new: true }
                )
                if (!updatedTodo) return res.status(400).json({ message: "unable to find todo" })

                return res.status(200).json(updatedTodo)
            } else {
                return res.status(400).json({ message: "user can mark only their own todo" })
            }

        }
        const updatedTodo = await Todo.findByIdAndUpdate(
            todoId,
            {
                $set: {
                    completed: true
                }
            },
            { new: true }
        )
        if (!updatedTodo) return res.status(400).json({ message: "unable to find todo" })

        return res.status(200).json(updatedTodo)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }
}

const getCompletedTodos = async (req, res) => {
    try {

        const userId = req.user.id
        const role = req.user.role

        if (role === "user") {

            const completedTodos = await Todo.find({ user: userId, completed: true })

            if (!completedTodos) return res.status(400).json({ message: "no todo is completed" })

            return res.status(200).json(completedTodos)
        }

        const completedTodos = await Todo.find({ completed: true })
        if (!completedTodos) return res.status(400).json({ message: "no todo is completed" })
        return res.status(200).json(completedTodos)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: " internal server error " })
    }
}

const getUrgentTodos = async (req, res) => {
    try {

        const role = req.user.role
        const userId = (req.user.id).toString()
        const urgentTodos = await Todo.find({ category: "urgent" })
        if (urgentTodos.length === 0) return res.status(400).json({ message: "no urgent todos found" })

        if (role === "user") {

            const myUrgentTodos = []

            for (let i = 0; i < urgentTodos.length; i++) {

                const todoUserId = (urgentTodos[i].user).toString()
                if (userId === todoUserId) {
                    myUrgentTodos.push(urgentTodos[i])
                }
            }

            if (myUrgentTodos.length === 0) return res.status(400).json({ message: "You have no urgent todos" })

            return res.status(200).json(myUrgentTodos)

        }

        return res.status(200).json(urgentTodos)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }
}

const getNonUrgentTodos = async (req, res) => {
    try {
        const role = req.user.role
        const userId = (req.user.id).toString()
        const nonUrgentTodos = await Todo.find({ category: "non-urgent" })

        if (nonUrgentTodos.length === 0) return res.status(200).json({ message: "no non-urgent todos found" })

        if (role === "user") {

            const myNonUrgentTodos = []

            for (let i = 0; i < nonUrgentTodos.length; i++) {
                const todoUserId = (nonUrgentTodos[i].user).toString()
                if (userId === todoUserId) {
                    myNonUrgentTodos.push(nonUrgentTodos[i])
                }
            }
            if (myNonUrgentTodos.length === 0) return res.status(400).json({ message: "You have no non-urgent todos" })

            return res.status(200).json(myNonUrgentTodos)
        }

        return res.status(200).json(nonUrgentTodos)


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }
}

const deleteUser = async (req, res) => {
    try {

        const userId = req.params.id
        const deletedUser = await User.findByIdAndDelete(userId)
        if (!deletedUser) return res.status(400).json({ message: "some issue occur while deleting the user" })
        return res.status(200).json({ message: "user deleted successfully" })
      } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }
}



export {
    createTodo,
    getUserTodos,
    getAdminTodos,
    editTodo,
    deleteTodo,
    getAllUsers,
    changeUserStatus,
    todoCompleted,
    getCompletedTodos,
    getUrgentTodos,
    getNonUrgentTodos,
    deleteUser

}