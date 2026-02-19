import React from 'react'
import { logoutUser } from '../../setUp/authThunks.js'
import { useDispatch } from 'react-redux'

function AdminTodoDashboard() {

  const dispatch = useDispatch()
  const logout  = ()=>{
    dispatch(logoutUser())
  }

  return (
    <>    <div>
      AdminTodoDashboard
       
    </div>
    <button className='btn bg-gray-400 rounded-md text-black' onClick={logout}>Log out</button>
    </>

  )
}

export default AdminTodoDashboard
