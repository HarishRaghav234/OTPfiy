import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import { UserProvider } from "../context/UserProvider"


const Dashboard = () => {
  return (
    <div className=" text-white text-center">
      <div className=" grid grid-cols-4">
        <div className=" md:col-span-1 col-span-4">
            <Sidebar />
        </div>
        <div className=" md:col-span-3 col-span-4">
          <UserProvider>
            < Outlet />
          </UserProvider>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
