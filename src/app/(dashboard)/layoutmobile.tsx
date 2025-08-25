'use client'
import React from 'react'

interface ILayout {
    children: React.ReactNode,
}

const LayoutMobile = ({children}: ILayout) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default LayoutMobile
