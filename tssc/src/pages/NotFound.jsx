import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function NotFound() {
  const { user, isBusiness } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md">
        <div className="font-heading text-8xl font-bold text-maroon-200 mb-4">404</div>
        <h1 className="font-heading text-3xl uppercase text-maroon-900 mb-3">Page Not Found</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          This page doesn't exist or may have been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="bg-maroon-700 hover:bg-maroon-800 text-white font-heading text-xs tracking-widest uppercase px-6 py-3 transition-colors">
            Go Home
          </Link>
          {user && !isBusiness && (
            <Link to="/member" className="border border-maroon-300 text-maroon-700 hover:bg-maroon-50 font-heading text-xs tracking-widest uppercase px-6 py-3 transition-colors">
              My Dashboard
            </Link>
          )}
          {isBusiness && (
            <Link to="/business-portal" className="border border-maroon-300 text-maroon-700 hover:bg-maroon-50 font-heading text-xs tracking-widest uppercase px-6 py-3 transition-colors">
              My Portal
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
