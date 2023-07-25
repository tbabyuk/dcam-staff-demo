"use client"


import { createContext } from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@components/firebase/config";


export const AuthContext = createContext()


export const AuthContextProvider = ({children}) => {
  
  const [job, setJob] = useState("farmer1")
  const [currentUser, setCurrentUser] = useState(null)


  const logIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch(err) {
        console.log("sign in failed:", err.message)
    }
  }


  const logOut = async () => {
    try {
      await signOut(auth)
      console.log("the user has logged out!")
    } catch(err) {
      console.log("signout failed:", err.message)
    }
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
        console.log("onAuthStateChanged fired...", user)
        if(user) {
            setCurrentUser(user)
        } else {
            setCurrentUser(null)
        }
      })

      return () => {
        unsub()
      }
  }, [])



  return (
    <AuthContext.Provider value={{name:"William", age: 35, job, logIn, logOut, currentUser}}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}