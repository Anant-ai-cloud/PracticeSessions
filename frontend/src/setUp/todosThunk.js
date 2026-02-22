import { fillTodos, setLoading } from "../store/todoSlice.js";
import toast from "react-hot-toast";
import axiosInstance from "./axios.js";

export const getUserTodos = ()=> async( dispatch)=>{
    try {
        const res = await axiosInstance.get("/user/todos")
        if(!res) console.log("Some problem occurred")
        
        dispatch(fillTodos(res.data))
        console.log(res.data)
        
    } catch (error) {
        toast.error("Network Issue")
    }finally {
        dispatch(setLoading(false))
    }
}