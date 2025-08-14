import { IoCloseCircle } from "react-icons/io5";

interface ILoginModal {
    children: React.ReactNode,
    ModalLogin: boolean,
    Close: () => void 
}

const LoginModal = ({children, ModalLogin, Close}: ILoginModal) => {
    if(!ModalLogin) return null;
    return (
        <div className="relative inset-0 flex w-full p-2">
            <form className="flex 
                flex-col 
                gap-4 w-full pt-8 pb-8 pr-4 pl-4 bg-secondary/30 rounded-3xl border-2 border-button-primary z-10 relative">
                    {children}
            </form>
        </div>
    )
}

export default LoginModal