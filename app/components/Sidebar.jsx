
import Link from "next/link"

export const Sidebar = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] w-[200px] bg-gray-200 pt-12 px-6 flex-shrink-0 hidden md:block">
        <ul>
            <li className="mb-6 h-12 rounded overflow-hidden">
                <Link href="/heather" className="bg-blue-300 grid h-full place-items-center cursor-pointer hover:bg-blue-500">Heather</Link>
            </li>
            <li className="mb-6 h-12 rounded overflow-hidden">
                <Link href="/rachel" className="bg-blue-300 grid h-full place-items-center cursor-pointer hover:bg-blue-500">Rachel</Link>
            </li>
            <li className="mb-6 h-12 rounded overflow-hidden">
                <Link href="/raul" className="bg-blue-300 grid h-full place-items-center cursor-pointer hover:bg-blue-500">Raul</Link>
            </li>
            <li className="mb-6 h-12 rounded overflow-hidden">
                <Link href="/senya" className="bg-blue-300 grid h-full place-items-center cursor-pointer hover:bg-blue-500">Senya</Link>
            </li>
            <li className="mb-6 h-12 rounded overflow-hidden">
                <Link href="/taisiya" className="bg-blue-300 grid h-full place-items-center cursor-pointer hover:bg-blue-500">Taisiya</Link>
            </li>
            <li className="mb-6 h-12 rounded overflow-hidden">
                <Link href="/tiago" className="bg-blue-300 grid h-full place-items-center cursor-pointer hover:bg-blue-500">Tiago</Link>
            </li>
        </ul>
    </div>
  )
}