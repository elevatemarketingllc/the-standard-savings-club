import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { RefreshCw, Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate('/member')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Header */}
      <div className="bg-maroon-900 text-white py-12 text-center">
        <Link to="/" className="font-heading text-xs tracking-widest uppercase text-gray-300 hover:text-white transition-colors mb-3 block">
          ← The Standard Savings Club
        </Link>
        <h1 className="font-heading text-4xl uppercase font-bold">Member Login</h1>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-start justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="bg-white border border-gray-200 shadow-sm p-8">

            <h2 className="font-heading text-2xl uppercase text-maroon-900 mb-1">Welcome Back</h2>
            <p className="text-gray-500 text-sm mb-8">Sign in to access your member benefits.</p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-6">
                {error === 'Invalid login credentials'
                  ? 'Incorrect email or password. Please try again.'
                  : error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="you@email.com"
                  className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm transition-colors"
                />
              </div>

              <div>
                <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="Your password"
                    className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm transition-colors pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-maroon-700 hover:bg-maroon-800 disabled:opacity-60 text-white font-heading font-semibold tracking-widest uppercase py-4 transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><RefreshCw size={16} className="animate-spin" /> Signing in...</>
                ) : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center space-y-3">
              <p className="text-gray-500 text-sm">
                Not a member yet?{' '}
                <Link to="/join" className="text-maroon-700 hover:text-maroon-900 font-semibold transition-colors">
                  Join for $33/month
                </Link>
              </p>
              <p className="text-gray-400 text-xs">
                Just signed up?{' '}
                <Link to="/register" className="text-maroon-700 hover:text-maroon-900 transition-colors">
                  Create your account here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
