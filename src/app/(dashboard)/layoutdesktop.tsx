'use client'
import SideBar from '@/components/bar/sidebar'
import ButtonLogout from '@/components/logout/buttonlogout'
import React, { Dispatch, SetStateAction } from 'react'

interface ILayout {
    children: React.ReactNode,
    handleNav: () => void,
    alertLogout: boolean,
    setAlertLogout: Dispatch<SetStateAction<boolean>>,
    alertMessage: string,
    isCollapsed: boolean,
    setIsCollapsed: Dispatch<SetStateAction<boolean>>,
    handleLogout: () => void
}

const LayoutDesktop = ({
    children, handleNav,
    alertLogout, setAlertLogout,
    alertMessage,
    isCollapsed, setIsCollapsed,
    handleLogout}:ILayout) => {
    
    
    return (
        <div className='flex flex-col'>
            <header className='flex flex-row w-full justify-between pr-2'>
                INI HEADER BROKKKK ANJAYYYYYYYY
                <ButtonLogout handleLogout={handleLogout} />
            </header>
            <div className={`
                bg-gradient-to-b 
                from-primary to-secondary h-screen 
                transition-width
                duration-500
                ${isCollapsed ? "ml-[4rem]" : "ml-[16rem]"} flex`}>
                <SideBar isCollapse={isCollapsed} setIsCollapse={setIsCollapsed} handleLogout={handleLogout} />
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
                {alertLogout && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded shadow-md max-w-sm text-center">
                        <p className="text-lg font-medium">{alertMessage}</p>
                        <button
                            onClick={() => {
                                setAlertLogout(false)
                                handleNav()}}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            OK
                        </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LayoutDesktop
