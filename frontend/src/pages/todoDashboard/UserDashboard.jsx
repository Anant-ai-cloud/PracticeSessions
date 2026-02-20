import React from 'react'
import { logoutUser } from '../../setUp/authThunks.js'
import { useDispatch } from 'react-redux'

function UserDashboard() {

  const dispatch = useDispatch()

  const logout = ()=>{
    dispatch(logoutUser())

  }
  return (
    <>  
      <div>
      UserDashboard
    </div>
    <button className='btn bg-gray-400 rounded-md text-black' onClick={logout}>Logout</button>
    </>

  )
}

export default UserDashboard
