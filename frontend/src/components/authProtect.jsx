import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Pageloading from '../setUp/pageLoading.jsx'

function Authprotect({ children, authentication = true }) {

  const navigate = useNavigate()
  const authStatus = useSelector(state => state.auth.status)
  console.log(authStatus)
  const user = useSelector(state=> state.auth.userData)
 
 
  

  useEffect(() => {

   
    if (authentication && authStatus != authentication) navigate("/")
    else if (!authentication && authStatus != authentication) {
     if(user.role === "user") navigate("/usertodos")
     else navigate("/admintodos")

    }
    

  }, [navigate, authStatus, authentication])

  
  return <> {children} </>
}

export default Authprotect
