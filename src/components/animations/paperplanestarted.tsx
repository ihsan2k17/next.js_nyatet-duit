

import { useLottie } from "lottie-react"
import paperplane from "../../../public/lottie/Airplane Lottie Animation.json"

const PaperPlane =()=>{

    const planeStyle = {
        widht: "100%",
        height: "100%"
    }
    const planeAnimation = {
        animationData: paperplane,
        loop: true,
        autoplay: true,
    }
    const {View} = useLottie(planeAnimation, planeStyle )

    return (<div className="h-full w-full">{View}</div>)
}

export default PaperPlane