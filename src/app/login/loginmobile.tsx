import { SetStateAction, useState } from "react";
import Image from "next/image"
import bgimg from "../../../public/bg.jpg";
import paperplane from "../../../public/paper-plane-freepik.png";
import LoginModal from "@/component/login/modalLoginMobile";
import { MdKeyboardBackspace } from "react-icons/md";
import RegisModal from "@/component/register/modalRegisterMobile";

const LoginMobile = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberme, setRememberme] = useState(false)
    const [modalLogin, setModalLogin] = useState(false)
    const [modalRegister, setModalRegister] = useState(false)

    const handleLogin = async () => {
        console.log("Login kuy")
    };

    const handleRegister = async () => {
        console.log("Daftar Gaesss")
    }

    return (
        <div className="relative
            h-screen 
            max-w-3xl
            bg-gradient-to-b from-white to-primary 
            flex 
            flex-col
            items-center 
            justify-center
            pr-5
            pl-5">
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
                <button 
                    className={`pl-5 absolute top-10 left-0 z-20`} 
                    onClick={() => setModalLogin(false)}>
                    <MdKeyboardBackspace className=" text-button-primary" size={35}/>
                </button>
            )}
            {modalRegister && (
                <button 
                    className={`pl-5 absolute top-10 left-0 z-20`} 
                    onClick={() => setModalRegister(false)}>
                    <MdKeyboardBackspace className=" text-button-primary" size={35}/>
                </button>
            )}
            <h1 className={`pr-5 pl-5 text-3xl font-[1000] w-full
                ${(modalLogin || modalRegister) ? "translate-x-[-5%]" :  "text-center translate-x-[0%]"} 
                transition-transform duration-300
                 font-sans text-button-secondary`}>Welcome, Brokk!!</h1>
            {(!modalLogin && !modalRegister)  && (
                <div className="flex-col flex z-50 p-10 justify-center">
                    <Image src={paperplane} alt="paper plane for freepik" width={200} height={200} className="w-lg h-max" priority/>
                    <h1 className="text-4xl font-black text-button-primary/80 font-dancing-script">Nyatet Duit</h1>
                </div>
            )}
            {(!modalLogin && !modalRegister) && (
                <button
                    onClick={() => setModalLogin(true)}
                    className="px-30 py-2 bg-button-primary text-white rounded-full mb-4"
                > Login
                </button>
            )}
            {(!modalRegister && !modalLogin) && (
                <button
                    onClick={() => setModalRegister(true)}
                    className="px-28 py-2 bg-button-primary text-white rounded-full mb-4"
                > register
                </button>
            )}
            <LoginModal 
                ModalLogin={modalLogin} 
                handleLogin={handleLogin} 
                username={username} setUsername={setUsername}
                password={password} setPassword={setPassword} 
                rememberme={rememberme} setRememberme={setRememberme}/>
            <RegisModal 
                regisLogin={modalRegister} 
                handleRegister={handleRegister}
                name={name} setName={setName}
                email={email} setEmail={setEmail} 
                username={username} setUsername={setUsername} 
                password={password} setPassword={setPassword} />
        </div>
    );
}

export default LoginMobile;