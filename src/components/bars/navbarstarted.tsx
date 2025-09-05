'use client'
import Image from "next/image"
import paperplane from "../../../public/paper-plane-freepik.png"

interface INavbar  {
    handleClick: () => void
}
const NavbarStarted = ({handleClick}: INavbar) => {

    return (
        <nav className="absolute flex flex-row w-full top-0">
            <div className="flex justify-between w-full p-3 pr-5 pl-5">
                <div className="flex-col h-18 max-w-[16%] z-50">
                    <Image src={paperplane} alt="paper plane for freepik" width={200} height={200} className="w-lg h-max" priority/>
                </div> 
                <button className="flex p-4 max-h-15 cursor-pointer bg-button-primary hover:bg-button-secondary text-white rounded-2xl font-black font-ubuntu text-xl" onClick={handleClick}>
                    Get Started
                </button>
            </div>
        </nav>
    )
}

export default NavbarStarted