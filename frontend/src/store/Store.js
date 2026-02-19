import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js"

import {persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistConfig = {

    key: "root",
    storage,
    whitelist: ["auth"],  //will persist only auth slice
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    // reducer:{

    //     auth:authReducer   //slice:it's Reducer     (2nd time practice)
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>
            getDefaultMiddleware({
            serializableCheck: false
              })
    
})

export const persistor = persistStore(store)

export default store
