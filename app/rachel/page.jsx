"use client"

import RachelStudentModal from "../components/RachelStudentModal"
import RachelStudentModalTwo from "../components/RachelStudentModalTwo"
import { useState, useEffect } from "react"


const RachelPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)


  // console.log("database:", db)

  const closeModal = () => {
    setModalIsOpen(false)
  }

    return (
      <>
      <main className="p-10 w-full">
          <h2 className="mb-8">Hi Rachel, what would you like to do today?</h2>
          <button onClick={() => setModalIsOpen(true)} className="bg-green-500 text-white hover:bg-green-400 py-3 px-6 rounded">Log My Work Hours</button>
          <p>Date:</p>
      </main>

      {modalIsOpen && (

        // <RachelStudentModal closeModal={closeModal} />
        <RachelStudentModalTwo closeModal={closeModal} />
      )}
      </>
    )
  }
  
  export default RachelPage