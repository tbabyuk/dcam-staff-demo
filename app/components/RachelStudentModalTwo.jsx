"use client"

import { useState, useEffect, useRef } from "react"
// import { StudentItem } from "./StudentItem"
import { collection, getDocs, doc, addDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@components/firebase/config"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {sub, format} from "date-fns"
import { BsCheckCircle, BsCircle } from "react-icons/bs";
import { StudentItemTwo } from "./StudentItemTwo";


const studentsColRef = collection(db, "rachel-students")
const submissionsColRef = collection(db, "rachel-submissions")

// const rachelStudents = ["Robin", "Khatereh", "Michaela", "Marcus", "Rachel"]


export const RachelStudentModalTwo = ({closeModal}) => {
  const notify = () => toast("Wow so easy!");
  const weekOneNotesRef = useRef()
  const weekTwoNotesRef = useRef()

  const [attendanceIsSelected, setAttendanceIsSelected] = useState(false)


  const [payPeriodIsSelected, setPayPeriodIsSelected] = useState(false)
  const [weekOnePayPeriod, setWeekOnePayPeriod] = useState({})
  const [weekTwoPayPeriod, setWeekTwoPayPeriod] = useState([])
  const [rachelStudents, setRachelStudents] = useState(null)
  const [weekOneAttendance, setWeekOneAttendance] = useState({})
  const [weekTwoAttendance, setWeekTwoAttendance] = useState({})
  const [weekOneAttendanceCompleted, setWeekOneAttendanceCompleted] = useState(false)
  const [weekTwoAttendanceCompleted, setWeekTwoAttendanceCompleted] = useState(false)


  console.log("attendance status", weekOneAttendanceCompleted)


  // const payDay = new Date("July 21, 2023")
  // const res1 = sub(payDay, {days: 18})
  // const res2 = sub(payDay, {days: 5})

  // const formatted1 = format(res1, "MMMM d, yyyy")
  // const formatted2 = format(res2, "MMMM d, yyyy")

  // console.log(`the pay period is between ${formatted1} and ${formatted2}`)

  const handlePayPeriod = (e) => {
    setPayPeriodIsSelected(true)
    const payDay = new Date(e.target.value)

    console.log("logging froggy:", weekOnePayPeriod)

    // week 1 dates
    const weekOneStartDate = sub(payDay, {days: 18})
    const weekOneStartDateFormatted = format(weekOneStartDate, "MMMM d, yyy")
    const weekOneEndDate = sub(payDay, {days: 12 })
    const weekOneEndDateFormatted = format(weekOneEndDate, "MMMM d, yyy")
    setWeekOnePayPeriod({start: weekOneStartDateFormatted, end: weekOneEndDateFormatted })

    // week 2 dates
    const weekTwoStartDate = sub(payDay, {days: 11})
    const weekTwoStartDateFormatted = format(weekTwoStartDate, "MMMM d, yyy")
    const weekTwoEndDate = sub(payDay, {days: 5 })
    const weekTwoEndDateFormatted = format(weekTwoEndDate, "MMMM d, yyy")
    setWeekTwoPayPeriod({start: weekTwoStartDateFormatted, end: weekTwoEndDateFormatted })  }


  // submit all data for week 1
  const handleSubmitWeekOne = async (e) => {
    e.preventDefault()

    await setDoc(doc(db, "rachel-submissions", "week-1"), {
        submissions: weekOneAttendance,
        notes: weekOneNotesRef.current.value,
        submitted: true,
        created_at: serverTimestamp()
    })
      toast.success("Congrats! You have submitted your attendance for week one!")
  }

  // submit all data for week 2
  const handleSubmitWeekTwo = async (e) => {
    e.preventDefault()

    await setDoc(doc(db, "rachel-submissions", "week-2"), {
        submissions: weekTwoAttendance,
        notes: weekOneNotesRef.current.value,
        submitted: true,
        created_at: serverTimestamp()
    })
      toast.success("Congrats! You have submitted your attendance for week two!")
  }

  const handleWeekOneSelect = (e) => {
        setAttendanceIsSelected(true)
        if(e.target.value === "present") {
            e.target.parentElement.parentElement.classList.add("bg-green-200", "form-checkbox")
        } else {
            e.target.parentElement.parentElement.classList.add("bg-red-200")
        }
  }

  const handleWeekTwoSelect = (e) => {
        setAttendanceIsSelected(true)
        if(e.target.value === "present") {
            e.target.parentElement.parentElement.classList.add("bg-green-200")
        } else {
            e.target.parentElement.parentElement.classList.add("bg-red-200")
        }
  }



  const handleWeekOneAttendance = (student, value) => {
    console.log("I handle week one attendance")
    setWeekOneAttendance((prev) => ({...prev, [student.name]: {attendance: value, payout: value === "absent" ? 0 : student.pay}}))
  }

  const handleWeekTwoAttendance = (student, value) => {
    console.log("I handle week two attendance")
    setWeekTwoAttendance((prev) => ({...prev, [student.name]: {attendance: value, payout: value === "absent" ? 0 : student.pay}}))
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

    if(rachelStudents?.length === Object.keys(weekTwoAttendance).length) {
      setWeekTwoAttendanceCompleted(true)
    }

  }, [weekOneAttendance, weekTwoAttendance] )



  return (
    <div className="absolute top-0 left-0 bg-black bg-opacity-60 h-full w-full">
      <button className="absolute right-0 -top-10 text-white text-[5rem]" onClick={closeModal}>&times;</button>
      <div className="modal w-[85%] h-[90%] bg-white mt-8 mx-auto overflow-auto">
          <div className="px-16 h-14 bg-red-200 flex items-center font-semibold">
            <span className="me-4">Choose payday for which you are recording your hours:</span>
            <select onChange={handlePayPeriod}>
              <option value="July 21, 2023">July 21, 2023</option>
              <option value="August 4, 2023">August 4, 2023</option>
              <option value="August 18, 2023">August 18, 2023</option>
              <option value="September 1, 2023">August 18, 2023</option>
            </select>
          </div>
          <div className="grid grid-cols-2">
            {/* week 1 form */}
            <form className="px-16 py-10 border-r-2 border-gray-100" onSubmit={handleSubmitWeekOne}>
                <h3 className="mb-8 text-center text-green-700 font-semibold text-lg"><span className="me-4">Week of:</span>{weekOnePayPeriod ? `${weekOnePayPeriod.start} - ${weekOnePayPeriod.end}` : "d"}</h3>
                    <table className="bg-gray-50 w-full border-2 border-gray-200">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-3">Student</th>
                                <th>Attendance</th>
                                <th>Duration</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rachelStudents?.map((student, index) => (
                                <StudentItemTwo key={index} student={student} />
                            ))}
                        </tbody>
                    </table>
                {/* </ul> */}
                <textarea className="w-full p-2 mb-8 bg-gray-100" placeholder="Enter any notes you might have pertaining to the attendance here" ref={weekOneNotesRef}/>
                <div className="text-center">
                  <button className={`py-3 px-4 rounded mx-auto ${weekOneAttendanceCompleted && "bg-green-200"}`} disabled={!weekOneAttendanceCompleted}>Submit Attendance</button>
                </div>
            </form>
            {/* week 2 form */}
            <form className="weekTwo px-16 py-10" onSubmit={handleSubmitWeekTwo}>
                <h3 className="mb-8 text-center text-green-700 font-semibold text-lg"><span className="me-4">Week of:</span> {weekTwoPayPeriod ? `${weekTwoPayPeriod.start} - ${weekTwoPayPeriod.end}` : "d"}</h3>
                    <table className="bg-gray-50 w-full border-2 border-gray-200">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-3">Student</th>
                                <th>Attendance</th>
                                <th>Duration</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rachelStudents?.map((student, index) => (
                                <StudentItemTwo key={index} student={student} />
                            ))}
                        </tbody>
                    </table>
                {/* </ul> */}
                <textarea className="w-full p-2 mb-8 bg-gray-100" placeholder="Enter any notes you might have pertaining to the attendance here" ref={weekTwoNotesRef}/>
                <div className="text-center">
                <button className={`py-3 px-4 rounded mx-auto ${weekTwoAttendanceCompleted && "bg-green-200"}`} disabled={!weekTwoAttendanceCompleted}>Submit Attendance</button>
                </div>
            </form>
          </div>
      </div>
      
      <ToastContainer
        position="top-center"
      />

    </div>
  )
}

export default RachelStudentModalTwo