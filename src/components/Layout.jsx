import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import FloatingWhatsApp from './FloatingWhatsApp.jsx'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
