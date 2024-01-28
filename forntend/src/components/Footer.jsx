import linkedIn from '/Images/icons/linkedIn.svg'
import gitHub from '/Images/icons/Github.svg'
const Footer = () => {
  return (
    <footer className=' w-full'>
    <div className=" container mt-20 mx-auto text-white">
        <div className=" font-neutraface text-2xl">Dev</div>
        <div className=" grid grid-cols-6 mt-5 justify-center">
            <div className="md:col-span-3 col-span-6 flex md:gap-10 gap-2 md:justify-center items-center p-4 md:p-0">
                <a href="mailto:mrvikesk123@gmail.com" className=" ">
                    mr<span className=" font-neutraface text-xl">Vikesh</span>123@gmail.com
                </a>
                <a href="" className=" w-10">
                    <img src={linkedIn} alt="" />
                </a>
                <a href="" className=' w-10'>
                    <img src={gitHub} alt="" />
                </a>
            </div>
            <div className="md:col-span-3 col-span-6 flex md:gap-10 gap-2 md:justify-center items-center p-4 md:p-0">
                <a href="mailto:gurushikjayakumar@gmail.com" className=" ">
                    <span className=" font-neutraface text-xl">Gurushik</span>jayakumar@gmail.com
                </a>
                <a href="" className=" w-10">
                    <img src={linkedIn} alt="" />
                </a>
                <a href="" className=' w-10'>
                    <img src={gitHub} alt="" />
                </a>
            </div>
            
        </div>
    </div>
</footer>
  )
}

export default Footer
