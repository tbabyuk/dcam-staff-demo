import { collection, doc, getDoc } from "firebase/firestore"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { db } from "@components/firebase/config";



export const useAttendanceStatus = () => {

    const router = useRouter()

    const metaColRef = collection(db, "meta-data")

    const [successMessage, setSuccessMessage] = useState("")
    const [warningMessage, setWarningMessage] = useState("")



    // check attendance status for week 1
    const checkWeek1AttendanceStatus = async (teacher) => {

        console.log("see teacher name:", teacher)

        const docRef = doc(metaColRef, teacher)

        const docSnap = await getDoc(docRef)

        console.log("week1Attendance:", docSnap.data().week1AttendanceSubmitted)

        if(docSnap.data().week1AttendanceSubmitted && docSnap.data().week2AttendanceSubmitted ) {
            router.push(`/${teacher}/hours/success`)
        } else if(docSnap.data().week1AttendanceSubmitted && !docSnap.data().week2AttendanceSubmitted) {
            setWarningMessage("You've already submitted your week 1 attendance. Please submit week 2 attendance now. Redirecting...")
            setTimeout(() => {
                router.push(`/${teacher}/hours/week2`)
            }, 3000)
        }
    }


    // check attendance status for week 2
    const checkWeek2AttendanceStatus = async (teacher) => {

        const docRef = doc(metaColRef, teacher)

        const docSnap = await getDoc(docRef)

        if(docSnap.data().week1AttendanceSubmitted && docSnap.data().week2AttendanceSubmitted ) {
            router.push(`/${teacher}/hours/success`)
        } else if(docSnap.data().week2AttendanceSubmitted && !docSnap.data().week1AttendanceSubmitted) {
            setWarningMessage("You've already submitted your week 2 attendance. Please submit week 1 attendance now. Redirecting...")
            setTimeout(() => {
                router.push(`/${teacher}/hours/week1`)
            }, 3000)
        }
    }


    // check success page attendance status
    const checkFinalAttendanceStatus = async (teacher) => {

        const docRef = doc(metaColRef, teacher)

        const docSnap = await getDoc(docRef)

        if(docSnap.data().week1AttendanceSubmitted && docSnap.data().week2AttendanceSubmitted ) {
            setSuccessMessage(`Hey ${teacher[0].toUpperCase() + teacher.slice(1)}, your attendance has been submitted! Thanks! 😃`)
        } else if(!docSnap.data().week1AttendanceSubmitted) {
            setWarningMessage("Please complete your attendance for week 1. Redirecting...")
            setTimeout(() => {
                router.push(`/${teacher}/hours/week1`)
            }, 3000)
        } else if(!docSnap.data().week2AttendanceSubmitted) {
            setWarningMessage("Please complete your attendance for week 2. Redirecting...")
            setTimeout(() => {
                router.push(`/${teacher}/hours/week2`)
            }, 3000)
        }
    }


    return {checkWeek1AttendanceStatus, checkWeek2AttendanceStatus, checkFinalAttendanceStatus, successMessage, warningMessage}
}