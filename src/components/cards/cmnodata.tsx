import { useRouter } from 'next/navigation'
import React from 'react'
import { FaPlus } from 'react-icons/fa6'

interface cmnodataprops {
    onClick?: () => void
    label: string,
    buttonlabel: string
    redirectTo? :string
}

const CardMobileNoData = ({onClick, label, buttonlabel, redirectTo}: cmnodataprops) => {
    const router = useRouter()
    const handleClick = () => {
        if(onClick) return onClick()
        if(redirectTo) return router.push(redirectTo)
    }
    return (
        <div className={`flex flex-col gap-4 w-full mt-4 justify-center items-center`}>
            <span className={`text-sm font-semibold text-button-primary text-center p-2`}>{label}</span>
            <button 
                onClick={handleClick}
                className={`flex flex-row items-center gap-2 
                    p-2.5 shadow-lg overflow-hidden rounded-xl
                    bg-gradient-to-br from-blue-800 via-indigo-800 to-button-primary
                    hover:scale-105 transition-all duration-200`}>
                <FaPlus size={14} className={`text-white`}/>
                <label className={`text-sm text-white font-semibold text-center`}>{buttonlabel}</label>
            </button>
        </div>
    )
}

export default CardMobileNoData
