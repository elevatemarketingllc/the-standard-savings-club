import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { RefreshCw, Eye, EyeOff, Check, Building2 } from 'lucide-react'

export default function BusinessRegister() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName: '', lastName: '', businessName: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (!form.phone.trim()) { setError('Phone number is required.'); return }
    setLoading(true)
    const { error } = await signUp(form.email, form.password, {
      first_name: form.firstName,
      last_name: form.lastName,
      full_name: `${form.firstName} ${form.lastName}`,
      phone: form.phone,
      business_name: form.businessName,
      account_type: 'business',
    })
    if (error) { setError(error.message); setLoading(false) }
    else { setSuccess(true); setLoading(false) }
  }

  if (success) return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-maroon-900 text-white py-12 text-center">
        <Link to="/" className="font-heading text-xs tracking-widest uppercase text-gray-300 hover:text-white transition-colors mb-3 block">← The Standard Savings Club</Link>
        <h1 className="font-heading text-4xl uppercase font-bold">Account Created</h1>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white border border-gray-200 shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-maroon-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={28} color="white" strokeWidth={2.5} />
          </div>
          <h2 className="font-heading text-2xl uppercase text-maroon-900 mb-3">Almost There!</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            We've sent a confirmation email to <strong>{form.email}</strong>. Once you confirm your email, Ben will link your account to your business page — usually within 24 hours.
          </p>
          <p className="text-gray-400 text-xs mb-6">You'll receive an email when your portal access is ready.</p>
          <Link to="/business-login" className="block w-full bg-maroon-700 hover:bg-maroon-800 text-white font-heading font-semibold tracking-widest uppercase py-4 transition-colors text-center">
            Go to Partner Login
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-maroon-900 text-white py-12 text-center">
        <Link to="/" className="font-heading text-xs tracking-widest uppercase text-gray-300 hover:text-white transition-colors mb-3 block">← The Standard Savings Club</Link>
        <div className="flex items-center justify-center gap-3 mb-2">
          <Building2 size={24} className="text-maroon-300" />
          <span className="font-heading text-xs tracking-widest uppercase text-maroon-300">Business Partner</span>
        </div>
        <h1 className="font-heading text-4xl uppercase font-bold">Create Business Account</h1>
        <p className="text-maroon-200 text-sm mt-2">Set up your partner portal access</p>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white border border-gray-200 shadow-sm p-8">
            <div className="bg-maroon-50 border border-maroon-100 px-4 py-3 mb-6">
              <p className="text-maroon-700 text-xs leading-relaxed">
                <strong>Existing partners only.</strong> Your account will be linked to your business page by Ben after registration. Not a partner yet?{' '}
                <Link to="/for-businesses" className="underline">Learn about joining →</Link>
              </p>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-6">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">First Name</label>
                  <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required placeholder="Jane"
                    className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
                </div>
                <div>
                  <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Last Name</label>
                  <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Smith"
                    className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
                </div>
              </div>
              <div>
                <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Business Name</label>
                <input type="text" name="businessName" value={form.businessName} onChange={handleChange} required placeholder="Your Business Name"
                  className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
              </div>
              <div>
                <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Business Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@yourbusiness.com"
                  className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
              </div>
              <div>
                <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Phone <span className="text-red-500">*</span></label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="(208) 555-0100"
                  className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
              </div>
              <div>
                <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} required placeholder="At least 8 characters"
                    className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm pr-12" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Confirm Password</label>
                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required placeholder="Repeat password"
                  className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-maroon-700 hover:bg-maroon-800 disabled:opacity-60 text-white font-heading font-semibold tracking-widest uppercase py-4 transition-colors flex items-center justify-center gap-2 mt-2">
                {loading ? <><RefreshCw size={16} className="animate-spin" /> Creating Account...</> : 'Create Business Account'}
              </button>
            </form>
            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-gray-500 text-sm">Already have an account? <Link to="/business-login" className="text-maroon-700 hover:text-maroon-900 font-semibold">Sign In →</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
