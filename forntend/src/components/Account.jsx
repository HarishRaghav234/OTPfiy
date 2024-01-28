import { useContext, useState } from "react"
import UserContext from "../context/UserProvider"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { NavLink } from "react-router-dom"

const UPDATE_DB_URL = '/set_db_info'

const Account = () => {
    const { userInfo } = useContext(UserContext)
    const axiosPrivate = useAxiosPrivate();
    const [dbData, setDbData] = useState({
      host : userInfo.host,
      dbuser : userInfo.dbuser,
      dbpassword : userInfo.dbpassword,
      database : userInfo.database,
    })

    const handleFormData = (event) => {
      setDbData(perVal => ({
        ...perVal,
        [event.target.name]: event.target.value
    }))
    }

    const updateDB = async (event) => {
      event.preventDefault();
      const response  = await axiosPrivate.post(UPDATE_DB_URL,
        JSON.stringify({'host': dbData.host, 'dbuser': dbData.dbuser, 'dbpassword': dbData.dbpassword, 'database': dbData.database}),
        {
          headers: { "Content-Type": "application/json"},
          withCredentials: true,
        }
      )
      console.log(response)
    }
    console.log(dbData)
  return (
    <section>
      <div><h3 className=" text-3xl">Account Info</h3></div>
      <div className="p-5 mt-6">
        <div className=" grid md:grid-cols-5 grid-cols-1 py-2">
          <div className=" col-span-1 text-lg p-2">Email:</div>
          <div className=" col-span-2 text-lg border p-2 rounded-2xl font-bold bg-white/30">{userInfo.email}</div>
        </div>
        <div className=" grid md:grid-cols-5 grid-cols-1 py-2">
          <div className=" col-span-1 text-lg p-2">User API:</div>
          <div className=" col-span-2 text-lg border p-2 rounded-2xl font-bold bg-white/30">{userInfo.userAPI}</div>
        </div>
        <div className=" grid md:grid-cols-5 grid-cols-1 py-2 ">
          <div className=" col-span-1 text-lg p-2">Password:</div>
          <div className=" col-span-2 text-lg border p-2 rounded-2xl font-bold bg-white/30">{userInfo.userAPI}</div>
          <div className=" col-span-1 md:py-0 py-1">
            <NavLink replace to={'reset_password'}>
              <button className="border py-2 px-3 rounded-3xl">Change Password</button>
            </NavLink>
          </div>
        </div>
        <form onSubmit={updateDB} >
          <div className=" grid md:grid-cols-5 grid-cols-1 py-2 ">
            <div className=" col-span-1 text-lg p-2"><label htmlFor="">Host</label></div>
            <div className=" col-span-2 text-lg border p-2 rounded-2xl font-bold bg-white/30">
              <input onChange={handleFormData} className=" w-full focus:outline-none bg-transparent" type="text" placeholder="Not Set" value={dbData.host == '' ? '' : dbData.host } name="host" />
            </div>
          </div>
          <div className=" grid md:grid-cols-5 grid-cols-1 py-2 ">
            <div className=" col-span-1 text-lg p-2"><label htmlFor="">DataBase Name</label></div>
            <div className=" col-span-2 text-lg border p-2 rounded-2xl font-bold bg-white/30">
              <input onChange={handleFormData} className=" w-full focus:outline-none bg-transparent" type="text" placeholder="Not Set Yet" value={dbData.database == '' ? '' : dbData.database } name="database" />
            </div>
          </div>
          <div className=" grid md:grid-cols-5 grid-cols-1 py-2 ">
            <div className=" col-span-1 text-lg p-2"><label htmlFor="">DataBase UserName</label></div>
            <div className=" col-span-2 text-lg border p-2 rounded-2xl font-bold bg-white/30">
              <input onChange={handleFormData} className=" w-full focus:outline-none bg-transparent" type="text" placeholder="Not Set Yet" value={dbData.dbuser == '' ? '' : dbData.dbuser } name="dbuser" />
            </div>
          </div>
          <div className=" grid md:grid-cols-5 grid-cols-1 py-2 ">
            <div className=" col-span-1 text-lg p-2"><label htmlFor="">DataBase Password</label></div>
            <div className=" col-span-2 text-lg border p-2 rounded-2xl font-bold bg-white/30">
              <input onChange={handleFormData} className=" w-full focus:outline-none bg-transparent" type="text" placeholder="Not Set Yet" value={dbData.dbpassword == '' ? '' : dbData.dbpassword } name="dbpassword" />
            </div>
            <div className=" col-span-1 md:py-0 py-1"><button type="submit" className="border py-2 px-3 rounded-3xl">Upadate DataBase</button></div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Account
