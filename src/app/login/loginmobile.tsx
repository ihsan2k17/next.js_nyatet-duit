import { useState } from "react";
import bgimg from "../../../public/bg.jpg";
import LoginModal from "@/component/modalLogin";
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
            {!modalLogin && (
                <button
                    onClick={() => setModalLogin(true)}
                    className="px-20 py-2 bg-button-primary text-white rounded-full mb-4"
                > Login
                </button>
            )}
            <LoginModal ModalLogin = {modalLogin} Close={() => setModalLogin(false)}>
                <h1 className="text-button-primary text-xs text-center font-black font-ubuntu">Login Uhuy</h1>
                <div>

                </div>
            </LoginModal>
            <h1>Login - Mobile</h1>
        </div>
    );
}
