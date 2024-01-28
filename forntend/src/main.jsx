import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './context/AuthProvider.jsx'

import App from './App.jsx'
import Login from './routes/Login'
import Home from './routes/Home'
import SignUp from './routes/SignUp'
import Error from './routes/Error';
import Dashboard from './routes/Dashboard.jsx'
import DashBarHome from './components/DashBarHome.jsx'
import DashBarTemp from './components/DashBarTemp.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import Account from './components/Account.jsx'
import ResetPassword from './components/ResetPassword.jsx'
import { ErrorProvider } from './context/ErrorProvider.jsx'


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
      },
      {
        path:'reset_password',
        element:<ResetPassword />
      },
      {
        path:'auth',
        element:<RequireAuth />,
        children:[
          {
            path : 'dashboard',
            element : <Dashboard />,
            children: [
              {
                path: '',
                element:<DashBarHome />,
              },
              {
                path:'template',
                element:<DashBarTemp />
              },
              {
                path:'account',
                element:<Account />
              }
            ]
          },
        ]
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ErrorProvider>
        <RouterProvider router={router} />
      </ErrorProvider>
    </AuthProvider>
  </React.StrictMode>,
)
