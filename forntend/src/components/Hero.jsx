const Hero = () => {
  return (
    <div>
        <div className=" grid grid-cols-10 text-white container mx-auto pt-48 bg-[url('/Images/Turtle-bg.png')] bg-no-repeat bg-contain bg-right-bottom">
            <div className=" md:col-span-6 col-span-10">
                <div className=" text-4xl">
                Lorem Ipsum Dolor
                </div>
                <div className=" py-10 pe-24 text-lg font-[100] text-[rgba(239,245,255,.693)]">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
                    et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
                    ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis eni 
                </div>
            </div>
        </div>
        <div className=" container mx-auto pt-3  text-white">
            <div className=" grid grid-cols-12 font-neutraface">
                <div className="col-span-12 pt-2 md:pt-0  md:col-span-4 justify-center">
                    <div className=" flex flex-row gap-10 items-center py-5 justify-center w-[75%] mx-auto hover:bg-[rgba(70,70,70,.5)] hover:border-[hsla(0,0%,100%,1)] transition ease-out duration-300 rounded-2xl ">
                        <div className=" w-10 h-10 text-center bg-white text-black rounded-full text-xl">
                            <div className=" flex justify-center mt-1">1</div>
                        </div>
                        <div className=" font-neutraface text-lg">Create account</div>
                    </div>
                </div>
                <div className="col-span-12 pt-2 md:pt-0  md:col-span-4 justify-center">
                    <div className=" flex flex-row gap-10 items-center py-5 justify-center w-[75%] mx-auto hover:bg-[rgba(70,70,70,.5)] hover:border-[hsla(0,0%,100%,1)] transition ease-out duration-300 rounded-2xl ">
                        <div className=" w-10 h-10 text-center bg-white text-black rounded-full text-xl">
                            <div className=" flex justify-center mt-1">2</div>
                        </div>
                        <div className=" font-neutraface text-lg">Copy your API key</div>
                    </div>
                </div>
                <div className="col-span-12 pt-2 md:pt-0  md:col-span-4 justify-center">
                    <div className=" flex flex-row gap-10 items-center py-5 justify-center w-[75%] mx-auto hover:bg-[rgba(70,70,70,.5)] hover:border-[hsla(0,0%,100%,1)] transition ease-out duration-300 rounded-2xl ">
                        <div className=" w-10 h-10 text-center bg-white text-black rounded-full text-xl">
                            <div className=" flex justify-center mt-1">3</div>
                        </div>
                        <div className=" font-neutraface text-lg">Implement to your apps</div>
                    </div>
                </div>
            </div>
        </div>
    </div>  
    )
}

export default Hero
