import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter} from "react-router-dom" 
import AdminTodoDashboard from './pages/todoDashboard/AdminTodoDashboard.jsx'
import UserDashboard from './pages/todoDashboard/UserDashboard.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import CreateTodo from './pages/CreateTodo.jsx'
import Login from './pages/Login.jsx'
import Registration from './pages/Registration.jsx'

  const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/signup",
        element: <Registration/>
      }, 
      {
        path: "/login",
        element: <Login/>

      }, 
      {
        path: "/usertodos",
        element: <UserDashboard/>
      },
      {
        path: "/admintodos",
        element: <AdminTodoDashboard/>
      },
      {
        path: "/create",
        element: <CreateTodo/>
      },
      {
        path: "/admindashboard",
        element: <AdminDashboard/>
      }

    ]
    
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <RouterProvider router={router}/>
    
  </StrictMode>,
)
