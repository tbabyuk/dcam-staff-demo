"use client"

import ConfettiExplosion from "react-confetti-explosion"

const SuccessPage = () => {

    return (
        <>
            <div className="flex flex-col w-full justify-center items-center">
                <ConfettiExplosion duration={6000} />
                <p className="text-2xl text-green-800">You're all done! Thanks for submitting your attendance!</p>
            </div>
        </>
    )    
}

export default SuccessPage

