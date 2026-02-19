import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import AdminTodoDashboard from './pages/todoDashboard/AdminTodoDashboard.jsx'
import UserDashboard from './pages/todoDashboard/UserDashboard.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import CreateTodo from './pages/CreateTodo.jsx'
import Login from './pages/Login.jsx'
import Registration from './pages/Registration.jsx'
import store from './store/Store.js'
import { Provider } from "react-redux"
import Authprotect from './components/authProtect.jsx'
import { Toaster } from 'react-hot-toast'
import { persistor } from './store/Store.js'
import { PersistGate } from 'redux-persist/integration/react'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [

      {
        path: "/",
        element:

          <Authprotect authentication={true}>
            <CreateTodo />
          </Authprotect>

      },
      {
        path: "/signup",
        element:

          <Authprotect authentication={false}>
            <Registration />
          </Authprotect>

      },
      {
        path: "/login",
        element:

          <Authprotect authentication={false}>
            <Login />
          </Authprotect>

      },
      {
        path: "/usertodos",
        element:

          <Authprotect authentication={true}>
            <UserDashboard />
          </Authprotect>

      },
      {
        path: "/admintodos",
        element:

          <Authprotect authentication={true}>
            <AdminTodoDashboard />
          </Authprotect>

      },
      {
        path: "/admindashboard",
        element:

          <Authprotect authentication={true}>
            <AdminDashboard />
          </Authprotect>

      }
    ]
  }
])


//all pages have access of the store
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>

      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
      
      <Toaster />

    </Provider>



  </StrictMode>,
)
