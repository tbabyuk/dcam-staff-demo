


export const StudentItemTwo = ({student}) => {
  return (
        <tr>
            <td className="p-3">{student.name}</td>
            <td className="text-center">
                <select className="bg-gray-200" defaultValue="attendance">
                    <option value="attendance" disabled>attendance</option>
                    <option value="present">present</option>
                    <option value="absent">absent</option>
                </select>
            </td>
            <td className="text-center">{student.duration}</td>
            <td>blah
                {/* {attendanceIsSelected ? 
                        <BsCheckCircle size="1.1rem" color="#3fa83f" className="mx-auto" />
                    :
                        <BsCircle size="1.1rem" className="mx-auto" />
                } */}
            </td>
        </tr>  
    )
}