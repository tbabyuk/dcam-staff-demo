"use client"

import RachelStudentModal from "../components/RachelStudentModal"
import RachelStudentModalTwo from "../components/RachelStudentModalTwo"
import { useState, useEffect } from "react"
import Link from "next/link"


const RachelPage = () => {

    return (
      <>
        <main className="p-10 w-full">
            <h2 className="mb-8">Hi Rachel, what would you like to do today?</h2>
            <Link href="/rachel/hours/week1"><button className="bg-green-500 text-white hover:bg-green-400 py-3 px-6 rounded">Log My Work Hours</button></Link>
            <p>Date:</p>
        </main>
      </>
    )
  }
  
  export default RachelPage