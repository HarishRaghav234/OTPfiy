import { NavLink } from "react-router-dom"

const Sidebar = () => {
  return (
    <section>
      <div className="text-white text-xl md:h-[90vh] flex md:flex-col items-center justify-center">
        <NavLink to='' className='w-full'>
          <div className="p-5 rounded-full border border-transparent hover:border-white focus-within:border-white group-active:border-white">
            Home
          </div>
        </NavLink>
        <NavLink to='template' className='w-full'>
          <div className='p-5 rounded-full border border-transparent hover:border-white focus-within:border-white'>
            Template
          </div>
        </NavLink>
        <NavLink to='account' className='w-full'>
          <div className='p-5 rounded-full border border-transparent hover:border-white focus-within:border-white'>
            Account
          </div>
        </NavLink>
      </div>
    </section>
  )
}

export default Sidebar
