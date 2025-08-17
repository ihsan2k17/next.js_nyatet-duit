"use client"

import useIsMobile from "@/hooks/ismobile";
import StartedDesktop from "./starteddesktop";



const GetStartedClient = () => {
    const isMobile = useIsMobile()
    return isMobile ? <>hp</> : <StartedDesktop />
}
export default GetStartedClient