import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import { FaRegThumbsUp } from 'react-icons/fa6'
interface SuccessProps {
  show: boolean
  onConfirm: () => void
  Message: string,
  title: string,
  confirmTitleButton: string,
}
const SuccessMobile = ({show, onConfirm, Message, title, confirmTitleButton
}:SuccessProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    useEffect(()=>{
        const handleClickOutSide = async (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest(".modals-container")) {
                onConfirm()
            }
        }
        if(show) {
            document.addEventListener("mousedown", handleClickOutSide);
        }
        return () => document.removeEventListener("mousedown", handleClickOutSide);
    },[show, onConfirm])
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-end"
                >
                    <motion.div
                        ref ={containerRef}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", stiffness: 200, damping: 28 }}
                        className="bg-white w-full rounded-t-2xl shadow-xl p-6 modals-container"
                    >
                        {/* Drag indicator */}
                        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-5" />
                        {/* Icon */}
                        <div className="flex justify-center mb-5">
                            <FaRegThumbsUp className="w-12 h-12 text-emerald-600" />
                        </div>
                        {/* Title */}
                        <h2 className="text-xl font-semibold text-center text-emerald-600 mb-2">{title}</h2>
                        {/* Message */}
                        <p className="text-emerald-900 text-center leading-relaxed text-sm">{Message}</p>
                        {/* Buttons */}
                        <div className="mt-6 flex flex-col gap-3">
                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                onClick={onConfirm}
                                className={`w-full py-3 rounded-xl bg-emerald-500 text-white 
                                font-medium hover:bg-white hover:text-emerald-600 transition`}
                            >
                                {confirmTitleButton}
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default SuccessMobile
