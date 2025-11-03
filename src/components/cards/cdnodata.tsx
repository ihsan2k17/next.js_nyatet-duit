import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
interface cdnodataprops {
    onClick?: () => void
    label: string,
    buttonlabel: string
    redirectTo? :string
}
const CardDesktopNoData = ({onClick, label, buttonlabel, redirectTo}:cdnodataprops) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const handleClick = async () => {
        try{
            setLoading(true)
            await new Promise((res) => setTimeout(res, 300))
            if(onClick) {return await onClick()}
            else if(redirectTo) {return router.push(redirectTo)}
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div className={`flex flex-col w-full justify-center`}>
            <span className={`w-full text-lg font-semibold text-button-primary text-center`}>{label}</span>
            <div className={`flex justify-center p-2 items-center `}>
                <button 
                    onClick={handleClick}
                    disabled={loading}
                    className={`flex px-4 py-2 overflow-hidden shadow-lg rounded-2xl
                        bg-gradient-to-br from-blue-800 via-indigo-700 to-button-primary
                        ${loading ? 'opacity-70 cursor wait':'cursor-pointer'}
                        transition-all duration-300`}>
                    <span className={`text-sm text-white font-semibold`}>{buttonlabel}</span>
                </button>
            </div>
        </div>
    )
}

export default CardDesktopNoData
