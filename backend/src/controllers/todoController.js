import Todo from "../models/todo.model.js"

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
    try {

        const { title, description } = req.body


        if (!title && !description) return res.status(400).json({ message: "all  field are required" })
        
        const todoId = req.params.id
        const userId = req.user._id
        console.log(userId)
        const role = req.user.role
        const todo = await Todo.findById(todoId)
        const todoUserId = (todo.user).toString()
        console.log(todoUserId)

        if (role === "user") {
            if (todoUserId == userId) {

               const updatedtodo =  await Todo.findByIdAndUpdate(
                    todoId,
                    {
                        $set: {
                            title: title? title: todo.title,
                            description: description? description: todo.description
                        }
                    },
                    { new: true }

                ).select("-password")

                return res.status(200).json(updatedtodo, "todo updated successfully")
            } else {
                return res.status(400).json({ message: "User can edit their own todo only" })
            }

        }

       const updatedtodo = await Todo.findByIdAndUpdate(
           todoId,
           {
             $set: {
                title: title? title: todo.title,
                description: description? description: todo.description 
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



export {
    createTodo,
    getUserTodos,
    getAdminTodos,
    editTodo
}