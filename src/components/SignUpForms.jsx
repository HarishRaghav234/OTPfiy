import { motion } from "framer-motion"
import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "../api/axios"

const REGEX_EMAIL = /^[^\s@]+@gmail\.com$/;
const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const REGEX_OTP = /^\d{4}$/;
const SIGNUP_URL = '/signup'
const GET_OTP_URL = '/otp'


const SignUpForms = () => {

    const [registationData, setRegistationData] = useState({
        Email: "",
        Password: "",
    })
    const [vaildData,setVaildData] = useState({
        Email:false,
        Password:false,
        Otp:false
    })
    const [errorMsg,setErrorMsg] = useState({
        error:false,
        value:false,
        title:"",
        message:"",
    })

    function isValidGmail(email) {
        return  REGEX_EMAIL.test(String(email).trim().toLowerCase());
    }

    function isValidPassword(password) {
        return REGEX_PASSWORD.test(String(password).trim());
    }

    function isValidOtp(otp) {
        return REGEX_OTP.test(String(otp).trim());
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
        }else if(event.target.name === 'OTP')
        {
            setVaildData((perVal) => ({
                ...perVal,
                Otp:isValidOtp(event.target.value)
            }))
        }
    }

    const showPopUp = ({error, title, message}) => {
        setErrorMsg({error: error, value:true, title:title, message:message})
        setTimeout(() => {
            setErrorMsg({value:false})
        },3000)
    } 

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email =  isValidGmail(registationData.Email) 
        const pwd =  isValidPassword(registationData.Password)
        if(!email | !pwd ){
            setErrorMsg({title:"Error",message:"Check Your Email and password",value:true})
            return
        }
        try {
            const response = await axios.post(SIGNUP_URL,
                JSON.stringify({email:registationData.Email, password: registationData.Password,apppass:'Guru@123nvh'}),
                {
                    headers: { "Content-Type": 'application/json'},
                }
            )
            console.log(response.data)
            console.log(response.status)
            showPopUp({error:false, title:'success'})
        } catch (error) {
            if( !error?.response){ showPopUp({ error:true, title:'Error', message:'No server responce'});}
            else{showPopUp({error:true, title:'Error',message:'Sign Up Failed'});}
        }
    }

    const handleGetOTP = async (event) => {
        event.preventDefault();
        const email = isValidGmail(registationData.Email)
        if (!email){showPopUp({error:true,title:"Error",message:"Check Your Email"});return}
        try{
            const response = await axios.post(GET_OTP_URL,
                JSON.stringify(registationData.Email),
                {
                    headers: { "Content-Type": 'application/json'},
                }
            )
            console.log(response.data)
            console.log(response.status)
            showPopUp({error:false, message:'otp sent'})
        }catch (error){
            if( !error?.response){ showPopUp({error:true, title:'Error', message:'No server responce'})}
            else{
                showPopUp({error:true , title:'Error',message:'Sign Up Failed'})
            }
        }
    }

  return (
    <section>
        {
        errorMsg.value && 
        <motion.div 
        className={errorMsg.error ? 
        "w-full md:w-1/2 mx-auto p-2 flex flex-row gap-3 justify-center text-white text-lg  rounded-lg bg-red-200/50 ":
        "w-full md:w-1/2 mx-auto p-2 flex flex-row gap-3 justify-center text-white text-lg  rounded-lg bg-green-200/50 "
        }
        initial= {{y:-10,opacity:0}}
        animate ={{y:0,opacity:1, transition:{duration:1}}}
        >
            <div className=" text-center font-medium">{errorMsg.title}</div>
            <div className=" text-center font-light italic">{errorMsg.message}</div>
        </motion.div>
        }
        <div className=' container mx-auto bg-[url(/Images/Turtle-bg.png)] bg-no-repeat bg-right-bottom text-white mt-2'>
            <div className=" flex justify-center items-center">
                <div className=" p-5 
                    lg:w-1/3 md:w-1/2 w-3/4
                    rounded-3xl border 
                    bg-gradient-to-b from-white/[0.15] to-white/[0.08] 
                    bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10
                    border-gray-100">
                    <div>
                        <div className=" p-5 text-center text-2xl">
                            Sign Up
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div 
                            className={
                                vaildData.Email ? 
                                " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-green-500 focus-within:shadow-lg focus-within:shadow-green-500 ":
                                " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-red-500 focus-within:shadow-lg focus-within:shadow-red-500"
                            }>
                                <input 
                                    className=" bg-transparent h-10 w-full p-2 font-extralight  focus:outline-none peer"  
                                    placeholder="Email" 
                                    type="text" 
                                    name="Email" 
                                    value={registationData.Email}
                                    onChange={handleFormData} 
                                    required />
                                <div className=" absolute w-5/6 p-2 text-xs text-white/50 justify-center text-center bg-black/70 md:ms-4 ms-2 rounded-lg invisible peer-focus:visible"> 
                                    <ul>
                                        <li>Provide only Gmail not other email address is accepted</li>
                                    </ul>
                                </div>
                            </div>
                            <div 
                            className={
                                vaildData.Password?
                                " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-green-500 focus-within:shadow-lg focus-within:shadow-green-500":
                                " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-red-500 focus-within:shadow-lg focus-within:shadow-red-500"
                                }>
                                <input 
                                    className="bg-transparent h-10 w-full p-2 font-extralight focus:outline-none peer" 
                                    placeholder="Password" 
                                    type="password" 
                                    name="Password" 
                                    value={registationData.Password}
                                    onChange={handleFormData}
                                    required />
                                <div className=" absolute w-5/6 p-2 text-xs text-white/50 justify-center text-center bg-black/70 md:ms-4 ms-2 rounded-lg invisible peer-focus:visible"> 
                                    <ul>
                                        <li>atleat 8 charcters</li>
                                        <li>Must have atlest one uppercase and lowercase</li>
                                        <li>Must have atlest one number</li>
                                    </ul>
                                </div>
                            </div>
                            <div 
                            className={
                                vaildData.Otp?
                                " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-green-500 focus-within:shadow-lg focus-within:shadow-green-500":
                                " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-red-500 focus-within:shadow-lg focus-within:shadow-red-500"
                                }>
                                <input 
                                    className="bg-transparent h-10 w-full p-2 font-extralight focus:outline-none peer" 
                                    placeholder="OTP" 
                                    name="OTP"
                                    type="numeric"
                                    onChange={handleFormData}
                                    required />
                                     <div className=" absolute w-5/6 p-2 text-xs text-white/50 justify-center text-center bg-black/70 md:ms-4 ms-2 rounded-lg invisible peer-focus:visible"> 
                                        <ul>
                                            <li>Get the OTP by clicking out get OTP button below</li>
                                        </ul>
                                    </div>
                            </div>
                            <div className="py-10 text-[rgba(252,252,252,.710)]">
                                <div className=" grid grid-cols-2 gap-10">
                                    <button 
                                    type="button"
                                    onClick={handleGetOTP}
                                    disabled = {!vaildData.Email}
                                    className="
                                        text-center
                                        border rounded-3xl border-green-500
                                        hover:bg-[rgba(210,223,255,.156)] 
                                        hover:text-white 
                                        hover:border-[rgba(210,223,255,.156)]
                                        transition ease-in-out duration-500 
                                        disabled:bg-transparent
                                        disabled:text-[rgba(252,252,252,.310)]
                                        disabled:border-white
                                        py-2
                                    ">
                                        Get OTP
                                    </button>
                                    <button
                                    type="submit"
                                    disabled = {!vaildData.Email | !vaildData.Otp | !vaildData.Password}
                                    className="
                                        text-center
                                        border rounded-3xl border-green-500
                                        hover:bg-[rgba(210,223,255,.156)] 
                                        hover:text-white 
                                        hover:border-[rgba(210,223,255,.156)] 
                                        transition ease-in-out duration-500 
                                        disabled:bg-transparent
                                        disabled:text-[rgba(252,252,252,.310)]
                                        disabled:border-white
                                        py-2
                                    ">
                                            Next
                                    </button>   
                                </div>
                            </div>
                        </form>
                        <div className=" text-white text-center">
                            already have an account? <span><Link to='login'>Login</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default SignUpForms
