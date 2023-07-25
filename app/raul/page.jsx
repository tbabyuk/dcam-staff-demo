

import Link from "next/link";


const RaulPage = () => {

    return (
      <>
        <main className="pt-10 px-20 w-full bg-[url('/images/main_bg.jpg')] bg-cover bg-center">
            <h2 className="mb-8">Hi Raul, what would you like to do today?</h2>
            <Link href="/raul/hours/week1"><button className="bg-green-500 text-white hover:bg-green-400 py-3 px-6 rounded">
              Log My Work Hours
            </button></Link>
        </main>
      </>
    )
  }
  
  export default RaulPage