import { CardData } from '@/models/icards'
import React, { useEffect, useState } from 'react'
import { BiMoney, BiCreditCardAlt } from 'react-icons/bi'
import { BsBank2 } from 'react-icons/bs'
import { FaWallet, FaCreditCard, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { FcSimCardChip } from 'react-icons/fc'
import { GiMicrochip, GiPayMoney } from 'react-icons/gi'

interface CardMMonthdBalanceProps {
  sumMonthPerPortfolio: number
  loading: boolean
  card: CardData[]
  alert: string
}

const CardMobileMonthBalance = ({sumMonthPerPortfolio, loading, card, alert}: CardMMonthdBalanceProps) => {
    
    const [currentIndex, setCurrentIndex] = useState(0)
    useEffect(() => {
        if (card.length === 0) return
        const interval = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % card.length)
        }, 12000) // 10 detik
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
            <LoadingText text={`Loading Your Month Balance ...`}/>
        </div>
        )
    }
    if (card.length === 0) {
        return <p className="text-center">{alert}</p>
    }
    
    return (
        <div className={`relative flex flex-1 min-w-[320px] w-full 
            bg-gradient-to-br from-indigo-500 via-indigo-700 to-purple-900
            rounded-2xl 
            shadow-xl 
            p-4 
            flex-col 
            justify-between 
            text-white
            overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 animate-pulse" />
            {/* Background Icon Pattern */}
                <div className="absolute inset-0 pointer-events-none">
                {/* Pojok kiri atas */}
                <div className="absolute -top-5 -left-5 opacity-10">
                    <FaWallet className="text-[90px]" />
                </div>

                {/* Pojok kanan bawah */}
                <div className="absolute bottom-0 right-0 rotate-12 opacity-10">
                    <BsBank2 className="text-[90px]" />
                </div>

                {/* Grid pattern nyebar */}
                <div className="absolute inset-0 flex justify-center items-center opacity-5">
                    <div className="grid grid-cols-4 grid-rows-2 gap-4">
                        <BiMoney className="text-2xl place-self-center" />
                        <FaWallet className="text-2xl place-self-center" />
                        <GiPayMoney className="text-2xl place-self-center" />
                        <BiCreditCardAlt className="text-2xl place-self-center" />
                        <FaCreditCard className="text-2xl place-self-center" />
                        <BiMoney className="text-2xl place-self-center" />
                        <FaWallet className="text-2xl place-self-center" />
                        <GiPayMoney className="text-2xl place-self-center" />
                    </div>
                </div>
            </div>
            {/* Header */}
            <div className="flex justify-between items-center gap-6">
                <span className="font-bold text-lg opacity-90">
                {activeCard.nama || "Main Balance"}
                </span>
                <FaCreditCard className="text-2xl opacity-90" />
            </div>

            {/* Chip emas */}
            <div className="flex items-center mt-2">
                <GiMicrochip className="text-3xl drop-shadow-lg rotate-75" />
            </div>

            {/* Balance */}
            <div className="mb-5">
                <p className="text-xs font-semibold opacity-80">Total Balance Month</p>
                <h2 className="text-lg font-bold tracking-wide">
                Rp {sumMonthPerPortfolio.toLocaleString("id-ID")}
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

export default CardMobileMonthBalance
