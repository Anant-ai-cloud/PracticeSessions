import { setLogging, login, logout } from "../store/authSlice";
import toast from "react-hot-toast"
import axiosInstance from "./axios.js";

export const loginUser = (credentials)=> async(dispatch)=>{
    dispatch(setLogging(true))
    try {
        const res = await axiosInstance.post("/auth/login", credentials)

        if(!res)  console.log("some error occured") 
         
       
        dispatch(login({ userData: res.data }))
        toast.success("Logged in successfully")

        
    } catch (error) {
        console.log(error.response?.data)
        toast.error(error.response?.data?.message || "Login failed")
        
    }finally{
        dispatch(setLogging(false))
    }
}
export const logoutUser = ()=>(dispatch)=>{
    try {
        dispatch(logout())
        toast.success("loggedout successfully")
    } catch (error) {
        toast.error(error.message)
    }

}