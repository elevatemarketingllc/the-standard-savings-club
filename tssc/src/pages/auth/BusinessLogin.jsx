import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { RefreshCw, Eye, EyeOff, Building2 } from 'lucide-react'

export default function BusinessLogin() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error, data } = await signIn(email, password)
    if (error) {
      setError('Incorrect email or password. Please try again.')
      setLoading(false)
      return
    }
    // Check if this user is a business owner
    const { data: bizUser } = await supabase
      .from('business_users')
      .select('business_id')
      .eq('user_id', data.user.id)
      .single()

    if (bizUser) {
      navigate('/business-portal')
    } else {
      // Not a business owner — send them back
      setError('No business account found for this email. Contact The Standard Savings Club to get set up.')
      await supabase.auth.signOut()
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-maroon-900 text-white py-12 text-center">
        <Link to="/" className="font-heading text-xs tracking-widest uppercase text-gray-300 hover:text-white transition-colors mb-3 block">← The Standard Savings Club</Link>
        <div className="flex items-center justify-center gap-3 mb-2">
          <Building2 size={24} className="text-maroon-300" />
          <span className="font-heading text-xs tracking-widest uppercase text-maroon-300">Business Partner</span>
        </div>
        <h1 className="font-heading text-4xl uppercase font-bold">Partner Portal Login</h1>
        <p className="text-maroon-300 text-sm mt-2">Access your business dashboard</p>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="bg-white border border-gray-200 shadow-sm p-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-6">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@yourbusiness.com"
                  className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
              </div>
              <div>
                <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="Your password"
                    className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm pr-12" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-maroon-700 hover:bg-maroon-800 disabled:opacity-60 text-white font-heading font-semibold tracking-widest uppercase py-4 transition-colors flex items-center justify-center gap-2">
                {loading ? <><RefreshCw size={16} className="animate-spin" /> Signing In...</> : 'Access Partner Portal'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 space-y-3 text-center">
              <p className="text-gray-500 text-sm">
                New business partner? <Link to="/business-register" className="text-maroon-700 hover:text-maroon-900 font-semibold">Create your account →</Link>
              </p>
              <p className="text-gray-400 text-xs">
                Not a business? <Link to="/login" className="text-maroon-700 hover:text-maroon-900">Member login →</Link>
              </p>
            </div>
          </div>

          <div className="mt-4 bg-maroon-50 border border-maroon-100 p-4 text-center">
            <p className="text-maroon-700 text-xs leading-relaxed">
              Need to get your business set up on The Standard Savings Club?{' '}
              <Link to="/for-businesses" className="font-semibold underline">Learn more →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
