import NavbarButtons from "./NavbarButtons"
import { useState } from "react"
const Navbar = () => {
  const [open, setOpen] = useState(false)

  const toggleMenuBtn = () => {
    setOpen((perVal) => (!perVal))
  } 
  return (
    <nav>
      <div className=" w-full pt-5">
          <div className=" flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8 text-white">
              <div className="p-4 flex flex-row items-center justify-between">
                <div className="font-neutraface font-bold text-5xl">
                    OTPfiy
                </div>
                <button className="md:hidden rounded-lg focus:outline-none focus:shadow-outline" onClick={toggleMenuBtn}>
                  <svg fill="white" viewBox="0 0 20 20" className="w-6 h-6">
                    {
                    open == false ? 
                    <path   d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"></path>:
                    <path   d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>}
                  </svg>
                </button>
              </div>
                <NavbarButtons mobileView = {open} />
          </div>
      </div>
    </nav>
  )
}

export default Navbar
