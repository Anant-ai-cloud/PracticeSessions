import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Pageloading from '../setUp/pageLoading.jsx'

function Authprotect({ children, authentication = true }) {

  const navigate = useNavigate()
  const authStatus = useSelector(state => state.auth.status)
  const [Loading, setLoading] = useState(true)
  const user = useSelector(state=> state.auth.userData)
 
 
  

  useEffect(() => {

   
    if (authentication && authStatus != authentication) navigate("/")
    else if (!authentication && authStatus != authentication) {
     if(user.role === "user") navigate("/usertodos")
     else navigate("/admindashboard")

    }
    setLoading(false)
    

  }, [navigate, authStatus, authentication])

  
  return Loading? <Pageloading/>: <> {children} </>
}

export default Authprotect
