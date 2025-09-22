'use client'
import useIsMobile from '@/hooks/ismobile'
import { useScroll } from 'framer-motion'
import React, { useState } from 'react'
import PortfolioDesktop from './portfoliodesktop'

const PortfolioClient = () => {
    const isMobile = useIsMobile()
    const [loading, setLoading] = useState(false)
    return !isMobile ? 
    <div className={`${loading ? "cursor-progress":"cursor-auto"}`}>
        <PortfolioDesktop />
    </div> :
    <div></div>
}

export default PortfolioClient
