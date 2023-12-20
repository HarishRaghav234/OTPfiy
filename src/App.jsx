
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Error from './pages/Error';


const router = createBrowserRouter([
  {
    path: "/",
    element:<Home />,
    errorElement:<Error />
  },
  {
    path: "login",
    element:<Login />
  },
  {
    path: "signup",
    element:<SignUp />
  },
  {
    path: "signup",
    element:<SignUp />
  },
])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
