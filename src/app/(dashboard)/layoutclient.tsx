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

    const handleNav = () => {
        console.log("navigasi ke home harus nya")
        router.push ("/login")
    }

    const handleLogout = async () => {
        try{
            const res = await axios.post("/api/logout", {}, {withCredentials: true})
            setAlertLogout(true)
            setAlertMessage(res.data.message);
        } catch (err: unknown) {
            const error = err as AxiosError
            if (error.response) {
                setAlertMessage(error.message);
                setAlertLogout(true);
            } else {
                setAlertMessage("Server error, coba lagi nanti");
                setAlertLogout(true);
            }
        }
    }

    return isMobile ? 
        <LayoutMobile>{children}</LayoutMobile> : 
        <LayoutDesktop 
            handleNav={handleNav} 
            alertLogout={alertLogout} setAlertLogout={setAlertLogout} 
            alertMessage={alertMessage}
            isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} handleLogout={handleLogout}>
            {children}
        </LayoutDesktop>
}

export default LayoutClient
