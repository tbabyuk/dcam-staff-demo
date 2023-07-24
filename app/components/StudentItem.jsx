"use client"

import { useState } from "react"
import { BsCheckCircle, BsXCircle, BsCircle } from "react-icons/bs"


export const StudentItem = ({student, handleAttendance}) => {


//   const [attendanceIsSelected, setAttendanceIsSelected] = useState(false)

  const [takeAttendance, setTakeAttendance] = useState({})
  const [isPresent, setIsPresent] = useState(null)



  const setIcon = () => {
    if(isPresent === true) {
        return <BsCheckCircle size="1.1rem" color="green" className="mx-auto" />
    } else if (isPresent === false) {
        return <BsXCircle size="1.1rem" color="red" className="mx-auto" />
    } else {
        return <BsCircle size="1.1rem" className="mx-auto" />
    }
  }



  const handleSelect = (e) => {

    console.log("get week:", e.target.parentElement.parentElement.parentElement.id)

    setIsPresent(JSON.parse(e.target.value))

    handleAttendance(student, e)

  }


  return (
        <tr className="border border-gray-300">
            <td className="text-center p-3">{student.name}</td>
            <td className="text-center">
                <select className="bg-gray-200" defaultValue={"attendance"} onChange={handleSelect}>
                    <option value="attendance" disabled>attendance</option>
                    <option value="true">present</option>
                    <option value="false">absent</option>
                </select>
            </td>
            <td className="text-center">{student.duration}</td>
            <td>{setIcon()}</td>
        </tr>  
    )
}