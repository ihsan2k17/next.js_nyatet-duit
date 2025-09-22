import React from 'react'
import { FaCreditCard } from "react-icons/fa"
import { FcSimCardChip } from "react-icons/fc"

interface CardBalanceProps {
  sumPerPortfolio: number
  portfolioName: string
  smallwidth: boolean
}

const CardBalanced = ({ sumPerPortfolio, portfolioName, smallwidth }: CardBalanceProps) => {
  return (
    <div className={`
      relative ${smallwidth ? "w-full" : "w-[35%]"}
      bg-gradient-to-r from-secondary via-button-secondary to-button-primary 
      rounded-2xl 
      shadow-xl 
      p-6 
      flex 
      flex-col 
      justify-between 
      text-white
    `}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="font-semibold text-sm opacity-90">
          {portfolioName || "Main Balance"}
        </span>
        <FaCreditCard className="text-2xl opacity-90" />
      </div>

      {/* Chip emas */}
      <div className="flex items-center mt-4">
        <FcSimCardChip className="text-9xl" />
      </div>

      {/* Balance */}
      <div className="mt-2">
        <p className="text-xs opacity-80">Total Balance</p>
        <h2 className="text-3xl font-bold tracking-wide">
          Rp {sumPerPortfolio.toLocaleString("id-ID")}
        </h2>
      </div>

      {/* Footer */}
      <div className="flex justify-between text-sm opacity-80">
        <span>Valid Thru 12/28</span>
        <span>•••• 1234</span>
      </div>
    </div>
  )
}

export default CardBalanced
