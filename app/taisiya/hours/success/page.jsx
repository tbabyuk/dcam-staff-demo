
"use client"

import { useEffect } from "react"
import ConfettiExplosion from "react-confetti-explosion"
import { useAttendanceStatus } from "@components/hooks/useAttendanceStatus"
import { useAuthContext } from "@components/context/AuthContext"
import { useRouter } from "next/navigation";


const TaisiyaSuccessPage = () => {

    const router = useRouter()
    const {checkFinalAttendanceStatus, successMessage, warningMessage} = useAttendanceStatus()
    const {currentUser, authIsReady} = useAuthContext()


    useEffect(() => {
        if (!authIsReady) {
          // if authIsReady is false, the authentication process is still in progress, so don't redirect
          return;
        }
        if(!currentUser || currentUser.uid !== "rF4bp8yxrNgQrY0WrNFgxv5Gmqc2") {
          router.push("/")
        } else {
          console.log("check attendance block fired")
          checkFinalAttendanceStatus("taisiya")
        }
    }, [authIsReady])


    return (
        <>
            <div className="flex flex-col w-full justify-center items-center bg-[url('/images/main_bg.jpg')] bg-cover bg-center">
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

export default TaisiyaSuccessPage

