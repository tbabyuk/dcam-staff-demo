"use client"

import { useRouter } from "next/navigation";
import { db } from "@components/firebase/config"
import { collection, getDocs } from "firebase/firestore"



const RachelPage = () => {

  const router = useRouter()


  const handleCheckAttendanceStatus = async () => {

      const studentsColRef = collection(db, "rachel-students")
      
      // check if student attendance has already been submitted
      const snapshot = await getDocs(studentsColRef)
      const docObject = snapshot.docs[0].data()
      if(docObject.submitted) {
        router.push("/success")
      } else {
        router.push("rachel/hours/week1")
    }

  }


    return (
      <>
        <main className="pt-10 px-20 w-full">
            <h2 className="mb-8">Hi Rachel, what would you like to do today?</h2>
            <button className="bg-green-500 text-white hover:bg-green-400 py-3 px-6 rounded" onClick={handleCheckAttendanceStatus}>
              Log My Work Hours
            </button>
        </main>
      </>
    )
  }
  
  export default RachelPage