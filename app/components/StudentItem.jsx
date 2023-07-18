"use client"

import { useState } from "react"
import { BsCheckCircle } from "react-icons/bs"
import { BsCircle } from "react-icons/bs"

export const StudentItem = ({student, handleWeekOneAttendance, handleWeekTwoAttendance}) => {
    const [attendanceIsSelected, setAttendanceIsSelected] = useState(false)

    const handleSelect = (e) => {
        if(e.target.parentElement.parentElement.id === "weekOne") {
            handleWeekOneAttendance(student, e.target.value)
            setAttendanceIsSelected(true)
        }

        if(e.target.parentElement.parentElement.id === "weekTwo") {
            handleWeekTwoAttendance(student, e.target.value)
            setAttendanceIsSelected(true)
        }
    }

  return (
    <li className={`grid grid-cols-4 mb-6 px-4 py-4 border-2 border-gray-200 ${attendanceIsSelected ? "bg-green-200" : "bg-gray-100"}  rounded`}>
        <span className="ps-2">{student}</span>
        <select className="text-center" defaultValue="null" required onChange={handleSelect}>
            <option value="null" disabled>attendance</option>
            <option value="present">present</option>
            <option value="absent">absent</option>
        </select>
        <span className="text-center">45 mins</span>
        {attendanceIsSelected ? 
            <BsCheckCircle size="1.3rem" color="#3fa83f" className="mx-auto" />
        :
            <BsCircle size="1.3rem" className="mx-auto" />
    }
    </li>
  )
}