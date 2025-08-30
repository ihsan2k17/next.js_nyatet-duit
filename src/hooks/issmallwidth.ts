import { useEffect, useState } from "react"

const useIsSmallWidth = (breakpoint= 1308) => {
    const [isSmallWidth, setIsSmallWidth] = useState(false)
    useEffect(() => {
        const checkScreen = () => {
            setIsSmallWidth(window.innerWidth <=breakpoint)
        }
        checkScreen()
        window.addEventListener("resize", checkScreen)
        return () => { window.removeEventListener("resize", checkScreen)}
    },[breakpoint])
    return isSmallWidth
}

export default useIsSmallWidth