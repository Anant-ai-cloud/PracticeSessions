import { createSlice } from "@reduxjs/toolkit"



const initialState = {

    isLogging: true,
    status:    false,
    userData:  null
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        setLogging: (state, action)=>{

          state.isLogging = action.payload

        },

        login: (state, action) => {
          
            state.status=true,
            state.userData = action.payload.userData
           
         
        },
        logout: (state) => {
            state.status = false
            state.userData = null
        }
    }
})

export const { login, logout, setLogging } = authSlice.actions
export default authSlice.reducer 
