import React, { Dispatch, SetStateAction } from 'react'
import { FaLock, FaRegUser, FaUser } from 'react-icons/fa6'
import { SiMaildotru } from 'react-icons/si'

interface Iregis {
    closeRegis: () => void,
    username: string,
    setUsername: Dispatch<SetStateAction<string>>,
    password:string,
    setPassword: Dispatch<SetStateAction<string>>,
    name: string,
    setName: Dispatch<SetStateAction<string>>,
    email: string,
    setEmail: Dispatch<SetStateAction<string>>
}

const ModalRegisterDesktop = ({
    closeRegis, 
    username, setUsername, 
    password, setPassword, 
    name, setName, 
    email,setEmail}:Iregis) => {
    const Regis = async () => {
        console.log('Regis cuyyyy')
    }
    return (
        <form className='flex flex-col z-10 gap-4 
            w-1/4 pt-8 pb-8 pr-4 pl-4 bg-secondary/30 rounded-3xl border-2 border-button-primary'>
                <h1 className="text-button-primary text-2xl text-center font-black font-ubuntu">Register Cuyy</h1>
                <div className='flex flex-col items-center gap-6 p-2'>
                    <div className="flex flex-row w-full px-3 py-2 items-center rounded-2xl bg-secondary">
                        <input
                        className="w-full pr-2 outline-none text-white/90"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Username"
                        />
                        <FaUser className={"text-white/70"}/>
                    </div>
                    <div className="flex flex-row w-full px-3 py-2 items-center rounded-2xl bg-secondary">
                        <input
                        className="w-full pr-2 outline-none text-white/90"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        />
                        <FaLock className="text-white/70"/>
                    </div>
                    <div className="flex flex-row w-full px-3 py-2 items-center rounded-2xl bg-secondary">
                        <input
                        className="w-full pr-2 outline-none text-white/90"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Name"
                        />
                        <FaRegUser className="text-white/70"/>
                    </div>
                    <div className="flex flex-row w-full px-3 py-2 items-center rounded-2xl bg-secondary">
                        <input
                        className="w-full pr-2 outline-none text-white/90"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                        />
                        <SiMaildotru  className="text-white/70"/>
                    </div>
                    <div className='flex justify-center'>
                        <button 
                            onClick={Regis}
                            className='bg-button-primary text-white px-16 py-2 rounded-2xl font-bold text-center'>
                                Register
                        </button>
                    </div>
                    <div className="flex gap-2 lg:flex-row flex-col text-button-secondary ">
                    <label className="text-sm">Do you Have an Acoount ?</label>
                    <label 
                        onClick={closeRegis}
                        className="text-sm font-black">Login</label>
                </div>
                </div>
        </form>
    )
}

export default ModalRegisterDesktop
