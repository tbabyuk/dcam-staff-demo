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
    "tULsJxwXKQcxf8L4nnmK2oRLViD2": "/diego"

  }


  const logIn = async (email, password) => {
    try {
        setError(null)
        const userCredential = await signInWithEmailAndPassword(auth, email, password)

        // await updateProfile(userCredential.user, {
        //   photoURL: "https://firebasestorage.googleapis.com/v0/b/dcam-staff-demo.appspot.com/o/images%2Ffemale.jpg?alt=media&token=f7505d62-189c-42bd-b461-8e7beefa453b",
        //   displayName: "Paula"
        // })

        const route = routingObject[userCredential.user.uid]

        router.push(route)

    } catch(err) {
        console.log("something went wrong:", err.message)
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