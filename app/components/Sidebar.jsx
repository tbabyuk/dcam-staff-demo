
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useAuthContext } from "@components/context/AuthContext"

export const Sidebar = () => {

  const teachersArray = ["jonathan", "rachel", "raul", "senya", "taisiya", "tiago"]
  const {currentUser} = useAuthContext()


  console.log("from sidebar")



  return (
    <motion.div className="sidebar h-[100vh] w-[200px] bg-gradient-to-r from-[#185281] via-[#103756] to-[#103756] pt-32 px-6 flex-shrink-0 hidden md:block absolute" /*style={{left: "-200px"}}*/ animate={{x: "200"}}>
        <ul>
            <li className="mb-6 h-12 rounded overflow-hidden">
                    <button className={`${currentUser && currentUser.displayName === "Jonathan" ? "bg-green-400" : "bg-[#216dab]"} w-full text-white grid h-full place-items-center cursor-pointer hover:bg-[#185281]`}><Link href="/jonathan">Jonathan</Link></button>           
            </li>
            <li className="mb-6 h-12 rounded overflow-hidden">
                    <button className="bg-[#216dab] w-full text-white grid h-full place-items-center cursor-pointer hover:bg-[#185281]" disabled>Rachel</button>
            </li>



            {/* {teachersArray.map((teacher) => (
                <li className="mb-6 h-12 rounded overflow-hidden">
                    <Link href={`/${teacher}`} className="bg-[#216dab] text-white grid h-full place-items-center cursor-pointer hover:bg-[#185281]">{teacher[0].toUpperCase() + teacher.slice(1)}</Link>
                </li>
            ))} */}
        </ul>
    </motion.div>

  )
}