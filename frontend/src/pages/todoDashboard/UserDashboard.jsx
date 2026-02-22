import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUserTodos } from '../../setUp/todosThunk.js'
import { useSelector } from 'react-redux'

function UserDashboard() {

  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todo.todos)

  const formatData = (iso)=>{
    const date = new Date(iso)
    const formatted = String(date.getDate()).padStart(2,"0")+ "/"+ String(date.getMonth() + 1).padStart(2, "0") + "/"+ date.getFullYear
    return formatted

  }
  


  useEffect(() => {
    dispatch(getUserTodos())

  }, [])



  return todos ? (

    <div>
      {
        todos.map((todo) =>
          <div className="card bg-primary text-primary-content w-96 m-4">
            <div className="card-body">
              <h2 className="card-title">{todo.title}</h2>
              { todo.description?   <p>{todo.description}</p>: "" }
            
              <div className="card-actions justify-end">
                <button className="btn">Buy Now</button>
              </div>
            </div>
          </div>

        )
      }
    </div>

  ) : <div> Loading</div>
}

export default UserDashboard
