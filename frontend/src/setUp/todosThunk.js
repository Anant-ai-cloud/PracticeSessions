import { fillTodos, setLoading, setCompleted } from "../store/todoSlice.js";
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

        dispatch(setCompleted(res.data.completed))
        console.log(res.data.completed)

    } catch (error) {

        toast.error(error.response?.data?.message ||  "Can't mark it completed")

    }finally{

        dispatch(setLoading(false))

    }
}