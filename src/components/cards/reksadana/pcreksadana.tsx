'use client'
import React, { useEffect, useState } from 'react'
import ChildCardReksadana from './ccreksadana'
import ChartsReksadana from '@/components/charts/chreksadana'

interface pcrdProps {
    activeTab: string
}
const ParentCardReksadana = ({activeTab}: pcrdProps) => {
    
    return (
        <div className={`
            relative flex flex-col items-center gap-6 rounded-lg 
            shadow transition-transform duration-500
        ${activeTab === 'reksadana' ? 'translate-x-0' : '-translate-x-full'}`}>
            <ChildCardReksadana />
            <div className={`flex w-full`}>
                <ChartsReksadana />
            </div>
        </div>
    )
}

export default ParentCardReksadana
