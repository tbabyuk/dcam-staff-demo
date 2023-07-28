"use client"

import { Inter } from 'next/font/google'
import { useState, useEffect, useRef } from 'react'
import { useAuthContext } from "@components/hooks/useAuthContext"
import { useRouter } from "next/navigation";


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const usernameRef = useRef()
  const passwordRef = useRef()
  const {error, logIn, currentUser} = useAuthContext()
  const [fade, setFade] = useState(false)
  const router = useRouter()


  const handleLogin = async (e) => {
      e.preventDefault()

      const username = usernameRef.current.value.trim()
      const password = passwordRef.current.value.trim()

      logIn(username, password)

    }

  useEffect(() => {
    console.log("page useEffect fired")
    currentUser && currentUser.displayName && router.push(`/${currentUser.displayName.toLowerCase()}`)
  }, [currentUser])


  return (
    <main className={`flex flex-col lg:flex-row min-h-[calc(100vh-64px)] ${fade && "fade-out"}`}>

      <div className="left-side w-[100%] h-[calc(100vh-64px)] bg-dcam-dark-blue grid place-items-center">
        <form className="flex flex-col bg-dcam-regular-blue bg-opacity-40 text-gray-100 rounded-md w-[340px] p-10 mx-auto" onSubmit={handleLogin}>
          <h1 className="text-2xl mb-5 text-center">Staff Login</h1>
          <label className="mb-4">
            <span className="block mb-2">Username:</span>
            <input className="w-full h-8 ps-2 rounded text-gray-800" type="text" ref={usernameRef} autoFocus />
          </label>
          <label className="mb-8">
            <span className="block mb-2">Password:</span>
            <input className="w-full h-8 ps-2 rounded text-gray-800" type="password" ref={passwordRef}/>
          </label>
          <button className="inline-block h-10 dcam-btn">Sign In</button>
          <p className="h-6 text-sm text-red-600 text-center">{error && error}</p>
        </form>
      </div>

      <div className="right-side hidden lg:block w-[100%] bg-[url(/images/home_bg_right.jpg)] bg-cover bg-gray-400" />

    </main>
  )
}
