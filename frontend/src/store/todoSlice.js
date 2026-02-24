import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    istodoLoading: true,
    todos: null,
    
}

const todoSlice = createSlice({
   
    name: "todo",
    initialState,
    reducers: {

        setLoading:( state, action)=>{

             state.istodoLoading = action.payload
        },

        fillTodos: (state, action)=>{

            state.todos = action.payload
        },
      
    }


})

export const {setLoading, fillTodos } = todoSlice.actions
export default todoSlice.reducer