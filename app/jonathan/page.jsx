"use client"

import Link from "next/link";
import Router from "next/router";
import { useAuthContext } from "@components/context/AuthContext";
import { useRouter } from "next/navigation";



const JonathanPage = () => {

  const router = useRouter()
  const {currentUser} = useAuthContext()



  if(currentUser && currentUser.uid === "NkKiAR3ilWNxyaXWc8wvCmChFEA3") {
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
  } else {
      router.push("/")
  }


  }

  
  export default JonathanPage