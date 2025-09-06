'use client'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { BsExclamationTriangleFill } from 'react-icons/bs'
import { MdWarningAmber } from 'react-icons/md'

interface AttentionsProps {
    show: boolean,
    onClose: () => void,
    onConfirm: () => void,
    Message: string,
    title: string,
    confirmButton: string
}

const Warnings = ({show, onClose,onConfirm, Message, title, confirmButton}: AttentionsProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 flex items-center justify-center 
            bg-black/60 backdrop-blur-md z-50`}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 
              max-w-md w-full text-center border border-white/20`}
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="flex justify-center mb-4"
            >
              <MdWarningAmber className="w-20 h-20 text-yellow-400 drop-shadow-lg" />
            </motion.div>

            {/* Title */}
            <h2 className={`text-3xl font-black bg-gradient-to-r from-yellow-400 
              to-yellow-600 bg-clip-text text-transparent`}>
              {title}
            </h2>

            {/* Message */}
            <p className={`text-gray-700 mt-3 leading-relaxed`}>{Message}</p>

            {/* Buttons */}
            <div className={`mt-8 flex justify-center gap-4`}>
              <button
                onClick={onClose}
                className={`px-6 py-2 rounded-xl border border-gray-300 text-gray-600 
                  hover:bg-gray-100 hover:shadow-md transition`}
              >
                Batal
              </button>
              <button
                onClick={onConfirm}
                className={`px-6 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 
                  text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition`}
              >
                {confirmButton}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Warnings

