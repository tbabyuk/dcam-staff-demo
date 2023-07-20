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

// const rachelStudents = ["Robin", "Khatereh", "Michaela", "Marcus", "Rachel"]


export const RachelHoursWeekOne = ({closeModal}) => {
  const notify = () => toast("Wow so easy!");
  const weekOneNotesRef = useRef()
  const weekTwoNotesRef = useRef()

  const [payPeriodIsSelected, setPayPeriodIsSelected] = useState(false)
  const [weekOnePayPeriod, setWeekOnePayPeriod] = useState({})
  const [weekTwoPayPeriod, setWeekTwoPayPeriod] = useState([])
  const [rachelStudents, setRachelStudents] = useState(null)
  const [weekOneAttendance, setWeekOneAttendance] = useState({})
  const [weekTwoAttendance, setWeekTwoAttendance] = useState({})
  const [weekOneAttendanceCompleted, setWeekOneAttendanceCompleted] = useState(false)
  const [weekTwoAttendanceCompleted, setWeekTwoAttendanceCompleted] = useState(false)


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

  const handleAttendance = async (student, e) => {

    // setWeekOneAttendance((prev) => ({...prev, [student.name]: {attendance: value, payout: value === "absent" ? 0 : student.pay}}))
    console.log("logging attendance:", student, e.target.parentElement.parentElement.parentElement.id, e.target.value)


    // immediately save update attendance to database
    // const docRef = doc(db, "rachel-students", "AP45MBfJ6ciFGJGnmEGk")

    // await setDoc(docRef, {
    //     attendance: {
    //         week1: {
    //             present: false
    //         }
    //     }
    // }, { merge: true })





    // practicing batching - IT WORKED!


//     const doc1Ref = doc(db, "rachel-students", "OYptYQWNaR9pQirFewp7")
//     const doc2Ref = doc(db, "rachel-students", "RWhKpy5GhZZjMSl520ra")

//     const michaela = {
//         attendance: {
//             week1: {
//                 present: false
//             },
//             week2: {
//                 present: false
//             }
//         }
//    }

//     const khatereh = {
//         attendance: {
//             week1: {
//                 present: false
//             },
//             week2: {
//                 present: false
//             }
//         }
//    }

//    const batch = writeBatch(db)

//    batch.update(doc1Ref, michaela)
//    batch.update(doc2Ref, khatereh)


//    await batch.commit()
  }




//   import { writeBatch, doc, setDoc } from 'firebase/firestore';

// Assuming you have three different documents with their respective data
// const document1Data = {
//     field1: 'value1',
//     field2: 'value2',
//   };
  
//   const document2Data = {
//     field1: 'value3',
//     field2: 'value4',
//   };
  
//   const document3Data = {
//     field1: 'value5',
//     field2: 'value6',
//   };
  
//   // Create a batch object
//   const batch = writeBatch(db);
  
//   // Get references to the three documents
//   const document1Ref = doc(db, 'collectionName', 'document1Id');
//   const document2Ref = doc(db, 'collectionName', 'document2Id');
//   const document3Ref = doc(db, 'collectionName', 'document3Id');
  
//   // Add set operations to the batch for all three documents
//   batch.set(document1Ref, document1Data);
//   batch.set(document2Ref, document2Data);
//   batch.set(document3Ref, document3Data);
  
//   // Commit the batch to apply all the set operations
//   await batch.commit();
  


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



  // useEffect(() => {

  //   if(rachelStudents?.length === Object.keys(weekOneAttendance).length) {
  //     setWeekOneAttendanceCompleted(true)
  //   }

  //   if(rachelStudents?.length === Object.keys(weekTwoAttendance).length) {
  //     setWeekTwoAttendanceCompleted(true)
  //   }

  // }, [weekOneAttendance, weekTwoAttendance] )



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