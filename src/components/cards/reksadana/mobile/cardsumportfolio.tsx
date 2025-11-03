import React, { useEffect } from "react";
import { FiTrendingUp} from "react-icons/fi";

interface Props {
  sumNamePerPortfolio: Record<string,number>;
  countProduct: Record<string, number>
}


const MSumPortfolio = ({ sumNamePerPortfolio, countProduct }: Props) => {
    const items = Object.entries(sumNamePerPortfolio);

    return (
        <div className="w-full py-6">
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 px-3">
                {items.map(([portfolio, total], idx) => {
                const productCount = countProduct[portfolio] || 0
                return (
                    <div
                    key={portfolio}
                    className="relative rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] p-2 h-18 flex flex-col justify-center"
                    >
                    {/* background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-violet-500 to-purple-500 opacity-90"></div>

                    {/* dekorasi lingkaran blur */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-white/30 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white/20 rounded-full blur-lg"></div>

                    {/* content */}
                    <div className="relative text-white flex flex-col justify-center h-full">
                        <div className="flex pt-1 items-center justify-between">
                            <span className="text-xs font-semibold drop-shadow-md">{portfolio}</span>
                            <FiTrendingUp className="w-4 h-4 text-white/80" />
                        </div>
                            <span className="text-sm font-bold drop-shadow-lg">
                            {total.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                            })}
                            </span>
                            <span className="text-[10px] mt-3 text-white/90 drop-shadow-sm">
                                Products: {productCount}
                            </span>
                        </div>
                    </div>
                );
                })}
            </div>
        </div>
    );
};

export default MSumPortfolio;
