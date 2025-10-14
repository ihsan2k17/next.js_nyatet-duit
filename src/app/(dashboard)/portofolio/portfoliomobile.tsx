'use client'

import ParentCardMobileReksadana from '@/components/cards/reksadana/mobile/pcmreksadana'
import { motion, AnimatePresence } from 'framer-motion'
import React, { useEffect, useState, useRef } from 'react'
import { unstable_ViewTransition as ViewTransition } from 'react'

const PortfolioMobile = () => {
    const [hidden, setHidden] = useState(false)
    const [lastScroll, setLastScroll] = useState(0)
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [activeTab, setActiveTab] = useState("reksadana")
    const [direction, setDirection] = useState(1)
    useEffect(() => {
        const handleScroll = () => {
        const container = scrollContainerRef.current
        if (!container) return
        const currentScroll = container.scrollTop

        if (currentScroll > lastScroll + 5) {
            setHidden(true) // scroll ke bawah → hide
        } else if (currentScroll < lastScroll - 5) {
            setHidden(false) // scroll ke atas → show
        }

        setLastScroll(currentScroll)
        }

        const container = scrollContainerRef.current
        container?.addEventListener('scroll', handleScroll, { passive: true })

        return () => container?.removeEventListener('scroll', handleScroll)
    }, [lastScroll])
    const variants = {
        enter: (direction: number) => ({
        x: direction > 0 ? 100 : -100,
        opacity: 0,
        }),
        center: {
        x: 0,
        opacity: 1,
        },
        exit: (direction: number) => ({
        x: direction > 0 ? -100 : 100,
        opacity: 0,
        }),
    }
    return (
        <div
            ref={scrollContainerRef}
            className="w-full h-screen overflow-auto relative"
            >
            {/* HEADER KONTEN */}
            <div className="text-xl font-bold pb-4 text-button-primary w-full">
                <h1 className={`text-center`}>Nilai Portfolio Yang Lu Punya</h1>
            </div>
            {/* Konten */}
            <AnimatePresence mode="wait" custom={direction}>   
                <div className="pt-2 w-full px-2">
                    {activeTab === 'reksadana' && (
                    <motion.div 
                        key="reksadana"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{duration:0.25, ease: 'easeInOut'}}>
                            <ParentCardMobileReksadana activeTab={activeTab} />
                    </motion.div>
                    )}

                    {activeTab === 'saham' && (
                    <motion.div
                        key="saham"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{duration:0.25, ease: 'easeInOut'}}>
                        <div className="flex flex-col items-center justify-center h-full py-10 bg-green-100 rounded-lg shadow">
                            <p className="text-green-700 font-semibold text-lg">Content Tab Saham</p>
                        </div>
                    </motion.div>
                    )}
                </div>
            </AnimatePresence>
            {/* Spacer supaya konten terakhir gak ketutup */}
            <div className="h-20"></div>

            {/* Bottom Bar */}
            <div
                className={`
                    fixed 
                    bottom-0 
                    flex 
                    justify-center 
                    items-center 
                    w-full pb-4 p-2
                    transition-transform duration-300 ${
                hidden ? 'translate-y-full' : 'translate-y-0'
                }`}
            >
                <div className='flex flex-row bg-white rounded w-full'>
                    <button 
                        onClick={() => {
                            setDirection(-1) 
                            setActiveTab("reksadana")}}
                        className={`flex-1 p-2 text-center cursor-pointer rounded
                            ${activeTab === "reksadana" ? 
                                "border-2 bg-button-primary text-white font-bold rounded":
                                "text-button-primary font-bold"}`}>
                        Reksadana
                    </button>
                    <button
                        onClick={() => {
                            setDirection(1)
                            setActiveTab("saham")}}
                        className={`flex-1 p-2 text-center cursor-pointer rounded
                            ${activeTab === "saham" ? 
                                "border-2 bg-button-primary text-white font-bold rounded":
                                "text-button-primary font-bold"}`}>
                        Saham
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PortfolioMobile
