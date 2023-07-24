import { collection, getDocs } from "firebase/firestore"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { db } from "@components/firebase/config";
import { FiSmile } from "react-icons/fi";



export const useAttendanceStatus = () => {

    const router = useRouter()

    const metaColRef = collection(db, "meta-data")

    const [successMessage, setSuccessMessage] = useState("")
    const [warningMessage, setWarningMessage] = useState("")


    const getTeacherNumber = (teacher) => {
        let number;

        switch(teacher) {
            case "rachel": {
                number = 0;
                break;
            }
            case "senya": {
                number = 1;
                break;
            }
        }

        return number;
    }


    // check attendance status for week 1
    const checkWeek1AttendanceStatus = async (teacher) => {

    const snapshot = await getDocs(metaColRef)

        const index = getTeacherNumber(teacher)

        if(snapshot.docs[index].data().week1AttendanceSubmitted && snapshot.docs[index].data().week2AttendanceSubmitted ) {
            router.push(`/${teacher}/hours/success`)
        } else if(snapshot.docs[index].data().week1AttendanceSubmitted && !snapshot.docs[index].data().week2AttendanceSubmitted) {
            setWarningMessage("You've already submitted your week 1 attendance. Please submit week 2 attendance now. Redirecting...")
            setTimeout(() => {
                router.push(`/${teacher}/hours/week2`)
            }, 3000)
        }
    }


    // check attendance status for week 2
    const checkWeek2AttendanceStatus = async (teacher) => {

        const snapshot = await getDocs(metaColRef)

        const index = getTeacherNumber(teacher)

        if(snapshot.docs[index].data().week1AttendanceSubmitted && snapshot.docs[index].data().week2AttendanceSubmitted ) {
            router.push("/rachel/hours/success")
        } else if(snapshot.docs[index].data().week2AttendanceSubmitted && !snapshot.docs[index].data().week1AttendanceSubmitted) {
            setWarningMessage("You've already submitted your week 2 attendance. Please submit week 1 attendance now. Redirecting...")
            setTimeout(() => {
                router.push(`/${teacher}/hours/week1`)
            }, 3000)
        }
    }


    // check success page attendance status
    const checkFinalAttendanceStatus = async (teacher) => {

        const snapshot = await getDocs(metaColRef)

        const index = getTeacherNumber(teacher)

        if(snapshot.docs[index].data().week1AttendanceSubmitted && snapshot.docs[index].data().week2AttendanceSubmitted ) {
            setSuccessMessage(`Hey ${teacher[0].toUpperCase() + teacher.slice(1)}, your attendance has been submitted! Thanks! 😃`)
        } else if(!snapshot.docs[index].data().week1AttendanceSubmitted) {
            setWarningMessage("Please complete your attendance for week 1. Redirecting...")
            setTimeout(() => {
                router.push(`/${teacher}/hours/week1`)
            }, 3000)
        } else if(!snapshot.docs[index].data().week2AttendanceSubmitted) {
            setWarningMessage("Please complete your attendance for week 2. Redirecting...")
            setTimeout(() => {
                router.push(`/${teacher}/hours/week2`)
            }, 3000)
        }
    }


    return {checkWeek1AttendanceStatus, checkWeek2AttendanceStatus, checkFinalAttendanceStatus, successMessage, warningMessage}
}