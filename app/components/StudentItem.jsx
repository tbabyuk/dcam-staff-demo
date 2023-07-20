"use client"

import { useState } from "react"
import { BsCheckCircle, BsCircle } from "react-icons/bs"


export const StudentItem = ({student, attendance, handleAttendance}) => {


    console.log("logging attendance passed in:", attendance)

    // console.log("Logging attendance:", student.attendance)

//   const [attendanceIsSelected, setAttendanceIsSelected] = useState(false)

  const [isPresent, setIsPresent] = useState(false)
  const [takeAttendance, setTakeAttendance] = useState({})


  console.log(takeAttendance)

//   console.log(studentAttendance)


  const handleSelect = (e) => {
    handleAttendance(student.name, e)

    const currentWeek = e.target.parentElement.parentElement.parentElement.id

    console.log("get week:", e.target.parentElement.parentElement.parentElement.id)

    setTakeAttendance((prev) => ({...prev, 
        [student.name]: {
            attendance: {
                [currentWeek]: {
                    present: e.target.value
                }
            }
        }
    }))


    if(e.target.value === "true") {
        e.target.parentElement.parentElement.classList.add("bg-green-200")
    } else if (e.target.value === "false") {
        e.target.parentElement.parentElement.classList.add("bg-red-200")
    } else {
        e.target.parentElement.parentElement.classList.add("")
    }
    
  }


  return (
        <tr className={`${isPresent ? "bg-green-200" : "bg-red=200"}`}>
            <td className="text-center p-3">{student.name}</td>
            <td className="text-center">
                <select className="bg-gray-200" defaultValue={"attendance"} onChange={handleSelect}>
                    <option value="attendance" disabled>attendance</option>
                    <option value="true">present</option>
                    <option value="false">absent</option>
                </select>
            </td>
            <td className="text-center">{student.duration}</td>
            <td>
                {/* {attendanceIsSelected ? 
                        <BsCheckCircle size="1.1rem" color="#3fa83f" className="mx-auto" />
                    :
                        <BsCircle size="1.1rem" className="mx-auto" />
                } */}
                <BsCircle size="1.1rem" className="mx-auto" />
            </td>
        </tr>  
    )
}