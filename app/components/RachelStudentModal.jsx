"use client"

import { useState, useEffect } from "react"
import { StudentItem } from "./StudentItem"

const rachelStudents = ["Robin", "Khatereh", "Michaela", "Marcus", "Rachel"]


export const RachelStudentModal= ({closeModal}) => {

  const [weekOneAttendance, setWeekOneAttendance] = useState({})
  const [weekTwoAttendance, setWeekTwoAttendance] = useState({})

  const [weekOneSubmissionCompleted, setWeekOneSubmissionCompleted] = useState(false)
  const [weekTwoSubmissionCompleted, setWeekTwoSubmissionCompleted] = useState(false)

  console.log(weekOneAttendance)


  const handleSubmit = (e) => {
    e.preventDefault()

  }

  const handleWeekOneAttendance = (student, value) => {
    console.log("I handle week one attendance")
    setWeekOneAttendance((prev) => ({...prev, [student]: value, week: "one" }))
  }

  const handleWeekTwoAttendance = (student, value) => {
    console.log("I handle week two attendance")
    setWeekTwoAttendance((prev) => ({...prev, [student]: value, week: "two"}))
  }


  useEffect(() => {

    if(Object.keys(weekOneAttendance).length - 1 === rachelStudents.length) {
      setWeekOneSubmissionCompleted(true)
    }

    if(Object.keys(weekTwoAttendance).length - 1 === rachelStudents.length) {
      setWeekTwoSubmissionCompleted(true)
    }
  }, [weekOneAttendance, weekTwoAttendance] )


  return (
    <div className="absolute top-0 left-0 bg-black bg-opacity-60 h-full w-full">
            <button className="absolute right-0 -top-10 text-white text-[5rem]" onClick={closeModal}>&times;</button>
      <div className="modal grid grid-cols-2 w-[85%] h-[90%] bg-white mt-8 mx-auto overflow-auto">
          {/* week 1 form */}
          <form className="p-8 border-r-2 border-gray-100" onSubmit={handleSubmit}>
              <p className="mb-8">Week of: (week 1)</p>
              <div className="grid grid-cols-4 px-4 font-semibold uppercase mb-3">
                <span className="text-center">student</span>
                <span className="text-center">attendance</span>
                <span className="text-center">duration</span>
                <span className="text-center">status</span>
              </div>
              <ul className="mb-8" id="weekOne">
                {rachelStudents.map((student, index) => (
                  <StudentItem key={index} student={student} handleWeekOneAttendance={handleWeekOneAttendance} />
                ))}
              </ul>
              <textarea className="w-full p-2 mb-8" placeholder="Enter any notes you might have pertaining to the attendance here" />
              <div className="text-center">
                <button className={`py-3 px-4 rounded mx-auto ${weekOneSubmissionCompleted && "bg-green-200"}`} disabled={!weekOneSubmissionCompleted}>Submit Attendance</button>
              </div>
          </form>

          {/* week 2 form */}
          <form className="weekTwo p-8">
              <p className="mb-8">Week of: (week 2)</p>
              <div className="grid grid-cols-4 px-4 font-semibold uppercase mb-3">
                <span className="text-center">student</span>
                <span className="text-center">attendance</span>
                <span className="text-center">duration</span>
                <span className="text-center">status</span>
              </div>
              <ul className="mb-8" id="weekTwo">
                {rachelStudents.map((student, index) => (
                  <StudentItem key={index} student={student} handleWeekTwoAttendance={handleWeekTwoAttendance} />
                ))}
              </ul>
              <textarea className="w-full p-2 mb-8" placeholder="Enter any notes you might have pertaining to the attendance here" />
              <div className="text-center">
              <button className={`py-3 px-4 rounded mx-auto ${weekTwoSubmissionCompleted && "bg-green-200"}`} disabled={!weekOneSubmissionCompleted}>Submit Attendance</button>
              </div>
          </form>
      </div>

    </div>
  )
}

export default RachelStudentModal