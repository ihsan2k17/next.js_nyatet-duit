import { AnimatePresence, motion } from 'framer-motion'
import React, { CSSProperties, Dispatch, ReactNode, SetStateAction, useEffect, useRef } from 'react'
import { HiOutlineX } from 'react-icons/hi'
interface ModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  onClose: () => void
  children: ReactNode
  title?: string
  className?: string
  style?:CSSProperties
  showClose?: boolean
}

const ModalAction = ({isOpen, setIsOpen, onClose, children,title, className,style, showClose}:ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
            modalRef.current &&
            !modalRef.current.contains(event.target as Node)
            ) {
            setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <AnimatePresence>
        {isOpen && (
            <>
            {/* Overlay */}
            <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />

            {/* Modal wrapper */}
            <motion.div
                className={`fixed inset-0 z-50 flex items-center justify-center p-5`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.25, type: 'spring', stiffness: 300 },
                }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                
            >
                {/* Modal box */}
                <motion.div
                    ref={modalRef}
                    className={`
                        bg-white 
                        dark:bg-white 
                        rounded-2xl 
                        shadow-2xl
                        border 
                        border-gray-200 
                        dark:border-gray-700 ${className}`}
                    style={style}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { duration: 0.25 } }}
                    exit={{ y: -20, opacity: 0, transition: { duration: 0.2 } }}
                    onClick={(e) => e.stopPropagation()}
                    >
                    {/* Tombol close ngegantung */} 
                    {showClose ? (
                        <button 
                            onClick={onClose} 
                            className={`
                                absolute -top-4 -right-4 w-10 h-10 
                                flex items-center justify-center 
                                rounded-full bg-white dark:bg-button-primary 
                                shadow-lg hover:bg-gray-200 dark:hover:bg-button-secondary 
                                text-white transition text-xl`} > 
                            <HiOutlineX size={18}/> 
                        </button>
                    ):(<></>)}
                    {/* Header */}
                    {title && (
                        <h3 className={`
                            text-xl font-semibold \
                            text-gray-900 dark:text-button-primary 
                            ${title ? 'mb-5 p-5 border-b-2':''}`}>
                        {title}
                        </h3>
                    )}

                    {/* Content */}
                    <div className="space-y-4 px-4 pb-2">{children}</div>
                </motion.div>
            </motion.div>
            </>
        )}
        </AnimatePresence>
    )
}

export default ModalAction
