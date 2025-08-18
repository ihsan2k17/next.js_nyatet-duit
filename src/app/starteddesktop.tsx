import PaperPlane from "@/components/animations/paperplanestarted"
import bgimg from "../../public/bg.jpg";
import NavbarStarted from "@/components/bar/navbarstarted";
import { useEffect, useState } from "react";


const StartedDesktop = () => {
    const [datenow, setDateNow] = useState("")
    useEffect(() => {
        const tgl = new Date()
        setDateNow(tgl.getFullYear().toString())
    },[])
    return (
        <div className={`
            flex
            relative
            h-screen
            w-full overflow-hidden
            bg-gradient-to-b from-white to-primary items-center
        `}>
            <NavbarStarted />
            <div 
                className="absolute inset-0 h-screen bg-cover bg-center pointer-events-none z-0 opacity-20" 
                style={{backgroundImage:`url(${bgimg.src})`}}/>
            <div>
                <div className="flex h-screen absolute right-0 bottom-[-10%]">
                    <PaperPlane />
                </div>
                <div className="flex h-[50%] absolute right-0 bottom-[-15%]">
                    <PaperPlane />
                </div>
            </div>
            <div className="flex flex-col absolute h-screen w-[40%] items-start justify-center gap-2">
                <div className="flex flex-col w-full p-6 gap-5">
                    <label className="font-ubuntu font-black text-9xl text-button-primary">NYATET DUIT</label>
                    <label className="text-xl font-ubuntu font-semibold text-button-secondary">Catetin duit nya brokk!!!, 
                        biar Pemasukan, Pengeluaran, sama investasi
                        nya keliatan perbulan nya keliatan. Bisa juga buat jadi Acuan planning bulan depan kalian
                        ataupun tahun depan, anjayyyyy</label>
                </div>
            </div>
            <div className="absolute flex w-full bottom-0 items-end justify-center">
                <label className="text-md text-button-primary font-ubuntu font-bold">Powered by Nextjs, Freepik and Supabase, <span>&#169;</span> since {datenow}</label>
            </div>
        </div>
    )
}

export default StartedDesktop