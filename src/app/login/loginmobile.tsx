import { useState } from "react";
import Image from "next/image"
import bgimg from "../../../public/bg.jpg";
import paperplane from "../../../public/paper-plane-freepik.png";
import LoginModal from "@/component/modalLogin";
import { IoCloseCircle } from "react-icons/io5";
import { MdKeyboardBackspace } from "react-icons/md";
export default function LoginMobile() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rememberme, setRememberme] = useState(false)
    const [modalLogin, setModalLogin] = useState(false)
    return (
        <div className="relative
            h-screen 
            max-w-3xl
            bg-gradient-to-b from-white to-primary 
            flex 
            flex-col
            items-center 
            justify-center
            pr-10
            pl-10">
            <div 
                className="
                    absolute 
                    inset-0 
                    h-screen 
                    bg-cover 
                    bg-center 
                    pointer-events-none 
                    z-0 
                    opacity-20" 
                style={{backgroundImage:`url(${bgimg.src})`}}/>
            {modalLogin && (
                <button className=" absolute top-10 left-5 z-20" onClick={() => setModalLogin(false)}>
                    <MdKeyboardBackspace className=" text-button-primary" size={30}/>
                </button>
            )}
            <h1 className={`text-3xl pl-2 font-[1000] text-start w-full 
                ${!modalLogin ? "w-[-10]" : "w-0"} font-sans text-button-secondary`}>Welcome, Brokk!!</h1>
            {!modalLogin && (
                <div className="flex-col flex z-50 p-10 justify-center">
                    <Image src={paperplane} alt="paper plane for freepik" width={100} height={100} className="w-lg h-max" priority/>
                    <h1 className="text-4xl font-black text-button-primary/80 font-dancing-script">Nyatet Duit</h1>
                </div>
            )} 
            {!modalLogin && (
                <button
                    onClick={() => setModalLogin(true)}
                    className="px-30 py-2 bg-button-primary text-white rounded-full mb-4"
                > Login
                </button>
            )}
            <LoginModal ModalLogin = {modalLogin} Close={() => setModalLogin(false)}>
                <h1 className="text-button-primary text-xs text-center font-black font-ubuntu">Login Uhuy</h1>
                <div>

                </div>
            </LoginModal>
            <h1 className="font-black text-xl">Login - Mobile</h1>
        </div>
    );
}
