"use client"


import PaperPlane from "@/components/animations/paperplanestarted"
import bgimg from "../../public/bg.jpg";


const StartedDesktop = () => {
    return (
        <div className={`
            relative
            h-screen
            w-full overflow-hidden
            bg-gradient-to-b from-white to-primary flex items-center p-6
        `}>
            <div 
                className="absolute inset-0 h-screen bg-cover bg-center pointer-events-none z-0 opacity-20" 
                style={{backgroundImage:`url(${bgimg.src})`}}/>
            <div className="flex h-[30%] absolute top-0 left-0">
                
            </div>
            <div>
                <div className="flex h-screen absolute right-0 bottom-[-10%]">
                    <PaperPlane />
                </div>
                <div className="flex h-[50%] absolute right-0 bottom-[-15%]">
                    <PaperPlane />
                </div>
            </div>
            <div className="flex flex-col absolute h-screen w-[40%] items-start justify-center gap-2">
                <div className="flex flex-col w-full p-2 gap-5">
                    <h1 className="font-dancing-script font-black text-9xl text-button-primary">NYATET DUIT</h1>
                    <label className="text-xl text-button-secondary">Catetin duit kalian brokk!!!, biar Pemasukan, Pengeluaran, sama investasi
                        nya keliatan perbulan nya keliatan. Bisa juga buat jadi Acuan planning bulan depan kalian
                        ataupun tahun depan, anjayyyyy</label>
                </div>
            </div>
        </div>
    )
}

export default StartedDesktop