"use client"

import { useAuthContext } from "@components/context/AuthContext"


export const Header = () => {

  const {currentUser, logOut} = useAuthContext()


  return (
    <header className="h-16 bg-dcam-light-red px-3 md:px-6 flex justify-between items-center text-white">
        <img src="/images/logo.png" alt="Da Capo Academy of Music Logo" style={{width: "150px"}} />
        <div className="text-center">{currentUser ? `Welcome, ${currentUser.displayName}!` : ""}</div>
        {currentUser && <button className="dcam-btn flex-shrink-0" onClick={logOut}>Sign Out</button>}
    </header>
  )
}

