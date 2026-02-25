import { fillTodos, setLoading } from "../store/todoSlice.js";
import toast from "react-hot-toast";
import axiosInstance from "./axios.js";

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

export const markCompleted = (id)=> async(dispatch)=>{
    try {
      console.log(id)
        const res = await axiosInstance.patch(`/completed/todo/${id}`)
        if(!res) console.log("Can't get updated todo")

       
        console.log(res.data.completed)

    } catch (error) {

        toast.error(error.response?.data?.message ||  "Can't mark it completed")

    }finally{

        dispatch(setLoading(false))

    }
}

export const deleteTodo = (id)=> async(dispatch)=>{
    try {
        const res = await axiosInstance.post(`/todos/${id}`)
        if(!res) console.log("Can't delete Todo")
        
        toast.success("Todo deleted Successfully")
        
    } catch (error) {
        console.log("error in delete todo")
        toast.error(error.response?.data?.message)
    }
}

export const createTodo = (data)=> async(dispatch)=>{
    try {
        const res = await axiosInstance.post("/todos", data)

        if(!res) console.log(" Some error occurred in create Todo ")

        toast.success("Todo Created Successfully")
        return res.data
    } catch (error) {
        toast.error(error.response?.data?.message || "Can't Create Todo")
    }
}