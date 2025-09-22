'use client'

import React, { Dispatch, SetStateAction } from 'react'
import { IoExitSharp, IoMenuOutline } from 'react-icons/io5'
import MenuItems from '../menus/menuitems'


interface ISidebarProps {
    isCollapse:boolean,
    setIsCollapse: Dispatch<SetStateAction<boolean>>,
    handleLogout: () => void
}

const SideBar = ({isCollapse, setIsCollapse, handleLogout}: ISidebarProps) => {
    const toogleSidebar = () => {
        setIsCollapse(!isCollapse)
    }
    return (
        <div className={`
            bg-button-primary 
            h-screen
            transition-width 
            duration-500 z-50
            fixed top-0 left-0 ${isCollapse ? "w-16" : "w-64"}`}>
            <button 
                onClick={toogleSidebar}
                className={`px-4 py-2 h-[10%] flex items-center text-white cursor-pointer ${isCollapse ? "w-16":"w-64"}`}>
                <IoMenuOutline />
                <span
                    className={`
                    text-xl font-black ml-4
                    transition-all duration-500 overflow-hidden
                    ${isCollapse ? "opacity-0 w-0" : "opacity-100 w-auto"}
                    `}
                >
                    Nyatet Duit
                </span>
            </button>
            <div className='flex h-[45%]'>
                <MenuItems isCollapsed= {isCollapse} />
            </div>
            <div className={`flex flex-row h-[45%] items-end py-4`}>
                <div className={`flex items-center justify-start gap-8 px-4 py-2 
                    ${isCollapse ? "w-16" : "w-54"} rounded text-white hover:bg-secondary cursor-pointer`}
                    onClick={handleLogout}>
                    <IoExitSharp />
                    <label className={`transition-opacity duration-300 overflow-hidden
                        ${isCollapse ? "opacity-0 delay-0":"opacity-100 delay-200"}`}>Logout</label>
                </div>
            </div>
        </div>

    )
}

export default SideBar
