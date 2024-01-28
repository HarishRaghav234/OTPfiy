import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import axios from "../api/axios"
import AuthContext from "../context/AuthProvider";
import ErrorContext from "../context/ErrorProvider";

const REGEX_EMAIL = /^[^\s@]+@gmail\.com$/;
const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const LOGIN_URL = '/login'


const LoginForms = () => {
    const [registationData, setRegistationData] = useState({
        email: "",
        password: "",
    })
    const [vaildData,setVaildData] = useState({
        email:false,
        password:false,
    })

    const navigate = useNavigate()

    const { setAuth } = useContext(AuthContext)
    const { setErrorObj } = useContext(ErrorContext)

    function isValidGmail(email) {
        return  REGEX_EMAIL.test(String(email).trim().toLowerCase());
    }

    function isValidPassword(password) {
        return REGEX_PASSWORD.test(String(password).trim());
    }

    const showPopUp = ({error, title, message}) => {
        setErrorObj({error: error, value:true, title:title, message:message})
        setTimeout(() => {
            setErrorObj({value:false})
        },3000)
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
        }
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const mail =  isValidGmail(registationData.email) 
        const pwd =  isValidPassword(registationData.password)
        if(!mail | !pwd ){
            showPopUp({error:true,title:"wrong",message:"Wrong"})
            return
        }try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({email:registationData.email, password: registationData.password}),
                {
                    headers: { "Content-Type": 'application/json'},
                    withCredentials: true,
                }
            )
            if (response.data[1] === 401){showPopUp({ error:true, title:'Error', message:'Invalid Password'}); return}
            const accessToken = response?.data?.access_token
            setAuth({'user':registationData.email, 'password':registationData.password, 'accessToken': accessToken})
            navigate('/auth/dashboard')
        } catch (error) {
            if( !error?.response){ showPopUp({ error:true, title:'Error', message:'No server responce'});}
            else{showPopUp({error:true, title:'Error',message:'Login Failed'});}
        }
    }
  return (
    <section>
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
                                vaildData.email ?
                                " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-green-500 focus-within:shadow-lg focus-within:shadow-green-500":
                                " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-red-500 focus-within:shadow-lg focus-within:shadow-red-500"
                                }>
                                <input 
                                className="bg-transparent h-10 w-full p-2 font-extralight focus:outline-none " 
                                placeholder="Email"
                                name="email"
                                value={registationData.email}
                                onChange={handleFormData} 
                                type="text" />
                            </div>
                            <div className={
                                vaildData.password ?
                                " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-green-500 focus-within:shadow-lg focus-within:shadow-green-500":
                                " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-red-500 focus-within:shadow-lg focus-within:shadow-red-500"
                            }>
                                <input 
                                className="bg-transparent h-10 w-full p-2 font-extralight focus:outline-none " 
                                placeholder="Password" 
                                name="password"
                                value={registationData.password}
                                onChange={handleFormData}
                                type="password" />
                            </div>
                            <div className="py-10 text-[rgba(252,252,252,.710)]">
                                <div className=" grid grid-cols-1 gap-10">
                                    <button 
                                    disabled = {!vaildData.email | !vaildData.password}
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
                            Dont have an Account? <span><Link to='/signup'>Sign Up</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
  )
}

export default LoginForms
