import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { MdOutlineWarningAmber } from 'react-icons/md'
interface warningProps {
  show: boolean
  onClose: () => void
  onConfirm: () => void
  Message: string,
  title: string,
  confirmButton: string
  denyButton: string
}

const WarningMobile = ({show, onClose, onConfirm, Message, title, confirmButton, denyButton}:warningProps) => {
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
              <MdOutlineWarningAmber className="w-12 h-12 text-yellow-500" />
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-center text-yellow-500 mb-2">
              {title}
            </h2>

            {/* Message */}
            <p className="text-button-primary text-center leading-relaxed text-sm">
              {Message}
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onConfirm}
                className={`w-full py-3 rounded-xl bg-yellow-500 text-white 
                  font-medium hover:bg-white hover:text-yellow-500 transition`}
              >
                {confirmButton}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className="w-full py-3 rounded-xl border-2 border-yellow-500 text-gray-600 hover:bg-gray-100 transition"
              >
                {denyButton}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WarningMobile
