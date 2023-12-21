import {  useState } from "react"
import { Link } from "react-router-dom"

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

    function isValidGmail(email) {
        return  /^[^\s@]+@gmail\.com$/.test(String(email).trim().toLowerCase());
    }

    function isValidPassword(password) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(String(password).trim());
    }

    function isValidOtp(otp) {
        return /^\d{4}$/.test(String(otp).trim());
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

    function handleSubmit (event) {
        event.preventDefault();
        console.log(registationData)
    }

    function handleGetOTP (event) {
        event.preventDefault();
        console.log(registationData)
    }

  return (
    <section>
        <div className=' container mx-auto bg-[url(/Images/Turtle-bg.png)] bg-no-repeat bg-right-bottom text-white mt-10'>
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
                        <form>
                            <div 
                            className={
                                vaildData.Email ? 
                                " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-green-500 focus-within:shadow-lg focus-within:shadow-green-500":
                                " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-red-500 focus-within:shadow-lg focus-within:shadow-red-500"
                            }>
                                <input 
                                    className=" bg-transparent h-10 w-full p-2 font-extralight  focus:outline-none" 
                                    placeholder="Email" 
                                    type="text" 
                                    name="Email" 
                                    value={registationData.Email}
                                    onChange={handleFormData} 
                                    required />
                                </div>
                            <div 
                            className={
                                vaildData.Password?
                                " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-green-500 focus-within:shadow-lg focus-within:shadow-green-500":
                                " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-red-500 focus-within:shadow-lg focus-within:shadow-red-500"
                                }>
                                <input 
                                    className="bg-transparent h-10 w-full p-2 font-extralight focus:outline-none " 
                                    placeholder="Password" 
                                    type="password" 
                                    name="Password" 
                                    value={registationData.Password}
                                    onChange={handleFormData}
                                    required />
                            </div>
                            <div 
                            className={
                                vaildData.Otp?
                                " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-green-500 focus-within:shadow-lg focus-within:shadow-green-500":
                                " bg-transparent border py-1 mt-2 rounded-lg focus-within:border-red-500 focus-within:shadow-lg focus-within:shadow-red-500"
                                }>
                                <input 
                                    className="bg-transparent h-10 w-full p-2 font-extralight focus:outline-none" 
                                    placeholder="OTP" 
                                    name="OTP"
                                    type="numeric"
                                    onChange={handleFormData}
                                    required />
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
                                    onClick={handleSubmit}
                                    className="
                                        text-center
                                        border rounded-3xl
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
