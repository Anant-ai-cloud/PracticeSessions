import react, { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"


function App() {

 const [ Dark, setDark ] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches)
 console.log(Dark)

  // useEffect(()=>{

  // }, [theme])
  
  return (
    <>
    <div>
    <Outlet/>
    </div>
    
      
    </>
  )
}

export default App
