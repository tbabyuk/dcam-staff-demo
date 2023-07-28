"use client"


import { createContext } from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "@components/firebase/config";
import { useRouter } from "next/navigation";


export const AuthContext = createContext()


export const AuthContextProvider = ({children}) => {
  
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState(null)
  const [authIsReady, setAuthIsReady] = useState(false)
  const [error, setError] = useState(null)


  const routingObject = {
    "NkKiAR3ilWNxyaXWc8wvCmChFEA3": "/jonathan",
    "eybkaZdJSlXIkhQcqNXElokxGgp1": "/rachel",
    "WpZXrASqMkPP2rJbBoci8AFOvm52": "/raul",
    "N1KeYAkh19hlzLmhz6UtdQuQwzY2": "/senya",
    "rF4bp8yxrNgQrY0WrNFgxv5Gmqc2": "/taisiya",
    "qVSZ7lBYUmNvG0n5loadRIM44fW2": "/tiago"
  }


  const logIn = async (email, password) => {
    try {
        setError(null)
        const userCredential = await signInWithEmailAndPassword(auth, email, password)

        console.log("displayName added")

        const route = routingObject[userCredential.user.uid]

        router.push(route)

    } catch(err) {
        console.log("sign in failed:", err.message)
        let errorMessage
        switch(err.code) {
          case "auth/wrong-password": {
            errorMessage = "wrong password, try again"
            break;
          }
          case "auth/user-not-found": {
            errorMessage = "email not recognized, try again"
          }
        }
        setError(errorMessage)
    }
  }


  const logOut = async () => {
    try {
      await signOut(auth)
      console.log("the user has logged out!")
      router.push("/")
    } catch(err) {
      console.log("signout failed:", err.message)
    }
  }


  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
        console.log("onAuthStateChanged fired...", user)
        if(user) {
            setCurrentUser(user)
            setAuthIsReady(true)
            console.log("see current user:", user.uid)
        } else {
            setCurrentUser(null)
            setAuthIsReady(true)
        }
      })

      return () => {
        unsub()
      }
  }, [])



  return (
    <AuthContext.Provider value={{logIn, logOut, error, currentUser, authIsReady}}>
        {children}
    </AuthContext.Provider>
  )
}