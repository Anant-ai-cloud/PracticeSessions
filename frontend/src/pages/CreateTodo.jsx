import React from 'react'
import { useSelector } from "react-redux"

function CreateTodo() {

  const user = useSelector((state)=> state.auth.userData)
  const isLogging = useSelector((state)=> state.isLogging)
 
  return user? (
   <div>
    {user.username}
   </div>
  
  ): ( <div> not found </div> )
  
}

export default CreateTodo
