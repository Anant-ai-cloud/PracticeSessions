import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUserTodos, getUrgentTodos, getNonUrgentTodos, getCompletedTodos, markCompleted, deleteTodo, updateTodo } from '../../setUp/todosThunk.js'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

function UserDashboard() {

  const dispatch = useDispatch()
  const [checked, setChecked] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState(null)

  const { register, handleSubmit, setValue } = useForm()


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
  const openModal = (todo) => {
    setSelectedTodo(todo)
    setValue("title", todo.title)
    setValue("description", todo.description)
    document.getElementById('my_modal_1').showModal()

  }
  const handleUpdate = (data) => {
    console.log(data)
  }

  const formatDate = (iso) => {
    const date = new Date(iso)
    const formatted = String(date.getDate()).padStart(2, "0") + "/" + String(date.getMonth() + 1).padStart(2, "0") + "/" + date.getFullYear()
    return formatted

  }

  const completed = (id) => {

    dispatch(markCompleted(id))
  }

  const remove = (id) => {
    dispatch(deleteTodo(id))

  }
  //TODO: handle update functionality with register


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

        <dialog id="my_modal_1">
          <div className='flex gap-6'>
           <button className='btn text-white' onClick={()=> document.getElementById("my_modal_1").close()}>X</button>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <div>
            <label htmlFor="title">Title</label>
         
            <input id='title' {...register("title")} />
            </div>
           <div>
           <label htmlFor="description"> Description </label>
            <input id='description' {...register("description")} />
            </div>
            <button type="submit">Update</button>
          </form>
          </div>
        </dialog>

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
                <div className='flex justify-between'>
                  <div>
                    <svg viewBox="-0.5 0 19 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000" className='w-[25px]' onClick={() => remove(todo._id)}><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>icon/18/icon-delete</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="out" stroke="none" strokeWidth="1" fill="0" fillRule="evenodd" sketch:type="MSPage"> <path d="M4.91666667,14.8888889 C4.91666667,15.3571429 5.60416667,16 6.0625,16 L12.9375,16 C13.3958333,16 14.0833333,15.3571429 14.0833333,14.8888889 L14.0833333,6 L4.91666667,6 L4.91666667,14.8888889 L4.91666667,14.8888889 L4.91666667,14.8888889 Z M15,3.46500003 L12.5555556,3.46500003 L11.3333333,2 L7.66666667,2 L6.44444444,3.46500003 L4,3.46500003 L4,4.93000007 L15,4.93000007 L15,3.46500003 L15,3.46500003 L15,3.46500003 Z" id="path" fill="#000000" sketch:type="MSShapeGroup"> </path> </g> </g></svg>

                    <svg viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"


                      onClick={() => document.getElementById("updatemodal").showModal()}

                    ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M17.7 5.12758L19.266 6.37458C19.4172 6.51691 19.5025 6.71571 19.5013 6.92339C19.5002 7.13106 19.4128 7.32892 19.26 7.46958L18.07 8.89358L14.021 13.7226C13.9501 13.8037 13.8558 13.8607 13.751 13.8856L11.651 14.3616C11.3755 14.3754 11.1356 14.1751 11.1 13.9016V11.7436C11.1071 11.6395 11.149 11.5409 11.219 11.4636L15.193 6.97058L16.557 5.34158C16.8268 4.98786 17.3204 4.89545 17.7 5.12758Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12.033 7.61865C12.4472 7.61865 12.783 7.28287 12.783 6.86865C12.783 6.45444 12.4472 6.11865 12.033 6.11865V7.61865ZM9.23301 6.86865V6.11865L9.23121 6.11865L9.23301 6.86865ZM5.50001 10.6187H6.25001L6.25001 10.617L5.50001 10.6187ZM5.50001 16.2437L6.25001 16.2453V16.2437H5.50001ZM9.23301 19.9937L9.23121 20.7437H9.23301V19.9937ZM14.833 19.9937V20.7437L14.8348 20.7437L14.833 19.9937ZM18.566 16.2437H17.816L17.816 16.2453L18.566 16.2437ZM19.316 12.4937C19.316 12.0794 18.9802 11.7437 18.566 11.7437C18.1518 11.7437 17.816 12.0794 17.816 12.4937H19.316ZM15.8863 6.68446C15.7282 6.30159 15.2897 6.11934 14.9068 6.2774C14.5239 6.43546 14.3417 6.87397 14.4998 7.25684L15.8863 6.68446ZM18.2319 9.62197C18.6363 9.53257 18.8917 9.13222 18.8023 8.72777C18.7129 8.32332 18.3126 8.06792 17.9081 8.15733L18.2319 9.62197ZM8.30001 16.4317C7.8858 16.4317 7.55001 16.7674 7.55001 17.1817C7.55001 17.5959 7.8858 17.9317 8.30001 17.9317V16.4317ZM15.767 17.9317C16.1812 17.9317 16.517 17.5959 16.517 17.1817C16.517 16.7674 16.1812 16.4317 15.767 16.4317V17.9317ZM12.033 6.11865H9.23301V7.61865H12.033V6.11865ZM9.23121 6.11865C6.75081 6.12461 4.7447 8.13986 4.75001 10.6203L6.25001 10.617C6.24647 8.96492 7.58269 7.62262 9.23481 7.61865L9.23121 6.11865ZM4.75001 10.6187V16.2437H6.25001V10.6187H4.75001ZM4.75001 16.242C4.7447 18.7224 6.75081 20.7377 9.23121 20.7437L9.23481 19.2437C7.58269 19.2397 6.24647 17.8974 6.25001 16.2453L4.75001 16.242ZM9.23301 20.7437H14.833V19.2437H9.23301V20.7437ZM14.8348 20.7437C17.3152 20.7377 19.3213 18.7224 19.316 16.242L17.816 16.2453C17.8195 17.8974 16.4833 19.2397 14.8312 19.2437L14.8348 20.7437ZM19.316 16.2437V12.4937H17.816V16.2437H19.316ZM14.4998 7.25684C14.6947 7.72897 15.0923 8.39815 15.6866 8.91521C16.2944 9.44412 17.1679 9.85718 18.2319 9.62197L17.9081 8.15733C17.4431 8.26012 17.0391 8.10369 16.6712 7.7836C16.2897 7.45165 16.0134 6.99233 15.8863 6.68446L14.4998 7.25684ZM8.30001 17.9317H15.767V16.4317H8.30001V17.9317Z" fill="#000000"></path> </g></svg>
                  </div>


                  <div key={todo._id}>
                    <p>{todo.title}</p>
                    <button onClick={() => openModal(todo)}>Edit</button>
                  </div>

                  <div className="card-actions justify-end">
                    {todo.dueDate ? <button className="btn">{formatDate(todo.dueDate)}</button> : undefined}

                  </div>
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
