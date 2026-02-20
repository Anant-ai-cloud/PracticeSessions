import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js"

import { persistStore, persistReducer } from "redux-persist"


const store = configureStore({
  reducer: {

    auth: authReducer   //slice:it's Reducer     (2nd time practice)
  }

})



export default store
