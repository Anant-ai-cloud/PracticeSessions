import react, { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"


function App() {

  // window.matchMedia("(prefers-color-scheme: dark)").matches    fetches mode from browser
 
  
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
