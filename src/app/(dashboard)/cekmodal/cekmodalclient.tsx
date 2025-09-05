'use client'
import Attentions from '@/components/modals/attention'
import AttentionMobile from '@/components/modals/mobile/attention'
import useIsMobile from '@/hooks/ismobile'
import React, { useState } from 'react'

const CekModalClient = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState('')
    const useMobile = useIsMobile()

    return (
        <div className='h-screen flex flex-col gap-5 items-center justify-center '>
            <button
                onClick={() => {
                    setMessage("Apakah kamu yakin ingin melanjutkan aksi ini? Data yang sudah dihapus tidak bisa dikembalikan.")
                    setIsOpen(true)}}
                
                className="px-5 py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
            >
                Buka Attention
            </button>
            {!useMobile ? <Attentions 
                show={isOpen} onClose={() => setIsOpen(false)} 
                onConfirm={() => setIsOpen(false)} 
                Message={message}/> : <AttentionMobile 
                show={isOpen} onClose={() => setIsOpen(false)} 
                onConfirm={() => setIsOpen(false)} 
                Message={message}/>}
            
        </div>
    )
}

export default CekModalClient
