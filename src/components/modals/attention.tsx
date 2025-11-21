'use client'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'

interface AttentionsProps {
  show: boolean,
  onClose: () => void,
  onConfirm: () => void,
  Message: string,
  pbutton: string,
  title: string
}

const Attentions = ({ show, onClose, onConfirm, Message, pbutton, title }: AttentionsProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-white/20"
          >
            {/* Close Icon */}
            <motion.button
              initial={{scale:0}}
              animate={{scale:1}}
              whileHover={{scale:1.3}}
              onClick={onClose}
              className={`absolute -top-3 -right-3 bg-button-secondary text-white rounded-full
                 shadow-md p-2 hover:bg-gray-50 hover:text-button-secondary transition cursor-pointer`}
            >
              <IoClose className={`w-5 h-5`} />
            </motion.button>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="flex justify-center mb-4"
            >
              <BsFillInfoCircleFill className="w-20 h-20 text-button-primary drop-shadow-lg" />
            </motion.div>

            {/* Title */}
            <h2 className="text-3xl font-black bg-gradient-to-r from-button-secondary to-button-primary bg-clip-text text-transparent">
              {title}
            </h2>

            {/* Message */}
            <p className="text-gray-700 mt-3 leading-relaxed">{Message}</p>

            {/* Buttons */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={onConfirm}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-button-secondary to-button-primary 
                  text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition cursor-pointer"
              >
                {pbutton}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Attentions
