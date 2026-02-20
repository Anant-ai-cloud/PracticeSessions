import react, { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import { useDispatch } from "react-redux"
import { loggedIn } from "./setUp/authThunks.js"
import { useSelector } from "react-redux"
import Pageloading from "./setUp/pageLoading.jsx"

function App() {

  // window.matchMedia("(prefers-color-scheme: dark)").matches    fetches mode from browser
  const dispatch = useDispatch()
  const loading = useSelector((state)=> state.auth.isLogging)

  useEffect(()=>{
    dispatch(loggedIn())
    
  },[])

  if(loading) return <Pageloading/>

 
  
  return (
    <>
    <div>
    <Navbar/>
    <Outlet/>
    </div>
    
      
    </>
  )
}

export default App
