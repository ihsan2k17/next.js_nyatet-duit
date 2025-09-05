'use client'

import React from 'react'

interface IButtonLogout {
    handleLogout: () => void
}

const ButtonLogout = ({handleLogout}:IButtonLogout) => {
    
    return (
        <div className="flex flex-col p-2 ">
                <button className="
                    border-3 
                    border-button-primary
                    bg-secondary
                    p-2 rounded-4xl text-xl 
                    font-ubuntu font-black
                    text-button-secondary
                    hover:text-white/40
                    hover:bg-button-primary/10
                    hover:border-button-secondary/20"
                    onClick={() => {
                        handleLogout()
                    }}>Logout</button>
        </div>
    )
}

export default ButtonLogout
