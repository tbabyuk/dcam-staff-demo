"use client"

import { useState, useEffect, useRef } from "react"
import { collection, getDocs, doc, addDoc, setDoc, serverTimestamp, updateDoc, writeBatch } from "firebase/firestore"
import { db } from "@components/firebase/config"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {sub, format} from "date-fns"
import Link from "next/link"
import { StudentItem } from "@components/app/components/StudentItem";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"


const studentsColRef = collection(db, "rachel-students")


export const RachelHoursWeekTwo = () => {
  const notify = () => toast("Wow so easy!");
  const weekTwoNotesRef = useRef()
  const router = useRouter()

  const [closestPayDay, setClosestPayDay] = useState(null)
  const [payPeriodIsSelected, setPayPeriodIsSelected] = useState(false)
  const [weekTwoPayPeriod, setWeekTwoPayPeriod] = useState({})
  const [rachelStudents, setRachelStudents] = useState(null)
  const [weekTwoAttendance, setWeekTwoAttendance] = useState({})
  const [weekTwoAttendanceCompleted, setWeekTwoAttendanceCompleted] = useState(false)


  console.log("showing week 2 attendance:", weekTwoAttendance)


  // get date of closest pay period
  const getClosestPayPeriod = () => {

    const payDays2023 = ["July 21, 2023", "August 4, 2023", "August 18, 2023", "September 1, 2023", "September 15, 2023", "September 29, 2023", "October 13, 2023", "October 27, 2023", "November 10, 2023", "November 24, 2023", "December 8, 2023", "December 22, 2023"]

    const today = new Date()

    let res;

    for (let i = 0; i < payDays2023.length; i++) {
      if(new Date(payDays2023[i]) > today) {
        res = payDays2023[i]
        break;
      }
    }
    if(res) {
      setClosestPayDay(res)
      handlePayPeriod(new Date(res))
    }
  }


  const handlePayPeriod = (payDay) => {
    setPayPeriodIsSelected(true)

    // week 2 dates
    const weekTwoStartDate = sub(payDay, {days: 11})
    const weekTwoStartDateFormatted = format(weekTwoStartDate, "MMMM d, yyy")
    const weekTwoEndDate = sub(payDay, {days: 5 })
    const weekTwoEndDateFormatted = format(weekTwoEndDate, "MMMM d, yyy")
    setWeekTwoPayPeriod({start: weekTwoStartDateFormatted, end: weekTwoEndDateFormatted }) 
  }



  const handleAttendance = async (student, e) => {

    console.log("logging attendance:", student, e.target.parentElement.parentElement.parentElement.id, e.target.value)

    setWeekTwoAttendance((prev) => ({...prev, 
      [student.name]: {
          "attendance.week2": {
                  present: JSON.parse(e.target.value)
           },
          "payday": closestPayDay,
          "submitted": true
        }
    }))
  }


  // submit all data for week one
  const handleSubmitWeekTwo = async (e) => {
    e.preventDefault()

    const batch = writeBatch(db)

    Object.keys(weekTwoAttendance).forEach((studentName) => {

      console.log("object keys:", studentName)
      const attendanceData = weekTwoAttendance[studentName];
      const studentDocRef = doc(db, 'rachel-students', studentName.toLowerCase());
    
      batch.update(studentDocRef, attendanceData);
    });

    try {
      await batch.commit()
      console.log("success!")
      toast.success("week 2 attendance successfully saved!")
      setTimeout(() => {
        router.push("/success")
      }, 2000)
    } catch(error) {
      console.log(error.message)
      toast.error("ooops, it looks like something went wrong! Please ask Terry for help!")
    }
  }

  useEffect(() => {

    getClosestPayPeriod()

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

    if(rachelStudents?.length === Object.keys(weekTwoAttendance).length) {
      setWeekTwoAttendanceCompleted(true)
    }

  }, [weekTwoAttendance] )



  return (
    <>
        <div className="flex flex-col w-full max-w-[100%]">
            <div className="page-header px-3 md:px-6 h-20 bg-gray-300 flex justify-between items-center col-span-2">
                <Link href="/rachel/hours/week1"><button className="dcam-btn-rounded flex items-center"><FiArrowLeft className="inline-block me-1" />Week 1</button></Link>
                <h2 className="me-4 text-center">Your next pay day is: <br /> <span className="font-semibold">{closestPayDay && closestPayDay}</span></h2>
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
                        {rachelStudents?.map((student, index) => (
                            <StudentItem key={index} student={student} handleAttendance={handleAttendance}/>
                        ))}
                    </tbody>
                </table>
                <textarea rows="4" className="w-full p-2 mb-8 bg-gray-100" placeholder="Enter any notes you might have pertaining to the attendance here. This could include things like makeup lessons, teacher meetings, etc. The more detailed information, the better!" ref={weekTwoNotesRef}/>
                <div className="text-center">
                <button className={`py-3 px-4 rounded mx-auto dcam-btn-inactive text-white ${weekTwoAttendanceCompleted && "bg-green-200"}`} disabled={!weekTwoAttendanceCompleted}>Submit Week 1 Attendance</button>
                </div>
            </form>
        </div>
      
      <ToastContainer
        position="top-center"
      />
  </>


















//     <>
//         <div className="flex flex-col w-full">
//             <div className="px-16 h-20 bg-blue-600 flex  justify-between items-center font-semibold col-span-2">
//                 <Link href="/rachel"><button>Back to Main Page</button></Link>
//                 <h2 className="me-4">Your next pay day is: {closestPayDay && closestPayDay}</h2>
//                 <Link href="/rachel/hours/week2"><button></button></Link>
//             </div>

//             {/* week 1 form */}
//             <form className=" px-52 py-10 border-r-2 border-gray-100" onSubmit={handleSubmitWeekOne}>
//                 <p className="mb-8 text-center text-green-700 font-bold"><span className="me-4">Week 2 Pay Period:</span>{weekTwoPayPeriod ? `${weekTwoPayPeriod.start} - ${weekTwoPayPeriod.end}` : "d"}</p>
//                 <table className="bg-gray-50 w-full border-2 border-gray-200 mb-10">
//                     <thead className="bg-gray-200">
//                         <tr>
//                             <th className="py-3">Student</th>
//                             <th>Attendance</th>
//                             <th>Duration</th>
//                             <th>Status</th>
//                         </tr>
//                     </thead>
//                     <tbody id="week1">
//                         {rachelStudents?.map((student, index) => (
//                             <StudentItem key={index} student={student} attendance={student.attendance?.week1} handleAttendance={handleAttendance}/>
//                         ))}
//                     </tbody>
//                 </table>
//                 <textarea rows="4" className="w-full p-2 mb-8 bg-gray-100" placeholder="Enter any notes you might have pertaining to the attendance here. This could include things like makeup lessons, teacher meetings, etc. The more detailed information, the better!" ref={weekTwoNotesRef}/>
//                 <div className="text-center">
//                 <button className={`py-3 px-4 rounded mx-auto ${weekTwoAttendanceCompleted && "bg-green-200"}`} disabled={!weekTwoAttendanceCompleted}>Submit Week 2 Attendance</button>
//                 </div>
//             </form>
//         </div>
      
//       <ToastContainer
//         position="top-center"
//       />
// </>
  )
}

export default RachelHoursWeekTwo