import { motion } from "framer-motion"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "../api/axios"

const REGEX_EMAIL = /^[^\s@]+@gmail\.com$/;
const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const REGEX_OTP = /^\d{4}$/;
const SIGNUP_URL = '/signup';
const GET_OTP_URL = '/send_otp';
const CHECK_OTP = '/check_otp'

const SignUpForms = () => {

    const [registationData, setRegistationData] = useState({
        email: "",
        password: "",
        appPass:"",
        otp:"",
    })
    const [vaildData,setVaildData] = useState({
        email:false,
        password:false,
        otp:false
    })
    const [errorMsg,setErrorMsg] = useState({
        error:false,
        value:false,
        title:"",
        message:"",
    })
    const [next,setNext] = useState(false)

    const navigate = useNavigate()

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

        if(event.target.name === 'email')
        {
            setVaildData((perVal) => ({
                ...perVal,
                email:isValidGmail(event.target.value)
            }))
        }else if(event.target.name === 'password')
        {
            setVaildData((perVal) => ({
                ...perVal,
                password:isValidPassword(event.target.value)
            }))
        }else if(event.target.name === 'otp')
        {
            setVaildData((perVal) => ({
                ...perVal,
                otp:isValidOtp(event.target.value)
            }))
        }
    }

    const showPopUp = ({error, title, message}) => {
        setErrorMsg({error: error, value:true, title:title, message:message})
        setTimeout(() => {
            setErrorMsg({value:false})
        },3000)
    }
    const goBack = () => {setNext((perVal) => (!perVal))} 
    const changenext = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(CHECK_OTP,
                JSON.stringify({
                    'email':registationData.email,
                    'otp': registationData.otp,
                }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            )
            console.log(response.data.status)
            if(response.data.status === "failed"){showPopUp({error:true , title:'Error',message:'Wrong OTP'}); return}
            setNext((perVal) => (!perVal))
        } catch (error) {
            if( !error?.response){ showPopUp({error:true, title:'Error', message:'No server responce'})}
            else{
                showPopUp({error:true , title:'Error',message:'Wrong OTP'})
            }
        }
    } 
        

    const handleGetOTP = async (event) => {
        event.preventDefault();
        const email = isValidGmail(registationData.email)
        if (!email){showPopUp({error:true,title:"Error",message:"Check Your Email"});return}
        try{
            const response = await axios.post(GET_OTP_URL,
                JSON.stringify({
                    "email": registationData.email
                    }),
                {
                    headers: { "Content-Type": 'application/json'},
                    withCredentials: true
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email =  isValidGmail(registationData.email) 
        const pwd =  isValidPassword(registationData.password)
        if(!email | !pwd ){
            setErrorMsg({title:"Error",message:"Check Your Email and password",value:true})
            return
        }
        try {
            const response = await axios.post(SIGNUP_URL,
                JSON.stringify({"email":registationData.email, "apppass":registationData.appPass, "password": registationData.password }),
                {
                    headers: { "Content-Type": 'application/json'},
                }
            )
            console.log(response.data)
            console.log(response.status)
            showPopUp({error:false, title:'success'})
            if(response.status === 200){
                console.log("hoorayyy");
                navigate('/dashboard')
            }
        } catch (error) {
            if( !error?.response){ showPopUp({ error:true, title:'Error', message:'No server responce'});}
            else{showPopUp({error:true, title:'Error',message:'Sign Up Failed'});}
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
                            {next ?
                                <div className=" h-[17.8rem]">
                                    <div className=" py-2">Provide your gmail password read our documentation for any clarifications</div>
                                    <div
                                    className={
                                        " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-green-500 focus-within:shadow-lg focus-within:shadow-green-500 "}>
                                        <input
                                            className=" bg-transparent h-10 w-full p-2 font-extralight  focus:outline-none peer"
                                            placeholder="GmailPassword"
                                            type="password"
                                            name="appPass"
                                            value={registationData.appPass}
                                            onChange={handleFormData}
                                            required />
                                        <div className=" absolute w-5/6 p-2 text-xs text-white/50 justify-center text-center bg-black/70 md:ms-4 ms-2 rounded-lg invisible peer-focus:visible">
                                            <ul>
                                                <li>Provide your Gmail Password</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="py-5 text-[rgba(252,252,252,.710)]">
                                    <div className=" text-white text-sm font-extralight text-center p-5">
                                        by clicking sign up you agree to terms and conditions 
                                    </div>
                                        <div className=" grid grid-cols-2 gap-10">
                                            <button 
                                            type="button"
                                            onClick={goBack}
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
                                                back
                                            </button>
                                            <button 
                                            type="submit"
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
                                                verify
                                            </button>
                                        </div>
                                    </div>
                                </div>:
                                <div>
                                    <div
                                    className={
                                        vaildData.email ?
                                        " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-green-500 focus-within:shadow-lg focus-within:shadow-green-500 ":
                                        " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-red-500 focus-within:shadow-lg focus-within:shadow-red-500"
                                    }>
                                        <input
                                            className=" bg-transparent h-10 w-full p-2 font-extralight  focus:outline-none peer"
                                            placeholder="Email"
                                            type="text"
                                            name="email"
                                            value={registationData.email}
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
                                        vaildData.password?
                                        " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-green-500 focus-within:shadow-lg focus-within:shadow-green-500":
                                        " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-red-500 focus-within:shadow-lg focus-within:shadow-red-500"
                                        }>
                                        <input
                                            className="bg-transparent h-10 w-full p-2 font-extralight focus:outline-none peer"
                                            placeholder="Password"
                                            type="password"
                                            name="password"
                                            value={registationData.password}
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
                                        vaildData.otp?
                                        " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-green-500 focus-within:shadow-lg focus-within:shadow-green-500":
                                        " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-red-500 focus-within:shadow-lg focus-within:shadow-red-500"
                                    }>
                                    <input 
                                        className="bg-transparent h-10 w-full p-2 font-extralight focus:outline-none peer" 
                                        placeholder="OTP" 
                                        name="otp"
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
                                            disabled = {!vaildData.email}
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
                                            type="button"
                                            onClick={changenext}
                                            disabled = {!vaildData.email | !vaildData.otp | !vaildData.password}
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
                                </div>}
                        </form>
                        <div className=" text-white text-center">
                            already have an account? <span><Link to='/login'>Login</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default SignUpForms;
