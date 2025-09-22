'use client'
import React from 'react'
import Link from 'next/link'
import SidebarIcon from '@/components/menus/icons'
import { MdOutlineNavigateNext } from 'react-icons/md'

interface DrawerItemProps {
    item: any
    childrenItems?: any[]
    isOpen?: boolean
    toggleParent?: (id: number) => void
    handleClose: () => void
}

const DrawerItem = ({ item, childrenItems = [], isOpen = false, toggleParent, handleClose }: DrawerItemProps) => {
    const hasChildren = childrenItems.length > 0

    return (
        <div>
            {/* Parent */}
            <div className="flex items-center justify-between text-white gap-2 px-4 py-2 rounded hover:bg-white/10">
                <Link
                    href={item.route}
                    className="flex items-center gap-4"
                    onClick={handleClose}
                >
                    <SidebarIcon lib={item.icon || undefined} name={item.iconname || undefined} size={20} />
                    <span className="font-semibold">{item.nama}</span>
                </Link>

                {hasChildren && toggleParent && (
                    <span
                        className="cursor-pointer"
                        onClick={() => toggleParent(item.id)}
                    >
                        {isOpen ? <MdOutlineNavigateNext className="rotate-90" /> : <MdOutlineNavigateNext />}
                    </span>
                )}
            </div>

            {/* Children */}
            {hasChildren && isOpen && (
                <div className="ml-6 flex flex-col gap-1">
                    {childrenItems.map(child => (
                        <Link
                            key={child.id}
                            href={child.route}
                            className="flex items-center gap-4 px-4 py-2 rounded hover:bg-white/20 text-white text-sm"
                            onClick={handleClose}
                        >
                            {child.nama}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DrawerItem
