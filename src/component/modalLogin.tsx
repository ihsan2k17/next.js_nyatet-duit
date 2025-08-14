import { IoCloseCircle } from "react-icons/io5";

interface ILoginModal {
    children: React.ReactNode,
    ModalLogin: boolean,
    Close: () => void 
}

const LoginModal = ({children, ModalLogin, Close}: ILoginModal) => {
    if(!ModalLogin) return null;
    return (
        <div className="relative inset-0 z-50 flex w-full p-2">
            <button className="absolute top-0 right-0" onClick={Close}>
                <IoCloseCircle size={30}/>
            </button>
            <form className="flex 
                flex-col 
                z-10 
                gap-4 w-full pt-8 pb-8 pr-4 pl-4 bg-secondary/30 rounded-3xl border-2 border-button-primary">
                    {children}
            </form>
        </div>
    )
}

export default LoginModal