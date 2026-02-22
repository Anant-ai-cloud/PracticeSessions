import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js"
import todoReducer from "./todoSlice.js"

import { persistStore, persistReducer } from "redux-persist"


const store = configureStore({
  reducer: {

    auth: authReducer ,  //slice(have state):it's Reducer     
    todo: todoReducer  
  
  }

})



export default store
