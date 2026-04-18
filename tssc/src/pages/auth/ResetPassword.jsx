import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { RefreshCw, Eye, EyeOff, Check } from 'lucide-react'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  // Supabase puts the token in the URL hash on redirect
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'PASSWORD_RECOVERY') {
        // User is in recovery mode — form will handle it
      }
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (password !== confirm) { setError('Passwords do not match.'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    if (error) { setError(error.message); setLoading(false) }
    else { setSuccess(true); setLoading(false); setTimeout(() => navigate('/login'), 2500) }
  }

  if (success) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 shadow-sm p-8 max-w-md w-full text-center">
        <div className="w-14 h-14 bg-maroon-700 rounded-full flex items-center justify-center mx-auto mb-5">
          <Check size={24} color="white" strokeWidth={2.5} />
        </div>
        <h2 className="font-heading text-2xl uppercase text-maroon-900 mb-2">Password Updated</h2>
        <p className="text-gray-500 text-sm">Redirecting you to login...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-maroon-900 text-white py-12 text-center">
        <Link to="/" className="font-heading text-xs tracking-widest uppercase text-gray-300 hover:text-white transition-colors mb-3 block">← The Standard Savings Club</Link>
        <h1 className="font-heading text-4xl uppercase font-bold">Set New Password</h1>
      </div>
      <div className="flex-1 flex items-start justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="bg-white border border-gray-200 shadow-sm p-8">
            {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-6">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">New Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="At least 8 characters"
                    className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm pr-12" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Confirm Password</label>
                <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required placeholder="Repeat new password"
                  className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-maroon-700 hover:bg-maroon-800 disabled:opacity-60 text-white font-heading font-semibold tracking-widest uppercase py-4 transition-colors flex items-center justify-center gap-2">
                {loading ? <><RefreshCw size={16} className="animate-spin" /> Updating...</> : 'Update Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
