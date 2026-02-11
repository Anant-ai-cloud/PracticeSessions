import Todo from "../models/todo.model.js"

const createTodo = async(req, res)=>{
     const { title, description, dueDate, category, completed } = req.body
    try {
       
     if(!title) return res.status(400).json({ message: "title is required and should be valid" })

        const userId = req.user._id
      
     const todo = await Todo.create({
            title,
            description,
            dueDate: new Date(dueDate),
            category,
            completed,
            user: userId

        })

        if(!todo) return res.status(400).json({message: "Todo not created because of some issues"})

        return res.status(200).json({message: "todo created successfully"})

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "internal server error"})
    }
}

const getUserTodos = async(req, res)=>{
    try {
        const id = req.user._id
       const todos = await Todo.find({user: id}).sort({ duedate: 1 }) //sorting is easy after indexing or duedate
       if(!todos) return res.status(400).json({message: "no todo found"})
        return res.status(200).json( todos )
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "internal server error"})
    }
}
const getAdminTodos= async(req,res)=>{
    try {
        const todos = await Todo.find({}).sort({ duedate: 1 })
        if(!todos) return res.status(400).json({message: "no todo found"})

        return res.status(200).json( todos )
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }
}

const editUserTodo = async(req, res)=>{
    try {
        
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "internal server error"})
        
    }
}

const editAnyTodo = async(req, res)=>{
    try {
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "internal server error"})
    }
}


export {
    createTodo,
    getUserTodos,
    getAdminTodos
}