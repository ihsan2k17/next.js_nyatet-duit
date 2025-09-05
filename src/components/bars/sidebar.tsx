'use client'

import React, { Dispatch, SetStateAction } from 'react'
import { IoExitSharp, IoMenu, IoMenuOutline } from 'react-icons/io5'
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
            bg-secondary 
            h-screen
            transition-width 
            duration-500 z-50
            fixed top-0 left-0 ${isCollapse ? "w-16" : "w-64"}`}>
            <button 
                onClick={toogleSidebar}
                className={`px-4 py-2 h-[10%] flex items-center cursor-pointer ${isCollapse ? "w-16":"w-64"}`}>
                    {isCollapse ? 
                        <IoMenu/> : 
                        <div className={`flex flex-row gap-4 items-center`}>
                            <IoMenuOutline />
                            <label className={`text-xl font-black text-gray-900`}>Nyatet Duit</label>
                        </div>
                    }
            </button>
            <div className='flex h-[45%]'>
                <MenuItems isCollapsed= {isCollapse} />
            </div>
            <div className={`flex flex-row h-[45%] items-end py-4`}>
                <div className={`flex items-center justify-between px-4 py-2 ${isCollapse ? "w-16" : "w-54"} rounded hover:bg-gray-200 cursor-pointer`}
                    onClick={handleLogout}>
                    {isCollapse ? 
                    <>
                        <div>
                            <IoExitSharp />
                        </div>
                    </> : 
                    <div className='flex gap-4 items-center'>
                        <IoExitSharp />
                        <label className={`transition-opacity duration-300 
                            ${isCollapse ? "opacity-0 delay-0":"opacity-100 delay-200"}`}>Logout</label>
                    </div>}
                </div>
            </div>
        </div>

    )
}

export default SideBar
