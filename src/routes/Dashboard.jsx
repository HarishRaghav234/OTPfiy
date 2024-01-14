import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"

const Dashboard = () => {
  return (
    <div className=" text-white text-center">
      <div className=" grid grid-cols-4">
        <div className=" col-span-1">
            <Sidebar />
        </div>
        <div className=" col-span-3">
            < Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
