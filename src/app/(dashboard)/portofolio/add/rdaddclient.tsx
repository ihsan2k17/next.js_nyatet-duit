'use client'
import useIsMobile from '@/hooks/ismobile'
import React, { useEffect, useState } from 'react'
import RDAddPortfolioMobile from './rdaddmobile'
import RDAddPortfolioDesktop from './rdadddesktop'

const RDAddPortfolioClient = () => {
    const isMobile = useIsMobile()
    const [loading, setLoading] = useState(false)

    // contoh simulasi loading
    useEffect(() => {
        setLoading(true) 
        const timer = setTimeout(() => {
            setLoading(false) // setelah 2 detik loading selesai
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className={`${loading ? "cursor-progress" : "cursor-auto"}`}>
            {isMobile ? <RDAddPortfolioMobile /> : <RDAddPortfolioDesktop />}
        </div>
    )
}

export default RDAddPortfolioClient
