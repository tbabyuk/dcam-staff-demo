"use client"

import { useAuthContext } from "@components/hooks/useAuthContext"
import Link from "next/link"

export const Header = () => {

  const {currentUser, logOut} = useAuthContext()


  return (
    <header className="h-16 bg-dcam-light-red px-3 md:px-6 flex justify-between items-center text-white">
        <Link href="/"><img src="/images/logo.png" alt="Da Capo Academy of Music Logo" style={{width: "150px"}} /></Link>
        <div className="text-center">{currentUser ? `Hey ${currentUser.displayName}!` : ""}</div>
        
        {currentUser && 
          <div className="flex items-center">
            <img src={currentUser.photoURL} className="hidden md:block h-10 me-3 rounded-full" alt="teacher profile photo" />
            <button className="dcam-btn flex-shrink-0" onClick={logOut}>Sign Out</button>
          </div>
        }
    </header>
  )
}

