import { motion } from "framer-motion"
import { useState } from "react"
import { Link } from "react-router-dom"

const LoginForms = () => {
    const [registationData, setRegistationData] = useState({
        Email: "",
        Password: "",
    })
    const [vaildData,setVaildData] = useState({
        Email:false,
        Password:false,
    })
    const [errorMsg,setErrorMsg] = useState({
        title:"",
        message:"",
    })

    function isValidGmail(email) {
        return  /^[^\s@]+@gmail\.com$/.test(String(email).trim().toLowerCase());
    }

    function isValidPassword(password) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(String(password).trim());
    }

    function handleFormData (event) {

        setRegistationData(perVal => ({
            ...perVal,
            [event.target.name]: event.target.value
        }))
        if(event.target.name === 'Email')
        {
            setVaildData((perVal) => ({
                ...perVal,
                Email:isValidGmail(event.target.value)
            }))
        }else if(event.target.name === 'Password')
        {
            setVaildData((perVal) => ({
                ...perVal,
                Password:isValidPassword(event.target.value)
            }))
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const mail =  isValidGmail(registationData.Email) 
        const pwd =  isValidPassword(registationData.Password)
        if(!mail | !pwd ){
            setErrorMsg({title:"wrong",message:"Wrong",value:true})
            return
        }else{setErrorMsg({title:"true",message:"true",value:true})}
    }
  return (
    <section>
         {errorMsg.value && 
        <motion.div 
        className="
        w-full md:w-1/2 mx-auto p-2
        flex flex-row gap-3 justify-center 
        text-white text-lg  
        rounded-lg bg-red-200/50 "
        initial= {{y:-10,opacity:0}}
        animate ={{y:0,opacity:1, transition:{duration:1}}}
        >
            <div className=" text-center font-medium">{errorMsg.title}</div>
            <div className=" text-center font-light italic">{errorMsg.message}</div>
        </motion.div>}
        <div className=' container mx-auto bg-[url(/Images/Turtle-bg.png)] bg-no-repeat bg-right-bottom text-white mt-10 h-[27rem]'>
            <div className=" flex justify-center items-center">
                <div 
                className=" 
                p-5 lg:w-1/3 md:w-1/2 w-3/4
                rounded-3xl border 
                bg-gradient-to-b from-white/[0.15] to-white/[0.08] 
                border-gray-100 bg-clip-padding 
                backdrop-filter backdrop-blur-sm bg-opacity-10"
                >
                    <div>
                        <div className=" p-5 text-center text-2xl">
                            Log In
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className={
                                vaildData.Email ?
                                " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-green-500 focus-within:shadow-lg focus-within:shadow-green-500":
                                " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-red-500 focus-within:shadow-lg focus-within:shadow-red-500"
                                }>
                                <input 
                                className="bg-transparent h-10 w-full p-2 font-extralight focus:outline-none " 
                                placeholder="Email"
                                name="Email"
                                value={registationData.Email}
                                onChange={handleFormData} 
                                type="text" />
                            </div>
                            <div className={
                                vaildData.Password ?
                                " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-green-500 focus-within:shadow-lg focus-within:shadow-green-500":
                                " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-red-500 focus-within:shadow-lg focus-within:shadow-red-500"
                            }>
                                <input 
                                className="bg-transparent h-10 w-full p-2 font-extralight focus:outline-none " 
                                placeholder="Password" 
                                name="Password"
                                value={registationData.Password}
                                onChange={handleFormData}
                                type="password" />
                            </div>
                            <div className="py-10 text-[rgba(252,252,252,.710)]">
                                <div className=" grid grid-cols-1 gap-10">
                                    <button 
                                    disabled = {!vaildData.Email | !vaildData.Password}
                                    type="submit"
                                    className="text-center
                                    border rounded-3xl
                                    hover:bg-[rgba(210,223,255,.156)] 
                                    hover:text-white 
                                    hover:border-[rgba(210,223,255,.156)] 
                                    transition ease-in-out duration-500 
                                    disabled:bg-transparent
                                    disabled:text-[rgba(252,252,252,.310)]
                                    disabled:border-white
                                    py-2">
                                            Log Me In
                                    </button>
                                      
                                </div>
                            </div>
                        </form>
                        <div className=" text-white text-center">
                            Dont have an Account? <span><Link to='signup'>Sign Up</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default LoginForms
