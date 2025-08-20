import Image from "next/image";
import { useState } from "react";
import bgimg from "../../../public/bg.jpg";
import paperplane from "../../../public/paper-plane-freepik.png";
import ModalLoginDesktop from "@/components/login/modalLoginDesktop";
import ModalRegisterDesktop from "@/components/register/modalRegisterDesktop";
const LoginDesktop = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [rememberme, setRememberme] = useState(false)
    const [modalRegister, setModalRegister] = useState(false)

    const handleLogin = async () => {
        console.log("Login kuy")
    };
    const handleRegis = async () => {
        setModalRegister(false)
    }

    return (
        <div className={`
            relative
            h-screen 
            w-full 
            bg-gradient-to-b from-white to-primary flex items-center p-10`}>
            <div 
                className="absolute inset-0 h-screen bg-cover bg-center pointer-events-none z-0 opacity-20" 
                style={{backgroundImage:`url(${bgimg.src})`}}/>
            <div className="flex-col h-screen flex w-3/4 z-10 p-10 justify-center">
                <Image src={paperplane} alt="paper plane for freepik" width={200} height={200} className="w-lg h-max" priority/>
                <h1 className="text-4xl font-black text-button-primary/80 font-dancing-script">Nyatet Duit</h1>
            </div>
            {!modalRegister ? (<ModalLoginDesktop 
                handleLogin={handleLogin}
                username={username} setUsername={setUsername}
                password={password} setPassword={setPassword}
                rememberme={rememberme} setRememberme={setRememberme} 
                openRegis={() => {setModalRegister(true)}}/>) : 
                (<ModalRegisterDesktop 
                closeRegis={() => {setModalRegister(false)}}
                username={username} setUsername={setUsername}
                password={password} setPassword={setPassword}
                name={name} setName={setName}
                email={email} setEmail={setEmail}/>)}
            
        </div>
    )
}

export default LoginDesktop