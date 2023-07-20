"use client"

import { useState, useEffect, useRef } from "react"
import { collection, getDocs, doc, addDoc, setDoc, serverTimestamp, updateDoc, writeBatch } from "firebase/firestore"
import { db } from "@components/firebase/config"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {sub, format} from "date-fns"
import Link from "next/link"
import { StudentItem } from "@components/app/components/StudentItem";


const studentsColRef = collection(db, "rachel-students")
const submissionsColRef = collection(db, "rachel-submissions")



export const RachelHoursWeekOne = () => {
  const notify = () => toast("Wow so easy!");
  const weekOneNotesRef = useRef()
  const weekTwoNotesRef = useRef()

  const [payPeriodIsSelected, setPayPeriodIsSelected] = useState(false)
  const [weekOnePayPeriod, setWeekOnePayPeriod] = useState({})
  const [rachelStudents, setRachelStudents] = useState(null)
  const [weekOneAttendance, setWeekOneAttendance] = useState({})
  const [weekOneAttendanceCompleted, setWeekOneAttendanceCompleted] = useState(false)


  console.log("showing week 1 attendance:", weekOneAttendance)


  const handlePayPeriod = (e) => {
    setPayPeriodIsSelected(true)
    const payDay = new Date(e.target.value)

    // week 1 dates
    const weekOneStartDate = sub(payDay, {days: 18})
    const weekOneStartDateFormatted = format(weekOneStartDate, "MMMM d, yyy")
    const weekOneEndDate = sub(payDay, {days: 12 })
    const weekOneEndDateFormatted = format(weekOneEndDate, "MMMM d, yyy")
    setWeekOnePayPeriod({start: weekOneStartDateFormatted, end: weekOneEndDateFormatted })

  }



  const handleAttendance = async (student, e) => {

    console.log("logging attendance:", student, e.target.parentElement.parentElement.parentElement.id, e.target.value)

    setWeekOneAttendance((prev) => ({...prev, 
      [student.name]: {
          "attendance.week1": {
                  present: JSON.parse(e.target.value)
            }
        }
    }))
  }


  // submit all data for week one
  const handleSubmitWeekOne = async (e) => {
    e.preventDefault()

    const batch = writeBatch(db)

    Object.keys(weekOneAttendance).forEach((studentName) => {

      console.log("object keys:", studentName)
      const attendanceData = weekOneAttendance[studentName];
      const studentDocRef = doc(db, 'rachel-students', studentName.toLowerCase());
    
      batch.update(studentDocRef, attendanceData);
    });

    try {
      await batch.commit()
      console.log("success!")
      toast.success("week 1 attendance successfully saved!")
    } catch(error) {
      console.log(error.message)
      toast.error("ooops, it looks like something went wrong! Please ask Terry for help!")
    }


  }

  useEffect(() => {
    // fetch Rachel student info upon first render
    const fetchDocs = async () => {
      const studentArray = []
      const snapshot = await getDocs(studentsColRef)
      snapshot.forEach((doc) => studentArray.push(doc.data()))
      setRachelStudents((prev) => ([...studentArray]))
    }

    fetchDocs()
  }, [])



  useEffect(() => {

    if(rachelStudents?.length === Object.keys(weekOneAttendance).length) {
      setWeekOneAttendanceCompleted(true)
    }

  }, [weekOneAttendance] )



  return (
    <>
        <div className="flex flex-col w-full">
            <div className="px-16 h-20 bg-red-200 flex items-center font-semibold col-span-2">
                <span className="me-4">Choose payday for which you are recording your hours:</span>
                <select onChange={handlePayPeriod}>
                    <option value="July 21, 2023">July 21, 2023</option>
                    <option value="August 4, 2023">August 4, 2023</option>
                    <option value="August 18, 2023">August 18, 2023</option>
                    <option value="September 1, 2023">August 18, 2023</option>
                </select>
                <Link href="/rachel/hours/week2"><button>Go To Week 2</button></Link>
            </div>

            {/* week 1 form */}
            <form className=" px-52 py-10 border-r-2 border-gray-100" onSubmit={handleSubmitWeekOne}>
                <p className="mb-8 text-center text-green-700 font-bold"><span className="me-4">Week 1 Pay Period:</span>{weekOnePayPeriod ? `${weekOnePayPeriod.start} - ${weekOnePayPeriod.end}` : "d"}</p>
                <table className="bg-gray-50 w-full border-2 border-gray-200 mb-10">
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
                            <StudentItem key={index} student={student} attendance={student.attendance?.week1} handleAttendance={handleAttendance}/>
                        ))}
                    </tbody>
                </table>
                <textarea rows="4" className="w-full p-2 mb-8 bg-gray-100" placeholder="Enter any notes you might have pertaining to the attendance here. This could include things like makeup lessons, teacher meetings, etc. The more detailed information, the better!" ref={weekOneNotesRef}/>
                <div className="text-center">
                <button className={`py-3 px-4 rounded mx-auto ${weekOneAttendanceCompleted && "bg-green-200"}`} disabled={!weekOneAttendanceCompleted}>Submit Attendance</button>
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