"use client"
import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import { BsExclamationTriangle } from "react-icons/bs"

interface AttentionsProps {
  show: boolean
  onClose: () => void
  onConfirm: () => void
  Message: string
}

const AttentionMobile = ({ show, onClose, onConfirm, Message }: AttentionsProps) => {
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
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 28 }}
            className="bg-white w-full rounded-t-2xl shadow-xl p-6"
          >
            {/* Drag indicator */}
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-5" />

            {/* Icon */}
            <div className="flex justify-center mb-5">
              <BsExclamationTriangle className="w-12 h-12 text-yellow-500" />
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-center text-gray-900 mb-2">
              Perhatian
            </h2>

            {/* Message */}
            <p className="text-gray-600 text-center leading-relaxed text-sm">
              {Message}
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onConfirm}
                className="w-full py-3 rounded-xl bg-yellow-500 text-white font-medium hover:bg-yellow-600 transition"
              >
                Lanjutkan
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className="w-full py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                Batal
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AttentionMobile
