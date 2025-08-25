'use client'

import { IMenus } from '@/models/imenus'
import axios from 'axios'
import { useEffect, useState } from 'react'

const IsMenus = () => {
    const [menus, setMenus] = useState<IMenus[]>([])
    const [isError, setIsError] = useState<string|null>(null)
    const [openParents, setOpenParents] = useState<number[]>([])

    useEffect(() => {
        const fetchdata = async () => {
            try{
                const res =  await axios.get("/api/menus",{withCredentials: true}) 
                if (res.data?.data && res.data.data.length) {
                    setMenus(res.data.data)                    
                } else {
                    setMenus([])
                    setIsError("Data Not Found")
                }
            } catch(err: unknown) {
                if(axios.isAxiosError(err))
                setIsError(err.message)
            }
        } 
        fetchdata()
    },[])
    const toggleParent = (id: number) => {
        setOpenParents((prev) => prev.includes(id) ? prev.filter((p) => p !== id): [...prev, id])
    }
    return {menus, isError, openParents, toggleParent }
}

export default IsMenus
