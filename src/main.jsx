import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'

import App from './App.jsx'
import Login from './routes/Login'
import Home from './routes/Home'
import SignUp from './routes/SignUp'
import Error from './routes/Error';


const router = createBrowserRouter([
  {
    path : '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path:'/',
        element: <Home />
      },
      {
        path:'login',
        element:<Login />
      },
      {
        path:'signup',
        element:<SignUp />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
