import { fillTodos, setLoading, fillUsers } from "../store/todoSlice.js";
import toast from "react-hot-toast";
import axiosInstance from "./axios.js";
import { useSelector } from "react-redux";

export const getUserTodos = () => async (dispatch) => {
    try {
        const res = await axiosInstance.get("/user/todos")
        if (!res) console.log("Some problem occurred")

        dispatch(fillTodos(res.data))


    } catch (error) {
        toast.error("Network Issue")
    } finally {
        dispatch(setLoading(false))
    }
}

export const getUrgentTodos = () => async (dispatch) => {
    try {
        const res = await axiosInstance.get("/urgent/todos")
        if (!res) console.log("Some Problem occurred")

        dispatch(fillTodos(res.data))
        console.log(res.data)

    } catch (error) {
        toast.error("Network Issue")
    } finally {
        dispatch(setLoading(false))
    }
}

export const getNonUrgentTodos = () => async (dispatch) => {
    try {
        const res = await axiosInstance.get("/non-urgent/todos")
        if (!res) console.log("Problem Occurred in get non urgent thunk")

        dispatch(fillTodos(res.data))
    } catch (error) {
        toast.error("Network Issue")
    } finally {
        dispatch(setLoading(false))
    }
}

export const getCompletedTodos = () => async (dispatch) => {
    try {
        const res = await axiosInstance.get("/completed/todos")
        if (!res) console.log("Problem Occurred in get completed thunk")

        dispatch(fillTodos(res.data))

    } catch (error) {
        toast.error("Network issue")
    } finally {
        dispatch(setLoading(false))
    }
}

export const markCompleted = (id) => async (dispatch) => {
    try {
        console.log(id)
        const res = await axiosInstance.patch(`/completed/todo/${id}`)
        if (!res) console.log("Can't get updated todo")


        console.log(res.data.completed)

    } catch (error) {

        toast.error(error.response?.data?.message || "Can't mark it completed")

    } finally {

        dispatch(setLoading(false))

    }
}

export const deleteTodo = (id) => async (dispatch, getState) => {
    try {
        const res = await axiosInstance.delete(`/todos/${id}`)

        if (!res) console.log("Can't delete Todo")
        const state = getState()

        const oldTodos = state.todo.todos
        const todoId = res.data.todo._id

        const newTodos = oldTodos.filter(todo => todo._id != todoId)

        dispatch(fillTodos(newTodos))

        toast.success(res.data?.message)

    } catch (error) {

        toast.error(error.response?.data?.message)

    }
}

export const createTodo = (data) => async (dispatch) => {
    try {
        const res = await axiosInstance.post("/todos", data)

        if (!res) console.log(" Some error occurred in create Todo ")

        toast.success("Todo Created Successfully")
        return res.data
    } catch (error) {
        toast.error(error.response?.data?.message || "Can't Create Todo")
    }
}

export const updateTodo = (data, id) => async (dispatch, getState) => {
    try {
       console.log("Update todo Thunk")
        const res = await axiosInstance.put(`/todos/${id}`, data)
        if (!res) console.log("error occurred in updateTodo")

        const state = getState()
        const todos = state.todo.todos

        console.log(res.data?.todo)
        const updatedTodo = res.data.todo
        const newTodos = todos.map((todo) => {
            if (todo._id === updatedTodo._id) {
                return {
                    ...todo,
                    title: updatedTodo.title,
                    description: updatedTodo.description
                }
            }
            return todo
        })

        dispatch(fillTodos(newTodos))
        console.log(newTodos)

        toast.success("Todo updated Successfully")

    } catch (error) {
        toast.error(error.response?.data?.message)
    }
}

export const adminTodos = ()=> async (dispatch) =>{
    try {

        const res = await axiosInstance.get("/admin/todos")
        
        if(!res) console.log("Some error occurred in get admin todos")
        dispatch(fillTodos(res.data))

    } catch (error) {
        toast.error("Network issue")
    } finally{
        dispatch(setLoading(false))
    }
}

export const getAllUsers = ()=> async(dispatch)=>{
    try {

        const res = await axiosInstance.get("/admin/users")
        if(!res) console.log("Some error Occurred in getAllUsers")
        dispatch(fillUsers(res.data))
        dispatch(fillTodos(null))

    } catch (error) {
        toast.error("Network Issue")
        
    }finally{
        dispatch(setLoading(false))
    }
}

export const changeUserStatus = (id)=> async(dispatch, getState)=>{
    try {
        
        const res = await axiosInstance.patch(`/admin/users/${id}`)
        if(!res) console.log("some error occurred in changeUserStatus")
        
        const state = getState()
        const users = state.todo.users
        const updatedUser = res.data

        const newUsers = users.map((user)=>{
              if(user._id === updatedUser._id){
                return {
                    ...user,
                    role: updatedUser.role
                }
              }
              return user

        }
        )

        dispatch(fillUsers(newUsers))
        toast.success("User status changed successfully")
        

    } catch (error) {
        toast.error("Network issue")
    }finally{
        dispatch(setLoading(false))
    }
}

export const removeUser= (id)=> async(dispatch, getState)=>{
    try {

        const res = await axiosInstance.delete(`/admin/user/${id}`)
        if(!res) console.log("Some error in remove user")
        
        const state = getState()
        const deletedUser = res.data.deletedUser
        console.log(deletedUser)
        const users = state.todo.users

        const newUsers = users.filter((user)=> user._id !== deletedUser._id)

        dispatch(fillUsers(newUsers))
        toast.success(res.data?.message)
    } catch (error) {
        toast.error("Network issue")
    }finally{
        dispatch(setLoading(false))
    }
}
