'use client'

import React from 'react'
import {useLottie} from 'lottie-react'
import loading40 from "../../../public/lottie/Loading40_Paperplane.json"
const Loading40 = () => {
    const loadingStyle = {
        width: "100%",
        height: "100%"
    }
    const loadingAnimation = {
        animationData: loading40,
        loop:true,
        autoplay: true
    }
    const {View} = useLottie(loadingAnimation, loadingStyle)

    return (
        <div className={`h-screen w-full bg-gray-200 cursor-none`}>
            <div className={`flex flex-col relative h-screen items-center justify-center`}>
                {View}
                <div className="absolute bottom-10 flex space-x-1 text-4xl font-sans font-black text-button-primary">
                    <span>Loading</span>
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce [animation-delay:200ms]">.</span>
                    <span className="animate-bounce [animation-delay:400ms]">.</span>
                </div>
            </div>
        </div>
    )
}

export default Loading40
