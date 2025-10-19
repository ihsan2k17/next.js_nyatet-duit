'use client'

import React, { useEffect, useState } from 'react'
import LayoutDesktop from './layoutdesktop'
import LayoutMobile from './layoutmobile'
import { useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import useIsMobile from '@/hooks/ismobile'
import Loading40 from '@/components/animations/loading40'
import dynamic from 'next/dynamic'

interface ILayoutClient {
    children: React.ReactNode,
}

const LayoutClient = ({children}:ILayoutClient) => {
    const isMobile = useIsMobile()
    const router = useRouter()
    const [alertLogout, setAlertLogout] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [loading, setLoading] = useState(false)
    const [mounted, setIsmounted] = useState(false)

    const handleNav = () => {
        setLoading(true)
        router.push ("/login")
        
    }
    const Loading40 = dynamic(() => import('@/components/animations/loading40'), {
        ssr: false, // skip server-side rendering
    })
    useEffect(() => {
        setIsmounted(true)
    },[])
    const handleLogout = async () => {
        try{
            setLoading(true)
            const res = await axios.post("/api/logout", {}, {withCredentials: true})
            setAlertLogout(true)
            setLoading(false)
            setAlertMessage(res.data.message);
        } catch (err: unknown) {
            const error = err as AxiosError
            if (error.response) {
                setAlertMessage(error.message);
                setLoading(false)
                setAlertLogout(true);
            } else {
                setAlertMessage("Server error, coba lagi nanti");
                setLoading(false)
                setAlertLogout(true);
            }
        } finally {
            setLoading(false)
        }
    }
    
    if(!mounted ) return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-200">
            <Loading40 />
        </div>
    )
    return isMobile ? 
        <div className={`${loading ? "bg-black/40":"bg-transparent"}`}>
            <LayoutMobile 
                handleNav={handleNav} alertLogout={alertLogout} 
                setAlertLogout={setAlertLogout} alertMessage={alertMessage} 
                handleLogout={handleLogout}>{children}
            </LayoutMobile>
        </div> : 
        <div className={`${loading ? "cursor-progress":"cursor-auto"}`}>
            <LayoutDesktop 
                handleNav={handleNav} 
                alertLogout={alertLogout} setAlertLogout={setAlertLogout} 
                alertMessage={alertMessage}
                isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} handleLogout={handleLogout}>
                {children}
            </LayoutDesktop>
        </div>
}

export default LayoutClient
