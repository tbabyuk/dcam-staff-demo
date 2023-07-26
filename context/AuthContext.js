"use client"


import { createContext } from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@components/firebase/config";
import { useRouter } from "next/navigation";


export const AuthContext = createContext()


export const AuthContextProvider = ({children}) => {
  
  const router = useRouter()
  const [job, setJob] = useState("farmer1")
  const [currentUser, setCurrentUser] = useState(null)


  const logIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        switch(userCredential.user.uid) {
          case "NkKiAR3ilWNxyaXWc8wvCmChFEA3": {
            router.push("/jonathan")
            break;
          }
          case "eybkaZdJSlXIkhQcqNXElokxGgp1": {
            router.push("/rachel")
            break;
          }
          case "WpZXrASqMkPP2rJbBoci8AFOvm52": {
            router.push("/raul")
            break;
          }
          case "N1KeYAkh19hlzLmhz6UtdQuQwzY2": {
            router.push("/senya")
            break;
          }
          case "rF4bp8yxrNgQrY0WrNFgxv5Gmqc2": {
            router.push("/taisiya")
            break;
          }
          case "qVSZ7lBYUmNvG0n5loadRIM44fW2": {
            router.push("/tiago")
            break;
          }
        }

    } catch(err) {
        console.log("sign in failed:", err.message)
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