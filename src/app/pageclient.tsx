"use client"

import useIsMobile from "@/hooks/ismobile";
import StartedDesktop from "./starteddesktop";
import StartedMobile from "./startedmobile";



const GetStartedClient = () => {
    const isMobile = useIsMobile()
    return isMobile ? <StartedMobile /> : <StartedDesktop />
}
export default GetStartedClient