import Image from "next/image";
import { useState } from "react";
import bgimg from "../../../public/bg.jpg";
import paperplane from "../../../public/paper-plane-freepik.png";
import { FaLock, FaUser } from "react-icons/fa6";
const LoginDesktop = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rememberme, setRememberme] = useState(false)
    const [register, setRegister] = useState(false)

    const handleLogin = async () => {
        console.log("Login kuy")
    };

    return (
        <div className={`
            relative
            h-screen 
            w-full 
            bg-gradient-to-b from-white to-primary flex items-center p-6`}>
            <div 
                className="absolute inset-0 h-screen bg-cover bg-center pointer-events-none z-0 opacity-20" 
                style={{backgroundImage:`url(${bgimg.src})`}}/>
            <div className="flex-col h-screen flex w-3/4 z-10 p-10 justify-center">
                <Image src={paperplane} alt="paper plane for freepik" width={200} height={200} className="w-lg h-max" priority/>
                <h1 className="text-4xl font-black text-button-primary/80 font-dancing-script">Nyatet Duit</h1>
            </div>
            <form className="
                flex flex-col z-10 gap-4 
                w-1/4 pt-8 pb-8 pr-4 pl-4 bg-secondary/30 rounded-3xl border-2 border-button-primary">
                <h1 className="text-button-primary text-2xl text-center font-black font-ubuntu">Login Uhuy</h1>
                <div className="flex flex-col items-center gap-6 p-2">
                    <div className="flex flex-row w-full px-3 py-2 items-center rounded-2xl bg-secondary">
                        <input
                        className="w-full outline-none text-white/90"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="username"
                        />
                        <FaUser className={"text-white/70"}/>
                    </div>
                    <div className="flex flex-row w-full px-3 py-2 items-center rounded-2xl bg-secondary">
                        <input
                        className="w-full outline-none text-white/90"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="password"
                        />
                        <FaLock className="text-white/70"/>
                    </div>
                    <div className="flex w-full justify-around lg:flex-row flex-col">
                        <div className="flex flex-row gap-x-1 items-center justify-center text-button-primary">
                            <input
                                type="checkbox"
                                checked={rememberme}
                                onChange={(e) => setRememberme(e.target.checked)}
                                className="w-3 h-3 accent-button-primary" // Tailwind: warna custom
                            />
                            <label
                                onClick={() => setRememberme(!rememberme)}
                                className="cursor-pointer text-sm">
                                Remember Me
                            </label>
                        </div>
                        <label className="cursor-pointer text-button-primary text-sm">Forgot Password ?</label>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={handleLogin}
                            className="max-w-fit px-16 py-2 rounded-2xl bg-button-primary text-white/80 font-bold"
                        >
                            Login
                        </button>
                    </div>
                    <div className="flex gap-2 lg:flex-row flex-col text-button-secondary ">
                        <label className="text-sm">Don't Have an Acoount ?</label>
                        <label className="text-sm font-black">register</label>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginDesktop