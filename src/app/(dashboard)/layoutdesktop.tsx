'use client'
import SideBar from '@/components/bars/sidebar'
import Breadcrumbs from '@/components/breadcrumb'
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
            <div className={`
                transition-width
                duration-500
                left-0
                `}>                
                <SideBar isCollapse={isCollapsed} setIsCollapse={setIsCollapsed} handleLogout={handleLogout} />
                <main
                    className={`flex-1 transition-all duration-500 overflow-y-auto 
                        ${isCollapsed ? "ml-16 w-[calc(100%-4rem)]":"ml-64 w-[calc(100%-16rem)]"}
                    `}
                >
                    <div className={`p-3 top-0 text-white`}>
                        <Breadcrumbs />
                    </div> 
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
