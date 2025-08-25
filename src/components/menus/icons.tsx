'use client'

import * as io5 from "react-icons/io5"
import * as md from "react-icons/md"
import * as fa6 from "react-icons/fa6"
import * as fa from "react-icons/fa"
import { IconType } from "react-icons"

interface iconProps {
    lib?: string,
    name?: string,
    size?: number
}
const SidebarIcon = ({lib, name, size}: iconProps) => {
    if(!lib || !name ) return null
    let Icon: IconType | null = null
    switch(lib.toLowerCase()) {
        case 'fa': Icon = fa[name as keyof typeof fa]; break
        case 'io5': Icon = io5[name as keyof typeof io5]; break
        case 'md': Icon = md[name as keyof typeof md]; break
        case 'fa6': Icon = fa6[name as keyof typeof fa6]; break
    }
    return Icon ?  <Icon size={size} /> : null
}

export default SidebarIcon