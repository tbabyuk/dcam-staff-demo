
import './globals.css'
import { Header } from './components/Header'
import { AuthContextProvider } from '@components/context/AuthContext'

export const metadata = {
  title: 'DCAM Staff Demo',
  description: 'Demo version of DCAM Staff app',
}

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <AuthContextProvider>
          <body>
              <Header />
              {children}
          </body>
      </AuthContextProvider>
    </html>
  )
}
