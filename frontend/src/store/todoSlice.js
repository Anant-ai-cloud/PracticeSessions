import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    istodoLoading: true,
    todos: null,
    completed: false
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
        setCompleted: (state, action)=>{

            state.completed= action.payload
        }
    }


})

export const {setLoading, fillTodos, setCompleted } = todoSlice.actions
export default todoSlice.reducer