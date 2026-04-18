import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Menu, X, Building2 } from 'lucide-react'

export default function Navbar() {
  const { user, signOut, isBusiness } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
    setMobileOpen(false)
  }

  return (
    <nav className="bg-maroon-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-heading text-lg sm:text-xl uppercase font-bold tracking-wide hover:text-maroon-200 transition-colors flex-shrink-0">
            The Standard Savings Club
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {isBusiness ? (
              // Business nav
              <>
                <Link to="/business-portal" className="text-sm font-heading tracking-wider uppercase hover:text-white text-maroon-300 transition-colors flex items-center gap-1.5">
                  <Building2 size={13} /> My Portal
                </Link>
                <Link to="/businesses" className="text-sm font-heading tracking-wider uppercase hover:text-white text-maroon-300 transition-colors">Partners</Link>
                <button onClick={handleSignOut} className="text-sm font-heading tracking-wider uppercase hover:text-white text-maroon-300 transition-colors">Sign Out</button>
              </>
            ) : user ? (
              // Member nav
              <>
                <Link to="/" className="text-sm font-heading tracking-wider uppercase hover:text-white transition-colors">Home</Link>
                <Link to="/businesses" className="text-sm font-heading tracking-wider uppercase hover:text-white transition-colors">Partners</Link>
                <Link to="/member" className="text-sm font-heading tracking-wider uppercase hover:text-white transition-colors">My Account</Link>
                <button onClick={handleSignOut}
                  className="border border-maroon-600 hover:border-white text-sm font-heading tracking-wider uppercase px-4 py-1.5 transition-colors">
                  Sign Out
                </button>
              </>
            ) : (
              // Guest nav
              <>
                <Link to="/" className="text-sm font-heading tracking-wider uppercase hover:text-white transition-colors">Home</Link>
                <Link to="/join" className="text-sm font-heading tracking-wider uppercase hover:text-white transition-colors">Join</Link>
                <Link to="/for-businesses" className="text-sm font-heading tracking-wider uppercase hover:text-white transition-colors">For Businesses</Link>
                <Link to="/businesses" className="text-sm font-heading tracking-wider uppercase hover:text-white transition-colors">Partners</Link>
                <Link to="/login" className="text-sm font-heading tracking-wider uppercase hover:text-white transition-colors">Login</Link>
                <Link to="/join"
                  className="border border-white hover:bg-white hover:text-maroon-900 text-sm font-heading tracking-wider uppercase px-4 py-1.5 transition-colors">
                  Join — $33/mo
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-maroon-300 hover:text-white">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-maroon-800 border-t border-maroon-700 px-4 py-4 flex flex-col gap-3">
          {isBusiness ? (
            <>
              <Link to="/business-portal" className="text-sm font-heading tracking-wider uppercase py-2 flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                <Building2 size={13} /> My Portal
              </Link>
              <Link to="/businesses" className="text-sm font-heading tracking-wider uppercase py-2" onClick={() => setMobileOpen(false)}>Partners</Link>
              <button onClick={handleSignOut} className="text-sm font-heading tracking-wider uppercase py-2 text-left text-maroon-300">Sign Out</button>
            </>
          ) : user ? (
            <>
              <Link to="/" className="text-sm font-heading tracking-wider uppercase py-2" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link to="/businesses" className="text-sm font-heading tracking-wider uppercase py-2" onClick={() => setMobileOpen(false)}>Partners</Link>
              <Link to="/member" className="text-sm font-heading tracking-wider uppercase py-2" onClick={() => setMobileOpen(false)}>My Account</Link>
              <button onClick={handleSignOut} className="text-sm font-heading tracking-wider uppercase py-2 text-left text-maroon-300">Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/" className="text-sm font-heading tracking-wider uppercase py-2" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link to="/join" className="text-sm font-heading tracking-wider uppercase py-2" onClick={() => setMobileOpen(false)}>Join</Link>
              <Link to="/for-businesses" className="text-sm font-heading tracking-wider uppercase py-2" onClick={() => setMobileOpen(false)}>For Businesses</Link>
              <Link to="/businesses" className="text-sm font-heading tracking-wider uppercase py-2" onClick={() => setMobileOpen(false)}>Partners</Link>
              <Link to="/login" className="text-sm font-heading tracking-wider uppercase py-2" onClick={() => setMobileOpen(false)}>Member Login</Link>
              <Link to="/business-login" className="text-sm font-heading tracking-wider uppercase py-2 text-maroon-300" onClick={() => setMobileOpen(false)}>Business Login</Link>
              <Link to="/join" className="bg-white text-maroon-900 text-center font-heading text-sm tracking-wider uppercase px-4 py-3 mt-1" onClick={() => setMobileOpen(false)}>
                Join — $33/mo
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
