import { useState } from "react"
import axios from "../api/axios"
import { useNavigate } from "react-router-dom";

const GET_OTP_URL = '/send_otp';
const RESET_PASSWORD_URL = '/reset'

const REGEX_EMAIL = /^[^\s@]+@gmail\.com$/;
const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const REGEX_OTP = /^\d{4}$/;

const ResetPassword = () => {
    const [next, setNext] = useState(false);
    const navigate = useNavigate()

    const [registationData, setRegistationData] = useState({
        email:'',
        otp:'',
        newPassword:'',
    });

    const [vaildData,setVaildData] = useState({
        email:false,
        newPassword:false,
        otp:false,
        confirmPassword:false,
    })

    function isValidGmail(email) {
        return  REGEX_EMAIL.test(String(email).trim().toLowerCase());
    }

    function isValidPassword(password) {
        return REGEX_PASSWORD.test(String(password).trim());
    }

    function isValidConfirmPassword(confirm) {
        if ( registationData.newPassword === confirm){
            return true
        }
        return false;
    }

    function isValidOtp(otp) {
        return REGEX_OTP.test(String(otp).trim());
    }
    

    const handleFormData = (event) => {
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
        }else if(event.target.name === 'newPassword')
        {
            setVaildData((perVal) => ({
                ...perVal,
                newPassword:isValidPassword(event.target.value)
            }))
        }else if(event.target.name === 'otp')
        {
            setVaildData((perVal) => ({
                ...perVal,
                otp:isValidOtp(event.target.value)
            }))
        }else if(event.target.name === 'confirmPassword'){
            setVaildData((perVal) => ({
                ...perVal,
                confirmPassword:isValidConfirmPassword(event.target.value)
            }))
        }
    }
    
    const handleGetOTP = async (event) => {
        event.preventDefault();
        const email = isValidGmail(registationData.email)
        if (!email){console.log({error:true,title:"Error",message:"Check Your Email"});return}
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
                console.log({error:false, message:'otp sent'})
            }catch (error){
                if( !error?.response){ console.log({error:true, title:'Error', message:'No server responce'})}
                else{
                    console.log({error:true , title:'Error',message:'Sign Up Failed'})
                }
            }
        }
        
        const handleSubmit = async (event) => {
        event.preventDefault();
        const email =  isValidGmail(registationData.email) 
        const pwd =  isValidPassword(registationData.password)
        if(email & pwd ){
            console.log({title:"Error",message:"Check Your Email and password",value:true})
            return
        }
        try {
            const response = await axios.post(RESET_PASSWORD_URL,
                JSON.stringify({'email': registationData.email, 'otp':registationData.otp, 'password':registationData.confirmPassword}),
                {
                    headers: { "Content-Type": 'application/json'},
                }
                )
                console.log(response.data)
                console.log(response.status)
                console.log({error:false, title:'success'})
                if(response.status === 200){
                    console.log("hoorayyy");
                    navigate('/login')
                }
            } catch (error) {
                if( !error?.response){ console.log({ error:true, title:'Error', message:'No server responce'});}
                else{console.log({error:true, title:'Error',message:'Sign Up Failed'});}
        }
    }
    
    const goBack = () => {
        setNext((perVal) => !perVal )
    }
    
    const changenext = () => {
        setNext((perVal) => !perVal )
    }

    console.log(registationData)
    return (
    <section>
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
                            Reset Password
                        </div>
                        <form onSubmit={handleSubmit}>
                            {next ?
                                <div className=" h-[17.8rem]">
                                    <div className=" py-2">New Password</div>
                                    <div
                                    className={
                                        vaildData.newPassword?
                                        " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-green-500 focus-within:shadow-lg focus-within:shadow-green-500":
                                        " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-red-500 focus-within:shadow-lg focus-within:shadow-red-500"
                                        }>
                                        <input
                                            className="bg-transparent h-10 w-full p-2 font-extralight focus:outline-none peer"
                                            placeholder="Enter new Password"
                                            type="password"
                                            name="newPassword"
                                            value={registationData.newPassword}
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
                                    <div className=" py-2">Confirm New Password</div>
                                    <div
                                    className={
                                        vaildData.confirmPassword ?
                                        " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-green-500 focus-within:shadow-lg focus-within:shadow-green-500 ":
                                        " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-red-500 focus-within:shadow-lg focus-within:shadow-red-500"
                                    }>
                                        <input
                                            className=" bg-transparent h-10 w-full p-2 font-extralight  focus:outline-none peer"
                                            placeholder="Confirm Password"
                                            type="password"
                                            name="confirmPassword"
                                            onChange={handleFormData}
                                            required />
                                        <div className=" absolute w-5/6 p-2 text-xs text-white/50 justify-center text-center bg-black/70 md:ms-4 ms-2 rounded-lg invisible peer-focus:visible">
                                            <ul>
                                                <li>Provide Registed Gmail</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="py-5 text-[rgba(252,252,252,.710)]">
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
                                            disabled = {!vaildData.newPassword | !vaildData.confirmPassword }
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
                                                submit
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
                                                <li>Provide Registed Gmail</li>
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
                                            disabled = {!vaildData.email | !vaildData.otp }
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
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ResetPassword
