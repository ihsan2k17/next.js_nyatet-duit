'use client'
import ParentCardReksadana from '@/components/cards/reksadana/pcreksadana'
import React, { useState } from 'react'
import { unstable_ViewTransition as ViewTransition } from 'react'

interface PDProps {
    
}

const PortfolioDesktop = ({}: PDProps) => {
    const [activeTab, setActiveTab] = useState("reksadana")

    return (
        <div className={`flex flex-col`}>
            <div className={`flex flex-col bg-white p-2`}>
                <div className={`text-2xl font-bold pl-1 pb-4 text-button-primary`}>
                    <h1>Nilai Portfolio Yang Lu Punya</h1>
                </div>
                <div className={`flex-row `}>
                    <button 
                        onClick={() => {setActiveTab("reksadana")}}
                        className={`flex-1 p-2 text-center cursor-pointer rounded
                            ${activeTab === "reksadana" ? 
                                "border-2 bg-button-primary text-white font-bold rounded":
                                "text-button-primary font-bold"}`}>
                        Reksadana
                    </button>
                    <button
                        onClick={() => {setActiveTab("saham")}}
                        className={`flex-1 p-2 px-8 text-center cursor-pointer rounded
                            ${activeTab === "saham" ? 
                                "border-2 bg-button-primary text-white font-bold rounded":
                                "text-button-primary font-bold"}`}>
                        Saham
                    </button>
                </div>
                <ViewTransition>
                    <div className={`relative mt-5 items-start justify-start overflow-hidden`}>
                        <ParentCardReksadana activeTab={activeTab}/>
                        <div
                        className={`absolute inset-0 h-full flex items-center justify-center rounded-lg shadow transition-transform duration-500 ${
                            activeTab === 'saham'
                            ? 'translate-x-0 bg-green-100'
                            : 'translate-x-full'
                        }`}
                        >
                        <p className="text-green-700 font-semibold text-lg">Content Tab 2</p>
                        </div>
                    </div>
                </ViewTransition>
            </div>
        </div>
    )
}

export default PortfolioDesktop
