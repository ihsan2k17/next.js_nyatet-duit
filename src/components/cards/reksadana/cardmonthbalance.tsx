import { fetchDatacard } from '@/hooks/services/fetchcardbalance'
import { CardData } from '@/models/icards'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { BiCreditCardAlt, BiMoney } from 'react-icons/bi'
import { BsBank2 } from 'react-icons/bs'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { FaCreditCard, FaWallet } from 'react-icons/fa6'
import { FcSimCardChip } from 'react-icons/fc'
import { GiMicrochip, GiPayMoney } from 'react-icons/gi'

interface CardBalanceProps {
    sumMonthPerPortfolio: number
    smallwidth: boolean
    loading: boolean
    card: CardData[]
    alert : string
}

const CardMonthBalance = ({sumMonthPerPortfolio,smallwidth, loading, card, alert }: CardBalanceProps) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    

    useEffect(() => {
        if (card.length === 0) return
        const interval = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % card.length)
        }, 10000) // 10 detik
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
        <div
            className={`
            relative ${smallwidth ? "w-full" : "w-[35%]"}
            bg-gradient-to-br from-indigo-500 via-indigo-700 to-purple-900
            rounded-2xl 
            shadow-2xl 
            p-6 
            flex 
            flex-col 
            justify-between 
            text-white
            overflow-hidden
            `}
        >
            {/* Layer shimmer efek cahaya */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 animate-pulse" />

            {/* Background Icon Pattern */}
                <div className="absolute inset-0 pointer-events-none">
                {/* Pojok kiri atas */}
                <div className="absolute -top-10 -left-10 opacity-10">
                    <FaWallet className="text-[160px]" />
                </div>

                {/* Pojok kanan bawah */}
                <div className="absolute bottom-0 right-0 rotate-12 opacity-10">
                    <BsBank2 className="text-[120px]" />
                </div>

                {/* Grid pattern nyebar */}
                <div className="absolute inset-0 flex justify-center items-center opacity-5">
                    <div className="grid grid-cols-4 grid-rows-2 gap-6">
                        <BiMoney className="text-5xl place-self-center" />
                        <FaWallet className="text-5xl place-self-center" />
                        <GiPayMoney className="text-5xl place-self-center" />
                        <BiCreditCardAlt className="text-5xl place-self-center" />
                        <FaCreditCard className="text-5xl place-self-center" />
                        <BiMoney className="text-5xl place-self-center" />
                        <FaWallet className="text-5xl place-self-center" />
                        <GiPayMoney className="text-5xl place-self-center" />
                    </div>
                </div>
            </div>

            {/* Header */}
            <div className="flex justify-between items-center relative z-10">
                <span className="font-bold text-xl drop-shadow-md">
                    {activeCard.nama || "Main Balance"}
                </span>
                <FaCreditCard className="text-2xl opacity-90" />
            </div>

            {/* Chip emas */}
            <div className="flex items-center mt-2 relative z-10">
                <GiMicrochip className="text-9xl drop-shadow-lg rotate-75" />
            </div>

            {/* Balance */}
            <div className="mb-5 relative z-10">
                <p className="text-xs font-bold opacity-80">Total Balance Month</p>
                <h2 className="text-3xl font-bold tracking-wide drop-shadow-md">
                    Rp {sumMonthPerPortfolio.toLocaleString("id-ID")}
                </h2>
            </div>

            {/* Footer */}
            <div className="flex font-semibold justify-between opacity-90 relative z-10">
                <span className="text-lg">{activeCard.bank}</span>
                {activeCard.isActive ? (
                    <FaCheckCircle className="text-green-400 text-lg drop-shadow-md" />
                ) : (
                    <FaTimesCircle className="text-red-400 text-lg drop-shadow-md" />
                )}
            </div>
        </div>
    )


}

export default CardMonthBalance
