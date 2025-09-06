'use client'
import Attentions from '@/components/modals/attention'
import AttentionMobile from '@/components/modals/mobile/attention'
import WarningMobile from '@/components/modals/mobile/warning'
import Warnings from '@/components/modals/warning'
import useIsMobile from '@/hooks/ismobile'
import React, { useState } from 'react'

const CekModalClient = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [pButton, setPButton] = useState('')
    const [rejectButton, setRejectButton] = useState('')
    const [title, setTitle] = useState('')
    const [modalType, setModalType] = useState<"attention" | "warning" | null>(null) // << tipe modal

    const useMobile = useIsMobile()

    const openAttention = () => {
        setTitle("Attention!!!")
        setMessage("Apakah kamu yakin ingin menghapus data ini? Data yang sudah dihapus tidak bisa dikembalikan.")
        setModalType("attention")
        setPButton("Hapus")
        setRejectButton("Cancel")
        setIsOpen(true)
    }

    const openWarning = () => {
        setTitle("Warning!!!")
        setMessage("Aksi ini berpotensi berbahaya, pastikan kamu yakin.")
        setModalType("warning")
        setIsOpen(true)
        setPButton("Accept")
        setRejectButton("Reject")
    }

    const handleClose = () => {
        setIsOpen(false)
        setModalType(null)
    }

    return (
        <div className='h-screen flex flex-col gap-5 items-center justify-center'>
        <button
            onClick={openAttention}
            className="px-5 py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
        >
            Buka Attention
        </button>

        <button
            onClick={openWarning}
            className="px-5 py-2 rounded-xl bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition"
        >
            Buka Warning
        </button>
        {!useMobile ? (
            <>
            {modalType === "attention" && (
                <Attentions
                show={isOpen}
                onClose={handleClose}
                onConfirm={handleClose}
                Message={message}
                pbutton={pButton}
                title={title}
                />
            )}
            {modalType === "warning" && (
                <Warnings
                show={isOpen}
                onClose={handleClose}
                onConfirm={handleClose}
                Message={message}
                confirmButton={pButton}
                title={title}
                />
            )}
            </>
        ) : (
            <>
            {modalType === "attention" && (
                <AttentionMobile
                    show={isOpen}
                    onClose={handleClose}
                    onConfirm={handleClose}
                    Message={message}
                    title={title}
                    pButton={pButton}
                    denyButton={rejectButton}
                />
            )}
            {modalType === "warning" && (
                <WarningMobile
                show={isOpen}
                onClose={handleClose}
                onConfirm={handleClose}
                Message={message}
                confirmButton={pButton}
                title={title}
                denyButton={rejectButton}
                />
            )}
            </>
            
        )}
        </div>
    )
}

export default CekModalClient
