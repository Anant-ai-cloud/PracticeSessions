import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUserTodos, getUrgentTodos, getNonUrgentTodos, getCompletedTodos, markCompleted } from '../../setUp/todosThunk.js'
import { useSelector } from 'react-redux'

function UserDashboard() {

  const dispatch = useDispatch()
  const [checked, setChecked] = useState(false)

  const todos = useSelector((state) => state.todo.todos)

  const category = (value) => {

    if (value === "urgent") {
      dispatch(getUrgentTodos())
    } else if (value === "non-urgent") {
      dispatch(getNonUrgentTodos())
    } else if (value === "all") {
      dispatch(getUserTodos())
    } else if (value === "completed") {
      dispatch(getCompletedTodos())
    }


  }

  const formatDate = (iso) => {
    const date = new Date(iso)
    const formatted = String(date.getDate()).padStart(2, "0") + "/" + String(date.getMonth() + 1).padStart(2, "0") + "/" + date.getFullYear()
    return formatted

  }

  const completed = (id) => {


    console.log("Completed")


    dispatch(markCompleted(id))


  }


  useEffect(() => {
    dispatch(getUserTodos())

  }, [])



  return todos ? (

    <div>
      <select className="select m-5" onChange={(e) => category(e.target.value)}>
        <option value="all">All</option>
        <option value="urgent">Urgent</option>
        <option value="non-urgent">Non-Urgent</option>
        <option value="completed">Completed</option>
      </select>

      <div className='flex flex-wrap justify-center '>
        {
          todos.map((todo) =>
            <div className={`card ${todo.completed ? "bg-green-300 text-black" : "bg-primary  text-primary-content"}   w-96 m-4`} key={todo._id}>
              <div className="card-body">
                <div className='flex justify-between'>
                  <h2 className="card-title">{todo.title}</h2>
                  {todo.completed ?
                    <input type="checkbox" className="checkbox border-2 border-black text-black" disabled defaultChecked /> :
                    <input type="checkbox" className="checkbox border" onClick={(e) => { e.target.classList.add("bg-green-300", "text-black") }} onChange={(e) => {
                      const isChecked = e.target.checked
                      setChecked(isChecked)
                      if (isChecked) {
                        e.target.disabled = true
                        completed(todo._id)

                      }
                    }} />

                  }
                </div>

                {todo.description ? <p>{todo.description}</p> : ""}

                <div className="card-actions justify-end">
                  {todo.dueDate?  <button className="btn">{formatDate(todo.dueDate)}</button>: undefined}
                 
                </div>
              </div>
            </div>

          )
        }
      </div>
    </div>
  ) : <div> Loading</div>
}

export default UserDashboard
