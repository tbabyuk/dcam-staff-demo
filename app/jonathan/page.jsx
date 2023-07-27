"use client"

import Link from "next/link";
import { useAuthContext } from "@components/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



const JonathanPage = () => {

  const router = useRouter()
  const {currentUser, authIsReady} = useAuthContext()


  useEffect(() => {
    if (!authIsReady) {
      // if authIsReady is false, the authentication process is still in progress, so don't redirect
      return;
    }
    if(!currentUser || currentUser.uid !== "NkKiAR3ilWNxyaXWc8wvCmChFEA3") {
      router.push("/")
    }
  }, [authIsReady])

  
    return (
      <>
          <main className="pt-10 px-20 w-full h-[calc(100vh-64px)] bg-[url('/images/main_bg.jpg')] bg-cover bg-center">
              <h2 className="mb-8">Hi Jonathan, what would you like to do today?</h2>
              <Link href="/jonathan/hours/week1"><button className="dcam-btn">
                Log My Work Hours
              </button></Link>
          </main>
      </>
    )
}

  
  export default JonathanPage