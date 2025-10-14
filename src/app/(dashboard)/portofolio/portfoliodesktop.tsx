'use client'
import ParentCardReksadana from '@/components/cards/reksadana/pcreksadana'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'

import { unstable_ViewTransition as ViewTransition } from 'react'

interface PDProps {
    
}

const PortfolioDesktop = ({}: PDProps) => {
    const [activeTab, setActiveTab] = useState("reksadana")
    const [direction, setDirection ] = useState(1)
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
        <div className={`flex flex-col`}>
            <div className={`flex flex-col bg-white p-2`}>
                <div className={`text-2xl font-bold pl-1 pb-4 text-button-primary`}>
                    <h1>Nilai Portfolio Yang Lu Punya</h1>
                </div>
                <div className={`flex-row `}>
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
                        className={`flex-1 p-2 px-8 text-center cursor-pointer rounded
                            ${activeTab === "saham" ? 
                                "border-2 bg-button-primary text-white font-bold rounded":
                                "text-button-primary font-bold"}`}>
                        Saham
                    </button>
                </div>
                <AnimatePresence mode='wait' custom={direction}>
                    <div className={`relative mt-5 items-start justify-start overflow-hidden`}>
                        {activeTab === 'reksadana' && (
                            <motion.div
                            key="reksadana"
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{duration:0.25, ease: 'easeInOut'}}>
                                <ParentCardReksadana activeTab={activeTab}/>
                            </motion.div>
                        )}
                        {activeTab === 'saham' &&(
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
            </div>
        </div>
    )
}

export default PortfolioDesktop
