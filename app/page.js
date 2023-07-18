import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { Header } from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="p-10 w-full">
      <div className="text-black">Hello world!</div>
    </main>
  )
}
