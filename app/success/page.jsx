"use client"

import { useState, useEffect } from "react"
import ConfettiExplosion from "react-confetti-explosion"
import { db } from "@components/firebase/config"
import { collection, getDocs } from "firebase/firestore"
import { useRouter } from "next/navigation";



const SuccessPage = () => {

    const [attendanceCompleted, setAttendanceCompleted] = useState("")
    const [attendanceNotCompleted, setAttendanceNotCompleted] = useState("")
    const router = useRouter()


    useEffect(() => {

        const metaColRef = collection(db, "meta-data")

        // check if student attendance has already been submitted and redirect accordingly
        const fetchDocs = async () => {
            const snapshot = await getDocs(metaColRef)
            const payDay = snapshot.docs[0].data().payday

            snapshot.forEach((doc) => {
                if(doc.data().week1AttendanceSubmitted && doc.data().week2AttendanceSubmitted) {
                    setAttendanceCompleted(`Your attendance for ${payDay} payday has been submitted! Thanks Rachel!`)
                } else if (!doc.data().week1AttendanceSubmitted) {
                    setAttendanceNotCompleted(`You still need to submit your week 1 attendance for the ${payDay} payday! Redirecting...`)
                    setTimeout(() => {
                        router.push("/rachel/hours/week1")
                      }, 2000)
                } else if(!doc.data().week2AttendanceSubmitted){
                    setAttendanceNotCompleted(`You still need to submit your week 2 attendance for the ${payDay} payday! Redirecting...`)
                    setTimeout(() => {
                        router.push("/rachel/hours/week2")
                      }, 2000)
                }
            })
        }
    
        fetchDocs()
      }, [])


    return (
        <>
            <div className="flex flex-col w-full justify-center items-center">
                {attendanceCompleted && (
                    <>
                        <ConfettiExplosion />
                        <p className="text-2xl text-green-800">{attendanceCompleted}</p>
                    </>
                )}

                {attendanceNotCompleted && (
                    <p className="text-2xl text-red-800">{attendanceNotCompleted}</p>
                )}
            </div>
        </>
    )    
}

export default SuccessPage

