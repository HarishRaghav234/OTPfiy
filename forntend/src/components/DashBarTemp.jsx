import { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import UserContext from "../context/UserProvider";
const SET_TEMPLATE = '/set_template'

const DashBarTemp = () => {
  const axiosPrivate = useAxiosPrivate();
  const {userInfo} = useContext(UserContext)
  const [temp, setTemp] = useState(userInfo.template)

  const requestChange = async () => {
    try{
      const response = await axiosPrivate.put(SET_TEMPLATE,
        JSON.stringify({'templateid':temp}),
        {
          headers: { "Content-Type": 'application/json'},
          withCredentials: true,  
        }
      )
    console.log(response)
    }catch(error){console.log(error)}
  }

  const setTemplate = (event) => {
    setTemp(Number(event.target.name))
  } 
  useEffect(() => {
   requestChange() 
  },[temp])

  return (
    <div>
      <div>Choose Your Template</div>
      <div>Current Template id:{temp}</div>
      <div className=" grid grid-cols-2 py-10 overflow-scroll">
            <div className=" col-span-2 md:col-span-1">
              <div className="p-5">
                <div className={`w-full h-52 rounded-3xl bg-[url(/Images/mail1.png)] bg-cover mx-auto`}>
                  <div className="text-black hover:bg-black/40 w-full h-full flex justify-center group">
                    <button onClick={setTemplate} name="1" className="w-full hidden group-hover:block">set as Default</button>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className={`w-full h-52 rounded-3xl bg-[url(/Images/mail1.png)] bg-cover mx-auto`}>
                  <div className="text-black hover:bg-black/40 w-full h-full flex justify-center group">
                    <button onClick={setTemplate} name="3" className="w-full hidden group-hover:block">set as Default</button>
                  </div>
                </div>
              </div>
            </div>
            <div className=" col-span-2 md:col-span-1">
              <div className="p-5">
                <div className={`w-full h-52 rounded-3xl bg-[url(/Images/mail1.png)] bg-cover mx-auto`}>
                  <div className="text-black hover:bg-black/40 w-full h-full flex justify-center group">
                    <button onClick={setTemplate} name="2" className="w-full hidden group-hover:block">set as Default</button>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className={`w-full h-52 rounded-3xl bg-[url(/Images/mail1.png)] bg-cover mx-auto`}>
                  <div className="text-black hover:bg-black/40 w-full h-full flex justify-center group">
                    <button onClick={setTemplate} name="4" className="w-full hidden group-hover:block">set as Default</button>
                  </div>
                </div>
              </div>
            </div>
            <div className=" col-span-2 md:col-span-1">
              <div className="p-5">
                <div className={`w-full h-52 rounded-3xl bg-[url(/Images/mail1.png)] bg-cover mx-auto`}>
                  <div className="text-black hover:bg-black/40 w-full h-full flex justify-center group">
                    <button onClick={setTemplate} name="1" className="w-full hidden group-hover:block">set as Default</button>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className={`w-full h-52 rounded-3xl bg-[url(/Images/mail1.png)] bg-cover mx-auto`}>
                  <div className="text-black hover:bg-black/40 w-full h-full flex justify-center group">
                    <button onClick={setTemplate} name="3" className="w-full hidden group-hover:block">set as Default</button>
                  </div>
                </div>
              </div>
            </div>
            <div className=" col-span-2 md:col-span-1">
              <div className="p-5">
                <div className={`w-full h-52 rounded-3xl bg-[url(/Images/mail1.png)] bg-cover mx-auto`}>
                  <div className="text-black hover:bg-black/40 w-full h-full flex justify-center group">
                    <button onClick={setTemplate} name="2" className="w-full hidden group-hover:block">set as Default</button>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className={`w-full h-52 rounded-3xl bg-[url(/Images/mail1.png)] bg-cover mx-auto`}>
                  <div className="text-black hover:bg-black/40 w-full h-full flex justify-center group">
                    <button onClick={setTemplate} name="4" className="w-full hidden group-hover:block">set as Default</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}
export default DashBarTemp
