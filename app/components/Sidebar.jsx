
import Link from "next/link"

export const Sidebar = () => {

  const teachersArray = ["jonathan", "rachel", "raul", "senya", "taisiya", "tiago"]  


  return (
    <div className="min-h-[calc(100vh-64px)] w-[200px] bg-gradient-to-r from-[#185281] via-[#103756] to-[#103756] pt-32 px-6 flex-shrink-0 hidden md:block">
        <ul>

            {teachersArray.map((teacher) => (
                <li className="mb-6 h-12 rounded overflow-hidden">
                    <Link href={`/${teacher}`} className="bg-[#216dab] text-white grid h-full place-items-center cursor-pointer hover:bg-[#185281]">{teacher[0].toUpperCase() + teacher.slice(1)}</Link>
                </li>
            ))}
        </ul>
    </div>
  )
}