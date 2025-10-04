import React from 'react'
import ChildCardMobileReksadana from './ccmreksadana'
import ChartsReksadana from '@/components/charts/chreksadana'
import ChartMobileReksadana from '@/components/charts/chmreksadana'

interface pcrdProps {
    activeTab: string
}

const ParentCardMobileReksadana = ({activeTab}: pcrdProps) => {
    return (
        <div className={`
            flex flex-col gap-2`}>
            <div>
                <ChartMobileReksadana />
            </div>
            <div>
                <ChildCardMobileReksadana />
            </div>
        </div>
    )
}

export default ParentCardMobileReksadana
