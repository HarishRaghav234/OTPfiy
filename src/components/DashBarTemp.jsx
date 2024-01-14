import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const SET_TEMPLATE = '/set_template'

const DashBarTemp = () => {
  const axiosPrivate = useAxiosPrivate();
  const [temp, setTemp] = useState(0)

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

  return (
    <div>
      <div className=" grid grid-cols-2 py-10">
            <div className=" col-span-2 md:col-span-1">
              <div className="p-5">
                <div className="w-full h-52 rounded-3xl bg-white/40 mx-auto">
                  <div className="p-2 ">
                    <button onClick={setTemplate} name="1">set as Defalut</button>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="w-full h-52 rounded-3xl bg-white/40 mx-auto">
                  <div className="p-2 ">
                    <button onClick={setTemplate} name="2">set as Defalut</button>
                  </div>
                </div>
              </div>
            </div>
            <div className=" col-span-2 md:col-span-1 ">
              <div className="p-5">
                <div className="w-full h-52 rounded-3xl bg-white/40 mx-auto"></div>
              </div>
              <div className="p-5">
                <div className="w-full h-52 rounded-3xl bg-white/40 mx-auto"></div>
              </div>
            </div>
        </div>
        <div className=" -mt-12">
          <button onClick={requestChange}>set Template</button>
        </div>
    </div>
  )
}
export default DashBarTemp
