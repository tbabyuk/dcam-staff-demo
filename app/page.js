"use client"

import { Inter } from 'next/font/google'
import { Header } from './components/Header'
import { auth } from '@components/firebase/config'
import { useRef } from 'react'
import { useAuthContext } from '@components/context/AuthContext'
import { signOut } from 'firebase/auth'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const usernameRef = useRef()
  const passwordRef = useRef()
  const {name, age, job, logIn, currentUser, logOut} = useAuthContext()


  const handleLogin = (e) => {
      e.preventDefault()

      const username = usernameRef.current.value
      const password = passwordRef.current.value

      logIn(username, password)

    }


  const handleLogout = () => {
    logOut()
  }

  // const handleSignout = async () => {
  //   try {
  //     await signOut(auth)
  //     updateCurrentUser()
  //   } catch(err) {
  //     console.log("the error is:", err.message)
  //   }
  // }




  return (
    <main className="p-10 w-full h-[100vh] ms-[200px] bg-gray-400">

      <form className="flex flex-col mt-24 w-[300px] bg-purple-500 mx-auto" onSubmit={handleLogin}>
        <label className="mb-4">
          <span>Username:</span>
          <input type="text" ref={usernameRef} />
        </label>
        <label className="mb-4">
          <span>Password:</span>
          <input type="password" ref={passwordRef}/>
        </label>
        <button className="inline-block">Sign Innnnn</button>
      </form>

      <div className="bg-pink-500 mx-auto flex justify-end">
        <button onClick={handleLogout}>Sign Out</button>
      </div>
      <div>
        {currentUser && <p>The User Is Signed In</p>}
      </div>

    </main>
  )
}
