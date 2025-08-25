'use client'

import SidebarIcon from '@/components/menus/icons'
import IsMenus from '@/hooks/ismenus'
import Link from 'next/link'
import React, {  } from 'react'
import { MdOutlineNavigateNext } from 'react-icons/md'

interface menusProps {
    isCollapsed: boolean
}

const MenuItems = ({isCollapsed}: menusProps) => {
    const {menus, isError, openParents, toggleParent} = IsMenus()
    if(isError) {
        return <div className='text-red-500'>Error:{isError}</div> 
    }
    const parents = menus.filter(m => m.parent_id === null)
    const children = menus.filter(m => m.parent_id !== null)

    return (
        <nav className="py-4">
            <ul className="space-y-2">
                {parents.map(parent => { 
                    const parentchildren = children.filter(c=> c.parent_id === parent.id)
                    const haschildren = parentchildren.length > 0
                    return(
                    <li key={parent.id}>
                        <div className="flex items-center justify-between gap-2 px-4 py-2 rounded hover:bg-gray-200">
                            <Link href={parent.route} className="flex items-center gap-4">
                                <SidebarIcon lib={parent.icon || undefined} name={parent.iconname || undefined} size={20}/>
                                <span className={`ml-4 transition-opacity duration-300 ${
                                    isCollapsed ? "opacity-0 delay-0" : "opacity-100 delay-200"}`}>
                                    {!isCollapsed ? parent.nama : null }
                                </span>
                            </Link>

                            {haschildren && (
                                <span 
                                    className={`ml-4 cursor-pointer transition-opacity duration-300 ${
                                        isCollapsed ? "opacity-0 delay-0" : "opacity-100 delay-200"}`} 
                                    onClick={() => toggleParent(parent.id)}>
                                {openParents.includes(parent.id) ? <MdOutlineNavigateNext className='rotate-90'/> : <MdOutlineNavigateNext/>}
                                </span>
                            )}
                        </div>

                        {/* render children jika parent terbuka */}
                        {openParents.includes(parent.id) && (
                            <ul className="ml-6 space-y-1">
                                {children.filter(c => c.parent_id === parent.id).map(child => (
                                    <li key={child.id}>
                                        <Link href={child.route} className="flex items-center gap-4 px-4 py-2 rounded hover:bg-gray-200">
                                            <span className={`ml-4 transition-opacity duration-300 ${isCollapsed ? "opacity-0 delay-0" : "opacity-100 delay-200"}`}>
                                                {child.nama}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                )})}
            </ul>
        </nav>
    )
}

export default MenuItems
