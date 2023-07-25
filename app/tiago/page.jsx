

import Link from "next/link";


const TiagoPage = () => {

    return (
      <>
        <main className="pt-10 px-20 w-full">
            <h2 className="mb-8">Hi Tiago, what would you like to do today?</h2>
            <Link href="/tiago/hours/week1"><button className="bg-green-500 text-white hover:bg-green-400 py-3 px-6 rounded">
              Log My Work Hours
            </button></Link>
        </main>
      </>
    )
  }
  
  export default TiagoPage