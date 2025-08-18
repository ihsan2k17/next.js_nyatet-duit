import Image from "next/image"
import paperplane from "../../../public/paper-plane-freepik.png"
const NavbarStarted = () => {

    return (
        <nav className="absolute flex flex-row w-full top-0">
            <div className="flex justify-between w-full p-3 pr-5 pl-5">
                <div className="flex-col h-20 max-w-[16%] ">
                    <Image src={paperplane} alt="paper plane for freepik" width={200} height={200} className="w-lg h-max" priority/>
                </div> 
                <div className="flex p-4 max-h-15 bg-button-primary hover:bg-primary text-white hover:text-button-primary rounded-2xl">
                    <button className=" font-black font-ubuntu text-xl ">
                        Get Started
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default NavbarStarted