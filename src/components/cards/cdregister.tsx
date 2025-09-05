import useIsSmallWidth from '@/hooks/issmallwidth'
import React, { Dispatch, SetStateAction } from 'react'
import { FaLock, FaRegUser, FaUser } from 'react-icons/fa6'
import { SiMaildotru } from 'react-icons/si'

interface Iregis {
    closeRegis: () => void,
    handleRegis: () => void,
    handleRegisGoogle: () => void,
    username: string,
    setUsername: Dispatch<SetStateAction<string>>,
    password:string,
    setPassword: Dispatch<SetStateAction<string>>,
    name: string,
    setName: Dispatch<SetStateAction<string>>,
    email: string,
    setEmail: Dispatch<SetStateAction<string>>
}

const CardRegisterDesktop = ({
    closeRegis, 
    handleRegis,
    handleRegisGoogle,
    username, setUsername, 
    password, setPassword, 
    name, setName, 
    email,setEmail}:Iregis) => {
    const smallwitdh = useIsSmallWidth()
    return (
        <form className='flex flex-col z-10 gap-4 
            w-1/4 px-4 py-8 bg-secondary/30 rounded-3xl border-2 border-button-primary'>
                <h1 className="text-button-primary text-2xl text-center font-black font-ubuntu">Sign Up dulu Cuyy</h1>
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
                    <div className={`flex ${smallwitdh ? "flex-col gap-4" : "flex-row"} w-full justify-between`}>
                        <button 
                            onClick={handleRegis}
                            className={`${smallwitdh ? "max-w-20":"w-[32%]"} px-[17px] py-2 bg-button-primary hover:bg-button-secondary cursor-pointer text-white rounded-2xl font-bold text-center`}>
                                Sign Up
                        </button>
                        <button 
                            onClick={handleRegisGoogle}
                            className={`${smallwitdh ? "max-w-35":"w-[64%]"} px-[17px] py-2 bg-button-primary hover:bg-button-secondary cursor-pointer text-white rounded-2xl font-bold text-center`}>
                                Sign Up with Google
                        </button>
                    </div>
                    <div className="flex gap-2 lg:flex-row flex-col text-button-secondary ">
                    <label className="text-sm">Do you Have an Acoount ?</label>
                    <label 
                        onClick={closeRegis}
                        className="text-sm font-black">Sign In</label>
                </div>
                </div>
        </form>
    )
}

export default CardRegisterDesktop
