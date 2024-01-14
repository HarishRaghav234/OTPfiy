import { NavLink } from "react-router-dom"

const Sidebar = () => {
  return (
    <section>
        <div className=" flex flex-col text-white text-xl justify-center items-center h-[30rem] md:h-[40rem]">
            <div className=" w-4/5 p-5 rounded-full border border-transparent  hover:border-white focus-within:border-white group-active:border-white">
              <NavLink to='' >Home</NavLink>
            </div>
            <div className=' w-4/5 p-5 rounded-full border border-transparent  hover:border-white focus-within:border-white'>
              <NavLink to='template'>Template</NavLink>
            </div>
        </div>
    </section>
  )
}

export default Sidebar
