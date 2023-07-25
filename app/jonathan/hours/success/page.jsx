
"use client"

import { useEffect } from "react"
import ConfettiExplosion from "react-confetti-explosion"
import { useAttendanceStatus } from "@components/hooks/useAttendanceStatus"


const JonathanSuccessPage = () => {

    const {checkFinalAttendanceStatus, successMessage, warningMessage} = useAttendanceStatus()


    useEffect(() => {
        checkFinalAttendanceStatus("jonathan")
    }, [])


    return (
        <>
            <div className="flex flex-col w-full h-[calc(100vh-64px)] md:ms-[200px] justify-center items-center bg-[url('/images/main_bg.jpg')] bg-cover bg-center">
                {successMessage && (
                    <>
                        <ConfettiExplosion />
                        <p className="text-2xl text-green-800">{successMessage}</p>
                    </>
                )}

                {warningMessage && (
                    <p className="text-2xl text-red-800">{warningMessage}</p>
                )}
            </div>
        </>
    )    
}

export default JonathanSuccessPage

