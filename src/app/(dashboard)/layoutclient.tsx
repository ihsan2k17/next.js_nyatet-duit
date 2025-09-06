'use client'

import React, { useState } from 'react'
import LayoutDesktop from './layoutdesktop'
import LayoutMobile from './layoutmobile'
import { useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import useIsMobile from '@/hooks/ismobile'

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
    const handleNav = () => {
        setLoading(true)
        router.push ("/login")
        
    }

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
        }
    }

    return isMobile ? 
        <LayoutMobile>{children}</LayoutMobile> : 
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
