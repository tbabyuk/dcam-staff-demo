import { collection, getDocs } from "firebase/firestore"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { db } from "@components/firebase/config";



export const useAttendanceStatus = () => {

    const router = useRouter()

    const metaColRef = collection(db, "meta-data")

    const [successMessage, setSuccessMessage] = useState("")
    const [warningMessage, setWarningMessage] = useState("")


    // check attendance status for week 1
    const checkWeek1AttendanceStatus = async () => {

        const snapshot = await getDocs(metaColRef)

        if(snapshot.docs[0].data().week1AttendanceSubmitted && snapshot.docs[0].data().week2AttendanceSubmitted ) {
            router.push("/rachel/hours/success")
        } else if(snapshot.docs[0].data().week1AttendanceSubmitted && !snapshot.docs[0].data().week2AttendanceSubmitted) {
            setWarningMessage("You've already submitted your week 1 attendance. Please submit week 2 attendance now. Redirecting...")
            setTimeout(() => {
                router.push("/rachel/hours/week2")
            }, 3000)
        }
    }


    // check attendance status for week 2
    const checkWeek2AttendanceStatus = async () => {

        const snapshot = await getDocs(metaColRef)

        if(snapshot.docs[0].data().week1AttendanceSubmitted && snapshot.docs[0].data().week2AttendanceSubmitted ) {
            router.push("/rachel/hours/success")
        } else if(snapshot.docs[0].data().week2AttendanceSubmitted && !snapshot.docs[0].data().week1AttendanceSubmitted) {
            setWarningMessage("You've already submitted your week 2 attendance. Please submit week 1 attendance now. Redirecting...")
            setTimeout(() => {
                router.push("/rachel/hours/week1")
            }, 3000)
        }
    }


    // check success page attendance status
    const checkFinalAttendanceStatus = async () => {

        const snapshot = await getDocs(metaColRef)

        if(snapshot.docs[0].data().week1AttendanceSubmitted && snapshot.docs[0].data().week2AttendanceSubmitted ) {
            setSuccessMessage("Your attendance has been submitted!")
        } else if(!snapshot.docs[0].data().week1AttendanceSubmitted) {
            setWarningMessage("Please complete your attendance for week 1. Redirecting...")
            setTimeout(() => {
                router.push("/rachel/hours/week1")
            }, 1000)
        } else if(!snapshot.docs[0].data().week2AttendanceSubmitted) {
            setWarningMessage("Please complete your attendance for week 2. Redirecting...")
            setTimeout(() => {
                router.push("/rachel/hours/week2")
            }, 1000)
        }
    }


    return {checkWeek1AttendanceStatus, checkWeek2AttendanceStatus, checkFinalAttendanceStatus, successMessage, warningMessage}
}