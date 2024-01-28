/* eslint-disable react/prop-types */

import { motion } from "framer-motion"
import { useContext } from "react"
import ErrorContext from "../context/ErrorProvider"
// eslint-disable-next-line react/prop-types
const ErrorMessage = () => {
  const { errorObj } = useContext(ErrorContext)

    console.log(errorObj.error, errorObj.value, errorObj.title, errorObj.message)
  return (
    errorObj.value && 
        <motion.div 
        className={errorObj.error ? 
        "w-full md:w-1/2 mx-auto p-2 flex flex-row gap-3 justify-center text-white text-lg  rounded-lg bg-red-200/50 ":
        "w-full md:w-1/2 mx-auto p-2 flex flex-row gap-3 justify-center text-white text-lg  rounded-lg bg-green-200/50 "
        }
        initial= {{y:-10,opacity:0}}
        animate ={{y:0,opacity:1, transition:{duration:1}}}
        >
            <div className=" text-center font-medium">{errorObj.title}</div>
            <div className=" text-center font-light italic">{errorObj.message}</div>
        </motion.div> 
  )
}

export default ErrorMessage
