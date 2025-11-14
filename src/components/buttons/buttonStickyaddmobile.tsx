import React from 'react'
import { FaPlus } from 'react-icons/fa6'

interface addprops {
    onClick: () => void 
    className: string
}

const StickyAddMobile = ({onClick,className}:addprops) => {
    return (            
        <div className={`s
            fixed 
            bottom-0 
            flex 
            justify-center 
            items-center 
            w-full pb-10 p-2
            gap-1
            transition-transform duration-300`}>
            <div className='flex flex-1'></div>
            <div className='flex flex-1'></div>
            <div className='flex flex-1'></div>
            <div className='flex flex-1 justify-center items-center'>
                <button 
                    onClick={onClick}
                    className={className}>
                        <FaPlus size={30}/>
                </button>
            </div>
        </div>
    )
}

export default StickyAddMobile
