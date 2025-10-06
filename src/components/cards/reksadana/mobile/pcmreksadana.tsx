import React from 'react'
import ChildCardMobileReksadana from './ccmreksadana'
import ChartMobileReksadana from '@/components/charts/chmreksadana'

interface pcrdProps {
    activeTab: string
}

const ParentCardMobileReksadana = ({activeTab}: pcrdProps) => {
    return (
        <div className={`
            flex flex-col gap-3 
            shadow transition-transform duration-500
            ${activeTab === 'reksadana' ? 'translate-x-0':'-translate-x-full'}`}>
            <ChartMobileReksadana />
            <div>
                <ChildCardMobileReksadana />
            </div>
        </div>
    )
}

export default ParentCardMobileReksadana
