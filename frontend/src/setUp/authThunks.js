import { setLogging, login, logout } from "../store/authSlice";
import toast from "react-hot-toast"
import axiosInstance from "./axios.js";


export const signupUser = (credentials) => async (dispatch) => {
    try {
        const res = await axiosInstance.post("/auth/register", credentials)

        if (!res) console.log("Some problem occured")

        dispatch(login({ userData: res.data }))
        toast.success("Signed up successfully")

    } catch (error) {
        toast.error(error.response?.data?.message || "Signup failed")
    } finally {
        dispatch(setLogging(false))
    }
}

export const loginUser = (credentials) => async (dispatch) => {

    try {
        const res = await axiosInstance.post("/auth/login", credentials)

        if (!res) console.log("some error occured")


        dispatch(login({ userData: res.data }))
        toast.success("Logged in successfully")


    } catch (error) {

        toast.error(error.response?.data?.message || "Login failed")

    } finally {
        dispatch(setLogging(false))
    }
}
export const logoutUser = () => async (dispatch) => {
    try {
        const res = await axiosInstance.post("/auth/logout")
        if (!res) console.log("some issue occured during log out")

        console.log(res.data?.message)

        dispatch(logout())
        toast.success(res.data?.message)


    } catch (error) {
        toast.error(error.response?.data?.message)
    }

}

export const loggedIn = () => async (dispatch) => {

    try {

        const res = await axiosInstance.get("/auth/check")
        if (!res) toast.error("Can't authenticated you")

        dispatch(login({ userData: res.data }))

    } catch (error) {
        console.log(error)
       
    } finally {
        dispatch(setLogging(false))
    }
}