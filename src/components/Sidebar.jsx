import { NavLink } from "react-router-dom"

const Sidebar = () => {
  return (
    <section>
        <div className=" flex flex-col text-white text-xl justify-center items-center border h-[30rem] md:h-[40rem]">
            <div className=" p-5"><NavLink to=''>Home</NavLink></div>
            <div className=" p-5"><NavLink to='template'>Template</NavLink></div>
            <div className=" p-5">Home</div>
        </div>
    </section>
  )
}

export default Sidebar
