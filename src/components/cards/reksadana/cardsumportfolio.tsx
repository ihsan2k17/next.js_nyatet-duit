import React from 'react';
import { FiTrendingUp } from 'react-icons/fi';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";

interface Props {
  sumPerPortfolio: Record<string, number>;
  countProduct: Record<string, number>
}

const DSumPortfolio = ({sumPerPortfolio, countProduct}:Props) => {
    const items = Object.entries(sumPerPortfolio);
    const groupedItems= [];
    for (let i = 0; i < items.length; i += 2) {
        groupedItems.push(items.slice(i, i + 2));
    }
    const renderCard = (portfolio: string, total: number, productCount: number) => (
        <div
        key={portfolio}
        className="
            relative group rounded-2xl overflow-hidden shadow-lg
            bg-gradient-to-br from-blue-800 via-indigo-700 to-violet-600
            transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl
            p-[2px]
        "
        >
            <div
                className="
                relative flex flex-col justify-between h-full p-4 rounded-2xl
                bg-white/10 backdrop-blur-md
                "
            >
                <div className="absolute inset-0">
                <div className="absolute top-[-30%] right-[-20%] w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-20 h-20 bg-indigo-400/30 rounded-full blur-2xl"></div>
                </div>

                <div className="relative z-10 flex flex-col text-white">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-wide uppercase opacity-90">
                    {portfolio}
                    </span>
                    <FiTrendingUp className="w-5 h-5 text-white/80 group-hover:rotate-12 transition-transform" />
                </div>

                <div className="mt-2 text-sm sm:text-base font-bold tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                    {total.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    })}
                </div>

                <div className="mt-3 flex items-center gap-1 text-[10px] text-white/85">
                    <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse"></div>
                    <span>{productCount} Produk</span>
                </div>
                </div>
            </div>

            <div
                className="
                absolute inset-0 opacity-0 group-hover:opacity-100
                bg-gradient-to-tr from-white/10 to-transparent
                transition-opacity duration-500
                "
            ></div>
        </div>
    );

    // Kalau datanya <= 2 → tampil grid biasa
    if (items.length <= 2) {
        return (
        <div className="w-full py-6">
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 px-3">
            {items.map(([portfolio, total]) =>
                renderCard(portfolio, total, countProduct[portfolio] || 0)
            )}
            </div>
        </div>
        );
    }

    // Kalau datanya > 2 → aktifin slider
    return (
        <div className="w-full py-6 px-2">
            <Swiper
                modules={[Autoplay, Pagination]}
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{
                delay: 0,
                disableOnInteraction: false,
                }}
                speed={8000}
                spaceBetween={20}
                className="w-full"
            >
                {groupedItems.map((group, idx) => (
                <SwiperSlide key={idx}>
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 px-3">
                    {group.map(([portfolio, total]) =>
                        renderCard(portfolio, total, countProduct[portfolio] || 0)
                    )}
                    </div>
                </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default DSumPortfolio
