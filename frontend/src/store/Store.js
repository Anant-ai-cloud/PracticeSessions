import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js"

const store = configureStore({
    reducer:{

        auth:authReducer   //slice:it's Reducer     (2nd time practice)
    }
})

export default store
