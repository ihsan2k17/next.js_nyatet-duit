"use client"

import useIsMobile from "@/hooks/ismobile";
import StartedDesktop from "./starteddesktop";
import StartedMobile from "./startedmobile";
import { useRouter } from "next/navigation";
import { useState } from "react";



const GetStartedClient = () => {
    const isMobile = useIsMobile()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleClick = () => {
        setLoading(true)
        router.push("/login")
    }

    return isMobile ? 
        <StartedMobile handleClick={
            () => {
                setTimeout(() => {
                    router.push("/login")
                },300)
            }
        }/> : 
        <div className={`${loading? "cursor-wait":"cursor-auto"}`}><StartedDesktop handleClick={handleClick} /></div>
}
export default GetStartedClient