"use client"
import PaperPlane from "@/components/animations/paperplanestarted";
import bgimg from "../../public/bg.jpg";
import Image from "next/image";
import paperplane from "../../public/paper-plane-freepik.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const StartedMobile = () => {
    const router = useRouter()
    const [datenow, setDateNow] = useState("")
        useEffect(() => {
            const tgl = new Date()
            setDateNow(tgl.getFullYear().toString())
        },[])
    const handleClick = () => {
        router.push("/login")
    }
    return (
        <div className={`flex relative h-screen max-w-[768px] overflow-hidden 
            bg-gradient-to-b from-white to-primary items-center justify-center`}>
            <div 
                className="absolute inset-0 h-screen bg-cover bg-center pointer-events-none z-0 opacity-20" 
                style={{backgroundImage:`url(${bgimg.src})`}}/>
            <div className="flex flex-col absolute h-screen w-full">
                <div className="absolute right-0 bottom-[10%]">
                    <PaperPlane />
                </div>
                <div className="absolute right-0 bottom-[-10%]">
                    <PaperPlane />
                </div>
            </div>
            <div className="absolute inset-0 flex">
                <div className="flex flex-col h-[90%] items-center justify-center gap-4 pt-20 ">
                    <div className="px-6">
                        <label className="font-ubuntu font-black text-5xl text-button-primary">NYATET DUIT</label>
                    </div>
                    <div className="flex w-[80%] justify-center py-10">
                        <Image src={paperplane} alt="paper plane for freepik" width={200} height={200} className="w-auto h-auto" priority/>
                    </div>
                    <div className="flex self-center max-w-[70%] p-4 rounded-lg">
                        <label className="text-center font-ubuntu text-md text-button-primary">
                            Catet Duit nya Woy, Katanya mau kaya, di catet Pengeluaran sama Pemasukannya anjayyy
                        </label>
                    </div>
                    <div className="flex p-4 px-20 max-h-15 bg-button-primary text-white rounded-3xl">
                        <button className=" font-black font-ubuntu text-xl " onClick={handleClick}>
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
            <div className="absolute flex w-full bottom-0 items-end justify-center">
                <label className="text-sm text-button-primary font-ubuntu font-bold">Powered by Nextjs, Freepik and Supabase, <span>&#169;</span> since {datenow}</label>
            </div>
        </div>
    )
}
export default StartedMobile