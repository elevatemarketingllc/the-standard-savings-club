import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <nav className="bg-maroon-700 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-heading text-lg font-bold tracking-widest uppercase hover:text-maroon-200 transition-colors">
            The Standard Savings Club
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-heading tracking-wider uppercase hover:text-maroon-200 transition-colors">Home</Link>
            <Link to="/join" className="text-sm font-heading tracking-wider uppercase hover:text-maroon-200 transition-colors">Join</Link>
            <Link to="/business" className="text-sm font-heading tracking-wider uppercase hover:text-maroon-200 transition-colors">For Businesses</Link>
            {user ? (
              <>
                <Link to="/member" className="text-sm font-heading tracking-wider uppercase hover:text-maroon-200 transition-colors">My Account</Link>
                <button onClick={handleSignOut} className="bg-gray-100 hover:bg-white text-maroon-900 font-heading text-sm tracking-wider uppercase px-4 py-2 transition-colors">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-heading tracking-wider uppercase hover:text-maroon-200 transition-colors">Login</Link>
                <Link to="/join" className="bg-maroon-700 hover:bg-maroon-800 text-white font-heading text-sm tracking-wider uppercase px-5 py-2 transition-colors">
                  Join — $33/mo
                </Link>
              </>
            )}
          </div>
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-maroon-800 px-4 pb-4 flex flex-col gap-3">
          <Link to="/" className="text-sm font-heading tracking-wider uppercase py-2" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/join" className="text-sm font-heading tracking-wider uppercase py-2" onClick={() => setMobileOpen(false)}>Join</Link>
          <Link to="/business" className="text-sm font-heading tracking-wider uppercase py-2" onClick={() => setMobileOpen(false)}>For Businesses</Link>
          {user ? (
            <>
              <Link to="/member" className="text-sm font-heading tracking-wider uppercase py-2" onClick={() => setMobileOpen(false)}>My Account</Link>
              <button onClick={handleSignOut} className="bg-maroon-700 text-white font-heading text-sm tracking-wider uppercase px-5 py-2 text-left">Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-heading tracking-wider uppercase py-2" onClick={() => setMobileOpen(false)}>Login</Link>
              <Link to="/join" className="bg-maroon-700 text-white font-heading text-sm tracking-wider uppercase px-5 py-2 text-center" onClick={() => setMobileOpen(false)}>Join — $33/mo</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
