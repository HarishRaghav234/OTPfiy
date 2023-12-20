import { NavLink } from "react-router-dom"

const NavbarButtons = (props) => {
  
  return (
    <div className=" md:flex md:justify-around md:flex-row text-[rgba(252,252,252,.710)] ">
      <div className="flex-col flex-grow pb-4 md:pb-0 hidden md:flex md:justify-center md:flex-row">
        <NavLink to='signup' className="px-4 py-2 mt-2 text-lg font-semibold bg-transparent rounded-full md:mt-0 md:ml-4 hover:bg-[rgba(210,223,255,.156)] hover:text-white transition ease-in-out duration-500" href="#">Sign Up</NavLink>
        <a className="px-4 py-2 mt-2 text-lg font-semibold bg-transparent rounded-full md:mt-0 md:ml-4 hover:bg-[rgba(210,223,255,.156)] hover:text-white transition ease-in-out duration-500" href="#">Docs</a>
      </div>
      {// eslint-disable-next-line react/prop-types
      props.mobileView && 
      <div className="md:hidden">
        <div className=" flex flex-col">
          <a className="px-4 py-2 mt-2 text-lg font-semibold bg-transparent rounded-full md:mt-0 md:ml-4 hover:bg-[rgba(210,223,255,.156)] hover:text-white transition ease-in-out duration-500 text-center font-inter" href="#">Sign Up</a>
          <a className="px-4 py-2 mt-2 text-lg font-semibold bg-transparent rounded-full md:mt-0 md:ml-4 hover:bg-[rgba(210,223,255,.156)] hover:text-white transition ease-in-out duration-500 text-center" href="#">Docs</a>
        </div>
      </div>
      }
    </div>
  )
}

export default NavbarButtons
