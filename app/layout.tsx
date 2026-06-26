import "./globals.css"
import AuthSessionProvider from "./components/SessionProvider"
import Navbar from "./components/NavBar"
import { NotificationProvider } from "./components/NotificationContext"
import Notification from "./components/Notification"

const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (<html lang='en'>
    <body className="min-h-screen bg-background text-foreground">
      <AuthSessionProvider>
        <NotificationProvider>
          <Navbar/>
        <Notification />
        {children}
        </NotificationProvider>
        </AuthSessionProvider>
        </body>
  </html>)
}

export default RootLayout
