'use client'
import Drawer from '@/components/bars/drawer'
import IsMenus from '@/hooks/ismenus'
import { PanInfo } from 'framer-motion'
import { usePathname } from 'next/navigation'
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { HiMenu } from 'react-icons/hi'

interface ILayout {
    children: React.ReactNode,
    handleNav: () => void,
    alertLogout: boolean,
    setAlertLogout: Dispatch<SetStateAction<boolean>>,
    alertMessage: string,
    handleLogout:() => void
}

const LayoutMobile = ({children, handleNav, alertLogout, setAlertLogout, alertMessage, handleLogout}: ILayout) => {
    const [openDrawer, setOpenDrawer] = useState(false)
    const { menus, isError, openParents, toggleParent } = IsMenus()
    const pathname = usePathname()
    if (isError) return <div className='text-red-500'>Error: {isError}</div>

    const parents = menus.filter(m => m.parent_id === null)
    const childrens = menus.filter(m => m.parent_id !== null)

    const handleDragEnd = (_: unknown, info: PanInfo) => {
        if (info.offset.x < -100 || info.velocity.x < -500) setOpenDrawer(false)
    }
    const activeMenuName = useMemo(() => {
        const allMenus = [...parents, ...childrens]
        const active = allMenus.find(m => m.route === pathname)
        return active ? active.nama : 'Nyatet Duit'
    }, [pathname, parents, childrens])

    return (
        <div className={`relative h-screen w-full flex flex-col`}>
            <header className="bg-button-primary p-4 flex items-center justify-between">
                <button
                    className="w-8 h-8 text-white"
                    onClick={() => setOpenDrawer(true)}
                >
                    <HiMenu size={28} />
                </button>
                <h1 className="text-white font-bold text-lg">{activeMenuName}</h1>
            </header>
            <main className="flex-1 overflow-auto">
                <Drawer
                    openDrawer={openDrawer}
                    handleClose={() => setOpenDrawer(false)}
                    parents={parents}
                    childrens={childrens}
                    openParents={openParents}
                    toggleParent={toggleParent}
                    handleDragEnd={handleDragEnd} // pass ke Drawer
                    handleLogout={handleLogout}                />
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
    )
}

export default LayoutMobile
