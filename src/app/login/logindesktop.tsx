import Image from "next/image";
import { Dispatch, SetStateAction} from "react";
import bgimg from "../../../public/bg.jpg";
import paperplane from "../../../public/paper-plane-freepik.png";
import CardRegisterDesktop from "@/components/cards/cdregister";
import CardLoginDesktop from "@/components/cards/cdlogin";

interface ILoginDesktop {
    handleLogin: () => void,
    handleLoginGoogle : () => void,
    handleRegisGoogle: () => void,
    handleRegister: () => void,
    username: string, setUsername: Dispatch<SetStateAction<string>>,
    password: string, setPassword: Dispatch<SetStateAction<string>>,
    name: string, setName: Dispatch<SetStateAction<string>>,
    email: string, setEmail: Dispatch<SetStateAction<string>>,
    rememberme: boolean, setRememberme: Dispatch<SetStateAction<boolean>>,
    modalRegister: boolean, setModalRegister: Dispatch<SetStateAction<boolean>>,
    alertLogin: boolean, setAlertLogin: Dispatch<SetStateAction<boolean>>,
    alertErrorLogin: boolean, setAlertErrorLogin: Dispatch<SetStateAction<boolean>>,
    alertRegis:boolean, setAlertRegis: Dispatch<SetStateAction<boolean>>,
    alertMessage: string, alertErrorMessage: string
    handleNavigation: () => void
}
const LoginDesktop = ({
    handleLogin, handleLoginGoogle, handleRegisGoogle,handleRegister, 
    username, setUsername, 
    password, setPassword, 
    name, setName,
    email, setEmail,
    rememberme, setRememberme,
    modalRegister, setModalRegister,
    alertLogin, setAlertLogin,
    alertErrorLogin, setAlertErrorLogin,
    alertRegis, setAlertRegis,
    alertMessage, alertErrorMessage,
    handleNavigation}: ILoginDesktop) => {

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
            {!modalRegister ? (<CardLoginDesktop 
                handleLogin={handleLogin}
                handleLoginGoogle={handleLoginGoogle}
                username={username} setUsername={setUsername}
                password={password} setPassword={setPassword}
                rememberme={rememberme} setRememberme={setRememberme} 
                openRegis={() => {setModalRegister(true)}}/>) : 
                (<CardRegisterDesktop 
                closeRegis={() => {setModalRegister(false)}}
                handleRegis={handleRegister}
                handleRegisGoogle={handleRegisGoogle}
                username={username} setUsername={setUsername}
                password={password} setPassword={setPassword}
                name={name} setName={setName}
                email={email} setEmail={setEmail}/>)}
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
            {alertErrorLogin && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-md max-w-sm text-center">
                    <p className="text-lg font-medium">{alertErrorMessage}</p>
                    <button
                        onClick={() => {setAlertErrorLogin(false)}}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        OK
                    </button>
                    </div>
                </div>
            )}
            {alertRegis && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-md max-w-sm text-center">
                    <p className="text-lg font-medium">{alertMessage}</p>
                    <button
                        onClick={() => {
                            setAlertRegis(false)
                            setModalRegister(false)
                            }}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        OK
                    </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LoginDesktop