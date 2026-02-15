import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./authSlice.js"

const store = configureStore({
    reducer: {
        auth: authReducers   //slice:it's reducer
    }
})

export default store;