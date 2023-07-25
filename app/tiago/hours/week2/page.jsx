"use client"

import { useState, useEffect, useRef } from "react"
import { collection, getDocs, doc, writeBatch, setDoc } from "firebase/firestore"
import { db } from "@components/firebase/config"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link"
import { StudentItem } from "@components/app/components/StudentItem";
import { FiArrowLeft } from "react-icons/fi"
import { useRouter } from "next/navigation";
import { usePayday } from "@components/hooks/usePayday";
import { useAttendanceStatus } from "@components/hooks/useAttendanceStatus";


export const TiagoHoursWeekTwo = () => {

  const notify = () => toast("Wow so easy!");
  const weekTwoNotesRef = useRef()
  const router = useRouter()

  const {closestPayday, weekTwoPayPeriod, getWeekTwoPayPeriod} = usePayday()
  const {checkWeek2AttendanceStatus, successMessage, warningMessage} = useAttendanceStatus()
  const [tiagoStudents, setTiagoStudents] = useState(null)
  const [weekTwoAttendance, setWeekTwoAttendance] = useState({})
  const [weekTwoAttendanceCompleted, setWeekTwoAttendanceCompleted] = useState(false)



  const handleAttendance = async (student, e) => {

    console.log("logging attendance:", student, e.target.parentElement.parentElement.parentElement.id, e.target.value)

    setWeekTwoAttendance((prev) => ({...prev, 
      [student.name]: {
          "attendance.week2": {
                  present: JSON.parse(e.target.value)
           },
          "payday": closestPayday,
          "submitted": true
        }
    }))
  }


  // submit attendance for week two
  const handleSubmitWeekTwo = async (e) => {
    e.preventDefault()
  
    // save attendance for all students to db
    const batch = writeBatch(db)

    Object.keys(weekTwoAttendance).forEach((studentName) => {

      console.log("object keys:", studentName)
      const attendanceData = weekTwoAttendance[studentName];
      const studentDocRef = doc(db, 'tiago-students', studentName.toLowerCase());
      batch.update(studentDocRef, attendanceData);
    });

      const metaDocRef = doc(db, "meta-data", "tiago")
      const metaObject = {
        payday: closestPayday,
        week2AttendanceSubmitted: true,
        week2Notes: weekTwoNotesRef.current.value
      }

    try {
        await batch.commit()
        await setDoc(metaDocRef, metaObject, {merge: true})
        console.log("success!")
        toast.success("Week 2 attendance submitted successfully!")
        setTimeout(() => {
          router.push("/tiago/hours/success")
        }, 3000)
    } catch(error) {
        console.log(error.message)
        toast.error("ooops, it looks like something went wrong! Please ask Terry for help!")
    }
  }
  
  // if attendance has not beeen submitted yet, get student data for the page
  const fetchData = async () => {

    getWeekTwoPayPeriod()

      // fetch Tiago student info upon first render
      const studentsColRef = collection(db, "tiago-students")

      const studentArray = []
      const snapshot = await getDocs(studentsColRef)
      snapshot.forEach((doc) => studentArray.push(doc.data()))
      setTiagoStudents([...studentArray])
  }


  useEffect(() => {

    if(tiagoStudents?.length === Object.keys(weekTwoAttendance).length) {
      setWeekTwoAttendanceCompleted(true)
    }

  }, [weekTwoAttendance])


  useEffect(() => {
    checkWeek2AttendanceStatus("tiago")
    fetchData()
    getWeekTwoPayPeriod()
  }, [closestPayday])


  useEffect(() => {
    if(warningMessage) {
      toast.error(warningMessage)
    }
  }, [warningMessage])



  return (
    <>
        <div className="flex flex-col w-full max-w-[100%] bg-[url('/images/main_bg.jpg')] bg-cover bg-center">
            <div className="page-header px-3 md:px-6 h-20 bg-gray-300 flex justify-between items-center col-span-2">
                <Link href="/tiago/hours/week1"><button className="dcam-btn-rounded flex items-center"><FiArrowLeft className="inline-block me-1" />Week 1</button></Link>
                <h2 className="me-4 text-center">Your next pay day is: <br /> <span className="font-semibold">{closestPayday && closestPayday}</span></h2>
                <button></button>
            </div>

            {/* week 1 form */}
            <form className="py-10 px-3 md:px-20 lg:px-40 xl:px-56 border-r-2 border-gray-100" onSubmit={handleSubmitWeekTwo}>
                <p className="mb-8 text-center text-green-700 font-bold"><span className="me-4">Week 2 Pay Period:</span>{weekTwoPayPeriod ? `${weekTwoPayPeriod.start} - ${weekTwoPayPeriod.end}` : "d"}</p>
                <table className="bg-gray-100 w-full border-2 border-gray-200 mb-10">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3">Student</th>
                            <th>Attendance</th>
                            <th>Duration</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody id="week2">
                        {tiagoStudents?.map((student, index) => (
                            <StudentItem key={index} student={student} handleAttendance={handleAttendance}/>
                        ))}
                    </tbody>
                </table>
                <textarea rows="4" className="w-full p-2 mb-8 bg-gray-100" placeholder="Enter any notes you might have pertaining to the attendance here. This could include things like makeup lessons, teacher meetings, etc. The more detailed information, the better!" ref={weekTwoNotesRef}/>
                <div className="text-center">
                <button className={`py-3 px-4 rounded mx-auto ${!weekTwoAttendanceCompleted ? "dcam-btn-inactive" : "dcam-btn-active"} text-white ${weekTwoAttendanceCompleted && "bg-green-200"}`} disabled={!weekTwoAttendanceCompleted}>Submit Week 2 Attendance</button>
                </div>
            </form>
        </div>
      
      <ToastContainer
        position="top-center"
      />
    </>
  )
}

export default TiagoHoursWeekTwo