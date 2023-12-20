
const SignUpForms = () => {
    
  return (
    <section>
        <div className=' container mx-auto bg-[url(/Images/Turtle-bg.png)] bg-no-repeat bg-right-bottom text-white mt-10'>
            <div className=" flex justify-center items-center">
                <div className=" p-5 md:w-1/3 rounded-3xl border bg-gradient-to-b from-white/[0.15] to-white/[0.08] border-gray-100 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
                    <div>
                        <div className=" p-5 text-center text-2xl">
                            Sign Up
                        </div>
                        <form>
                            <div className=" bg-transparent border py-1 mt-2 rounded-lg">
                                <input className="bg-transparent h-10 w-full p-2 font-extralight focus:outline-none " placeholder="Email" type="text" />
                            </div>
                            <div className=" bg-transparent border py-1 mt-2 rounded-lg">
                                <input className="bg-transparent h-10 w-full p-2 font-extralight focus:outline-none " placeholder="Password" type="password" />
                            </div>
                            <div className=" bg-transparent border py-1 mt-2 rounded-lg">
                                <input className="bg-transparent h-10 w-full p-2 font-extralight focus:outline-none" placeholder="OTP" type="text" />
                            </div>
                            <div className="py-10 text-[rgba(252,252,252,.710)]">
                                <div className=" grid grid-cols-2 gap-10">
                                    <button className="">
                                        <div className=" text-center border rounded-3xl py-2 hover:bg-[rgba(210,223,255,.156)] hover:text-white hover:border-[rgba(210,223,255,.156)] transition ease-in-out duration-500 ">
                                            Get OTP
                                        </div>
                                    </button>
                                    <button className="">
                                        <div className=" text-center border rounded-3xl py-2 hover:bg-[rgba(210,223,255,.156)] hover:text-white hover:border-[rgba(210,223,255,.156)] transition ease-in-out duration-500">
                                            Next
                                        </div>
                                    </button>   
                                </div>
                            </div>
                        </form>
                        <div className=" text-white text-center">
                            already have an account? <span><a href="">Login</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default SignUpForms
