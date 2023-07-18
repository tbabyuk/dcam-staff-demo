"use client"

import RachelStudentModal from "../components/RachelStudentModal"
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
          <p>Rachel's Page</p>
          <h2>What would you like to do today?</h2>
          <button onClick={() => setModalIsOpen(true)}>Log My Hours</button>
      </main>

      {modalIsOpen && (

        <RachelStudentModal closeModal={closeModal} />
      )}
      </>
    )
  }
  
  export default RachelPage