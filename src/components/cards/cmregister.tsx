"use client"

import { Dispatch, SetStateAction } from "react";
import { FaCircleUser, FaLock, FaUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";

interface IRegisCard {
    regisLogin: boolean,
    handleRegister : () => void,
    handleRegisGoogle: () => void,
    name:string,
    setName: Dispatch<SetStateAction<string>>,
    email:string,
    setEmail: Dispatch<SetStateAction<string>>,
    username: string,
    setUsername: Dispatch<SetStateAction<string>>,
    password:string,
    setPassword: Dispatch<SetStateAction<string>>
}
const RegisCard = ({regisLogin, handleRegister, handleRegisGoogle, name, setName, username,email,setEmail, setUsername,password,setPassword}: IRegisCard) => {
    if(!regisLogin) return null;
    return (
        <div className="relative inset-0 flex w-full pt-10 pb-4">
            <form className="flex flex-col gap-4 w-full pt-8 pb-8 rounded-3xl z-10 relative">
                <h1 className="text-button-primary text-sm pl-[1%] text-start font-black font-ubuntu">Sign Up dulu Anjay</h1>
                <div className="flex flex-col items-center gap-6">
                    <div className="flex flex-row w-full px-3 py-2 items-center rounded-xl bg-secondary">
                        <input
                        className="w-full outline-none text-white/90"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Name"
                        />
                        <FaCircleUser className={"text-white/70"}/>
                    </div>
                    <div className="flex flex-row w-full px-3 py-2 items-center rounded-xl bg-secondary">
                        <input
                        className="w-full outline-none text-white/90"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                        />
                        <MdOutlineEmail className={"text-white/70"}/>
                    </div>
                    <div className="flex flex-row w-full px-3 py-2 items-center rounded-xl bg-secondary">
                        <input
                        className="w-full outline-none text-white/90"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Username"
                        />
                        <FaUser className={"text-white/70"}/>
                    </div>
                    <div className="flex flex-row w-full px-3 py-2 items-center rounded-xl bg-secondary">
                        <input
                        className="w-full outline-none text-white/90"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        />
                        <FaLock className="text-white/70"/>
                    </div>
                    <div className="flex w-full justify-between">
                        <button
                            type="button"
                            onClick={handleRegister}
                            className="w-[32%] py-2 rounded-2xl bg-button-primary text-white/80 font-bold"
                        >
                            Sign Up
                        </button>
                        <button
                            type="button"
                            onClick={handleRegisGoogle}
                            className="w-[64%] py-2 rounded-2xl bg-button-primary text-white/80 font-bold"
                        >
                            Sign Up with Google
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisCard;