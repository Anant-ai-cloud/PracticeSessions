import { setLogging, login, logout } from "../store/authSlice";
import toast from "react-hot-toast"
import axiosInstance from "./axios.js";

export const loginUser = (credentials)=> async(dispatch)=>{
    
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
        toast.success("logged out successfully")
    } catch (error) {
        toast.error(error.message)
    }

}

export const loggedIn = ()=> async(dispatch)=>{
   
    try {

        const res = await axiosInstance.get("/auth/check")
        if(!res) toast.error("Can't authenticated you")
        
        dispatch(login({userData: res.data}))
        
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }finally{
        dispatch(setLogging(false))
    }
}