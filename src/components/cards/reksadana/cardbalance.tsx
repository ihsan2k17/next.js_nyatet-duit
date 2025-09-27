import { fetchDatacard } from '@/hooks/services/fetchcardbalance'
import { CardData } from '@/models/icards'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FaCheckCircle, FaCreditCard, FaTimesCircle } from "react-icons/fa"
import { FcSimCardChip } from "react-icons/fc"

interface CardBalanceProps {
  sumPerPortfolio: number
  smallwidth: boolean
  loading: boolean
  card: CardData[]
  alert: string
}

const CardBalanced = ({ sumPerPortfolio, smallwidth, loading, card, alert}: CardBalanceProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  useEffect(() => {
    if (card.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % card.length)
    }, 15000) // 30 detik
    return () => clearInterval(interval)
  }, [card])

  const activeCard = card[currentIndex]

  const LoadingText = ({ text }: { text: string }) => {
      return (
        <div className="flex gap-0.5">
          {text.split('').map((char, index) => (
            <span
              key={index}
              style={{
                display: 'inline-block',
                animation: `bounce 1s infinite`,
                animationDelay: `${index * 0.05}s`,
              }}
            >
              {char}
            </span>
          ))}
          <style jsx>{`
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-6px); }
            }
          `}</style>
        </div>
      );
    };
  
  if(loading) {
    return (
      <div className="flex flex-col gap-2 w-[70%]">
        <LoadingText text={`Loading Your Balance ...`}/>
      </div>
    )
  }
  if (card.length === 0) {
    return <p className="text-center">{alert}</p>
  }
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
        <span className="font-bold text-xl opacity-90">
          {activeCard.nama || "Main Balance"}
        </span>
        <FaCreditCard className="text-2xl opacity-90" />
      </div>

      {/* Chip emas */}
      <div className="flex items-center mt-2">
        <FcSimCardChip className="text-9xl" />
      </div>

      {/* Balance */}
      <div className="mb-5">
        <p className="text-xs opacity-80">Total Balance</p>
        <h2 className="text-3xl font-bold tracking-wide">
          Rp {sumPerPortfolio.toLocaleString("id-ID")}
        </h2>
      </div>

      {/* Footer */}
      <div className="flex font-semibold justify-between opacity-80">
        <span className='text-lg'>{activeCard.bank}</span>
        {activeCard.isActive ? (
          <FaCheckCircle className="text-green-400 text-lg" />
        ) : (
          <FaTimesCircle className="text-red-400 text-lg" />
        )}
      </div>
    </div>
  )
  
}

export default CardBalanced
