import { Dispatch, SetStateAction } from "react";
import Image from "next/image"
import bgimg from "../../../public/bg.jpg";
import paperplane from "../../../public/paper-plane-freepik.png";
import LoginModal from "@/components/login/modalLoginMobile";
import { MdKeyboardBackspace } from "react-icons/md";
import RegisModal from "@/components/register/modalRegisterMobile";

interface ILoginMobile {
    handleLogin: () => void,
    handleGoogleLogin: () => void,
    handleRegister: () => void,
    handleNavigation: () => void,
    modalLogin: boolean,
    setModalLogin: Dispatch<SetStateAction<boolean>>,
    modalRegister: boolean,
    setModalRegister: Dispatch<SetStateAction<boolean>>,
    name:string,
    setName: Dispatch<SetStateAction<string>>,
    email:string,
    setEmail: Dispatch<SetStateAction<string>>,
    username: string,
    setUsername: Dispatch<SetStateAction<string>>,
    password:string,
    setPassword: Dispatch<SetStateAction<string>>,
    rememberMe: boolean,
    setRememberMe: Dispatch<SetStateAction<boolean>>,
    alertLogin: boolean, setAlertLogin: Dispatch<SetStateAction<boolean>>,
    alertMessage: string, 
}

const LoginMobile = ({
    handleLogin, handleGoogleLogin, handleRegister, handleNavigation,
    modalLogin, setModalLogin,
    modalRegister, setModalRegister,
    name, setName, 
    username, setUsername,
    email, setEmail, 
    password, setPassword,
    rememberMe, setRememberMe, 
    alertLogin, setAlertLogin, alertMessage}: ILoginMobile) => {
    
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
                    onClick={() => setModalLogin(true) }
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
            {alertLogin && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-md max-w-sm text-center">
                    <p className="text-lg font-medium">{alertMessage}</p>
                    <button
                        onClick={() => {
                            setAlertLogin(false)
                            handleNavigation()}}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        OK
                    </button>
                    </div>
                </div>
            )}
            <LoginModal 
                ModalLogin={modalLogin} 
                handleLogin={handleLogin}
                handleGoogleLogin={handleGoogleLogin} 
                username={username} setUsername={setUsername}
                password={password} setPassword={setPassword} 
                rememberme={rememberMe} setRememberme={setRememberMe}/>
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