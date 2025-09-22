'use client'
import React from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { FaPaperPlane } from 'react-icons/fa6'
import { IMenus } from '@/models/imenus'
import { IoExitSharp } from 'react-icons/io5'
import DrawerItem from '../menus/draweritems'

interface DrawerProps {
    openDrawer: boolean
    handleClose: () => void
    parents: IMenus[]
    childrens: IMenus[]
    openParents: number[]
    toggleParent: (id: number) => void
    handleDragEnd: (_: unknown, info: PanInfo) => void
    handleLogout: () => void
}

const Drawer = ({
    openDrawer,
    handleClose,
    parents,
    childrens,
    openParents,
    toggleParent,
    handleDragEnd,
    handleLogout
}: DrawerProps) => {
    return (
        <AnimatePresence>
            {openDrawer && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/60 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleClose}
                    />

                    {/* Drawer panel */}
                    <motion.div
                        className={`fixed top-0 left-0 h-full w-64 z-50 shadow-xl rounded-tr-3xl rounded-br-3xl 
                            bg-button-primary  p-4 overflow-y-auto`}
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        drag="x"
                        dragConstraints={{ left: -300, right: 0 }}
                        dragElastic={0.15}
                        onDragEnd={handleDragEnd}
                    >
                        {/* Profile */}
                        <div className="flex flex-col text-white items-start p-6 border-b border-white/20 gap-3">
                            <FaPaperPlane size={46} />
                        </div>

                        {/* Menu */}
                        <nav className="py-4 flex flex-col gap-2">
                            {parents.map(parent => {
                                const parentChildren = childrens.filter(c => c.parent_id === parent.id)
                                return (
                                    <DrawerItem
                                        key={parent.id}
                                        item={parent}
                                        childrenItems={parentChildren}
                                        isOpen={openParents.includes(parent.id)}
                                        toggleParent={toggleParent}
                                        handleClose={handleClose}
                                    />
                                )
                            })}
                        </nav>
                        <div className={`absolute w-full bottom-10 px-5 py-5`}>
                            <div className={`flex flex-row gap-3 font-semibold text-white cursor-pointer`}
                                onClick={handleLogout}>
                                <IoExitSharp size={20}/>
                                <label>SignOut</label>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default Drawer
