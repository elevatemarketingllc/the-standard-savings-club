import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { RefreshCw, Eye, EyeOff, Check } from 'lucide-react'

export default function Register() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)

    const { error } = await signUp(form.email, form.password, {
      first_name: form.firstName,
      last_name: form.lastName,
      phone: form.phone,
      full_name: `${form.firstName} ${form.lastName}`,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-maroon-900 text-white py-12 text-center">
          <Link to="/" className="font-heading text-xs tracking-widest uppercase text-gray-300 hover:text-white transition-colors mb-3 block">
            ← The Standard Savings Club
          </Link>
          <h1 className="font-heading text-4xl uppercase font-bold">Check Your Email</h1>
        </div>
        <div className="flex-1 flex items-start justify-center px-4 py-16">
          <div className="w-full max-w-md">
            <div className="bg-white border border-gray-200 shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-maroon-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={28} color="white" strokeWidth={2.5} />
              </div>
              <h2 className="font-heading text-2xl uppercase text-maroon-900 mb-3">Account Created!</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                We sent a confirmation email to <strong>{form.email}</strong>. Click the link in that email to verify your account and access your member benefits.
              </p>
              <p className="text-gray-400 text-xs mb-6">Don't see it? Check your spam folder.</p>
              <Link
                to="/login"
                className="block w-full bg-maroon-700 hover:bg-maroon-800 text-white font-heading font-semibold tracking-widest uppercase py-4 transition-colors text-center"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-maroon-900 text-white py-12 text-center">
        <Link to="/" className="font-heading text-xs tracking-widest uppercase text-gray-300 hover:text-white transition-colors mb-3 block">
          ← The Standard Savings Club
        </Link>
        <h1 className="font-heading text-4xl uppercase font-bold">Create Your Account</h1>
        <p className="text-maroon-200 text-sm mt-2">Already paid? Set up your member account below.</p>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white border border-gray-200 shadow-sm p-8">

            <div className="bg-maroon-50 border border-maroon-100 p-4 mb-6">
              <p className="text-maroon-700 text-xs font-heading tracking-wider uppercase font-semibold mb-1">Already paid via Stripe?</p>
              <p className="text-gray-600 text-xs leading-relaxed">Use the same email address you used during checkout to link your subscription to your account.</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    placeholder="Ben"
                    className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm transition-colors"
                  />
                </div>
                <div>
                  <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Galvan"
                    className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@email.com"
                  className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm transition-colors"
                />
              </div>

              <div>
                <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Phone Number <span className="text-gray-400 normal-case">(optional)</span></label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="(208) 555-0123"
                  className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm transition-colors"
                />
              </div>

              <div>
                <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="At least 8 characters"
                    className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm transition-colors pr-12"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Repeat password"
                  className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-maroon-700 hover:bg-maroon-800 disabled:opacity-60 text-white font-heading font-semibold tracking-widest uppercase py-4 transition-colors flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <><RefreshCw size={16} className="animate-spin" /> Creating Account...</>
                ) : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-gray-500 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-maroon-700 hover:text-maroon-900 font-semibold transition-colors">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
