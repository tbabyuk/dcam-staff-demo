"use client"

import { useState, useEffect, useRef } from "react"
import { collection, getDocs, doc, writeBatch, setDoc } from "firebase/firestore"
import { db } from "@components/firebase/config"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {sub, format} from "date-fns"
import Link from "next/link"
import { StudentItem } from "@components/app/components/StudentItem";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import { useRouter } from "next/navigation";
import { usePayday } from "@components/hooks/usePayday";


export const RachelHoursWeekOne = () => {
  const notify = () => toast("Wow so easy!");
  const weekOneNotesRef = useRef()
  const router = useRouter()

  const [rachelStudents, setRachelStudents] = useState(null)
  const [weekOneAttendance, setWeekOneAttendance] = useState({})
  const [weekOneAttendanceCompleted, setWeekOneAttendanceCompleted] = useState(false)

  const {closestPayday, getClosestPayday, weekOnePayPeriod, getWeekOnePayPeriod} = usePayday()



  const handleAttendance = async (student, e) => {

    console.log("logging attendance:", student, e.target.parentElement.parentElement.parentElement.id, e.target.value)

    setWeekOneAttendance((prev) => ({...prev, 
      [student.name]: {
          "attendance.week1": {
                  present: JSON.parse(e.target.value)
            },
          "payday": closestPayDay,
          "submitted": true
        }
    }))
  }


  // submit attendance for week one
  const handleSubmitWeekOne = async (e) => {
    e.preventDefault()

    // save attendance for all students to db
    const batch = writeBatch(db)

    Object.keys(weekOneAttendance).forEach((studentName) => {

      console.log("object keys:", studentName)
      const attendanceData = weekOneAttendance[studentName];
      const studentDocRef = doc(db, 'rachel-students', studentName.toLowerCase());
      batch.update(studentDocRef, attendanceData);
    });

      const notesDocRef = doc(db, "meta-data", "rachel")
      const notesObject = {
        payday: closestPayDay,
        week1AttendanceSubmitted: true,
        week1Notes: weekOneNotesRef.current.value
      }

    try {
        await batch.commit()
        await setDoc(notesDocRef, notesObject)
        console.log("success!")
        toast.success("Week 1 attendance submitted successfully!")
        setTimeout(() => {
          router.push("/rachel/hours/week2")
        }, 2000)
    } catch(error) {
        console.log(error.message)
        toast.error("ooops, it looks like something went wrong! Please ask Terry for help!")
    }
  }

  // if attendance has not beeen submitted yet, get student data for the page
  const fetchData = async () => {

      getClosestPayday()

      // fetch Rachel student info upon first render
      const studentsColRef = collection(db, "rachel-students")

      const studentArray = []
      const snapshot = await getDocs(studentsColRef)
      snapshot.forEach((doc) => studentArray.push(doc.data()))
      setRachelStudents([...studentArray])
  }


  useEffect(() => {

    // check if attendance for week 1 has already been submitted
    const metaColRef = collection(db, "meta-data")

    const fetchDocs = async () => {
      const snapshot = await getDocs(metaColRef)
  
      snapshot.forEach((doc) => {
        if(doc.data().week1AttendanceSubmitted && doc.data().week2AttendanceSubmitted) {
            router.push("/success")
        } else if (doc.data().week1AttendanceSubmitted) {
            toast.error("Your week one attendance has already been submitted, redirecting to week 2...")
            setTimeout(() => {
              router.push("/rachel/hours/week2")
            }, 2000)
        } else {
            fetchData()
        }
      })
    }

    fetchDocs()

  }, [])



  useEffect(() => {

    if(rachelStudents?.length === Object.keys(weekOneAttendance).length) {
      setWeekOneAttendanceCompleted(true)
    }

  }, [weekOneAttendance])


  useEffect(() => {
    getWeekOnePayPeriod()
  }, [closestPayday])



  return (
    <>
        <div className="flex flex-col w-full max-w-[100%]">
            <div className="page-header px-3 md:px-6 h-20 bg-gray-300 flex justify-between items-center col-span-2">
                <Link href="/rachel"><button className="dcam-btn-rounded flex items-center"><FiArrowLeft className="inline-block me-1" />Main Page</button></Link>
                <h2 className="me-4 text-center">Your next pay day is: <br /> <span className="font-semibold">{closestPayday && closestPayday}</span></h2>
                <Link href="/rachel/hours/week2"><button className="dcam-btn-rounded flex items-center">Week 2<FiArrowRight className="inline-block ms-1" /></button></Link>
            </div>

            {/* week 1 form */}
            <form className="py-10 px-3 md:px-20 lg:px-40 xl:px-56 border-r-2 border-gray-100" onSubmit={handleSubmitWeekOne}>
                <p className="mb-8 text-center text-green-700 font-bold"><span className="me-4">Week 1 Pay Period:</span>{weekOnePayPeriod ? `${weekOnePayPeriod.start} - ${weekOnePayPeriod.end}` : "d"}</p>
                <table className="bg-gray-100 w-full border-2 border-gray-200 mb-10">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3">Student</th>
                            <th>Attendance</th>
                            <th>Duration</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody id="week1">
                        {rachelStudents?.map((student, index) => (
                            <StudentItem key={index} student={student} handleAttendance={handleAttendance}/>
                        ))}
                    </tbody>
                </table>
                <textarea rows="4" className="w-full p-2 mb-8 bg-gray-100" placeholder="Enter any notes you might have pertaining to the attendance here. This could include things like makeup lessons, teacher meetings, etc. The more detailed information, the better!" ref={weekOneNotesRef}/>
                <div className="text-center">
                <button className={`py-3 px-4 rounded mx-auto dcam-btn-inactive text-white ${weekOneAttendanceCompleted && "bg-green-200"}`} /*disabled={!weekOneAttendanceCompleted}*/>Submit Week 1 Attendance</button>
                </div>
            </form>
        </div>
      
      <ToastContainer
        position="top-center"
      />
    </>
  )
}

export default RachelHoursWeekOne