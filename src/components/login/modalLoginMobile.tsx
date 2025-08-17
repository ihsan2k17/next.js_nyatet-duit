import { Dispatch, SetStateAction } from "react";
import { FaLock, FaUser } from "react-icons/fa6";

interface ILoginModal {
    ModalLogin: boolean,
    handleLogin : () => void,
    username: string,
    setUsername: Dispatch<SetStateAction<string>>,
    password:string,
    setPassword: Dispatch<SetStateAction<string>>,
    rememberme: boolean,
    setRememberme: Dispatch<SetStateAction<boolean>>
}

const LoginModal = ({ModalLogin, handleLogin, username, setUsername, password, setPassword, rememberme, setRememberme}: ILoginModal) => {

    if(!ModalLogin) return null;
    
    return (
        <div className="relative inset-0 flex w-full pt-10 pb-4">
            <form className="flex flex-col gap-4 w-full pt-8 pb-8 rounded-3xl z-10 relative">
                    <h1 className="text-button-primary text-sm pl-[1%] text-start font-black font-ubuntu">Login Uhuy</h1>
                <div className="flex flex-col items-center gap-6">
                    <div className="flex flex-row w-full px-3 py-2 items-center rounded-xl bg-secondary">
                        <input
                        className="w-full outline-none text-white/90"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="username"
                        />
                        <FaUser className={"text-white/70"}/>
                    </div>
                    <div className="flex flex-row w-full px-3 py-2 items-center rounded-xl bg-secondary">
                        <input
                        className="w-full outline-none text-white/90"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="password"
                        />
                        <FaLock className="text-white/70"/>
                    </div>
                    <div className="flex w-full justify-between sm:flex-col flex-row sm:text-center">
                        <div className="flex flex-row items-center text-button-primary">
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
                    <div className="flex w-full justify-center">
                        <button
                            type="button"
                            onClick={handleLogin}
                            className="w-[80%] py-2 rounded-2xl bg-button-primary text-white/80 font-bold"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginModal