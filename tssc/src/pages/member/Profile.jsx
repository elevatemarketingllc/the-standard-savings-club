import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { ChevronLeft, Check, RefreshCw, ExternalLink, Camera, Smile } from 'lucide-react'

const STRIPE_PORTAL_URL = 'https://billing.stripe.com/p/login/28E28s1GVfxU2M4b0N3wQ00'

const EMOJIS = ['😊','😎','🤙','💪','🏆','⭐','🔥','🎯','🙌','👊','✌️','🤝','🦁','🐻','🦅','🌵','🏔️','🌲','🤠','👋']

export default function Profile() {
  const { user, signOut } = useAuth()
  const [profile, setProfile] = useState(null)
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '' })
  const [avatar, setAvatar] = useState('😊')
  const [avatarType, setAvatarType] = useState('emoji')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const fileRef = useRef()

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    if (data) {
      setProfile(data)
      setForm({ firstName: data.first_name || '', lastName: data.last_name || '', phone: data.phone || '' })
      setAvatar(data.avatar || '😊')
      setAvatarType(data.avatar_type || 'emoji')
      if (data.avatar_type === 'image') setAvatarPreview(data.avatar)
    } else {
      // No profile yet — use auth metadata
      setForm({
        firstName: user?.user_metadata?.first_name || '',
        lastName: user?.user_metadata?.last_name || '',
        phone: user?.user_metadata?.phone || '',
      })
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setAvatarPreview(ev.target.result)
      setAvatar(ev.target.result)
      setAvatarType('image')
    }
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)

    const profileData = {
      id: user.id,
      first_name: form.firstName,
      last_name: form.lastName,
      phone: form.phone,
      avatar,
      avatar_type: avatarType,
      updated_at: new Date().toISOString(),
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .upsert(profileData)

    const { error: authError } = await supabase.auth.updateUser({
      data: { first_name: form.firstName, last_name: form.lastName, phone: form.phone, full_name: `${form.firstName} ${form.lastName}` }
    })

    if (profileError || authError) {
      setError((profileError || authError).message)
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
    setSaving(false)
  }

  const displayAvatar = avatarType === 'image' ? null : avatar

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-maroon-900 text-white py-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/member" className="flex items-center gap-1 text-maroon-300 hover:text-white text-xs font-heading tracking-widest uppercase mb-4 transition-colors">
            <ChevronLeft size={14} /> Back to Dashboard
          </Link>
          <h1 className="font-heading text-3xl sm:text-4xl uppercase font-bold">My Profile</h1>
          <p className="text-maroon-300 text-sm mt-1">Manage your account and membership</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">

        {/* Avatar picker */}
        <div className="bg-white border border-gray-200 shadow-sm p-8">
          <h2 className="font-heading text-xl uppercase text-maroon-900 mb-6">Profile Picture</h2>

          <div className="flex items-center gap-6">
            {/* Current avatar */}
            <div className="relative">
              <div className="w-20 h-20 bg-maroon-50 border-2 border-maroon-200 rounded-full flex items-center justify-center overflow-hidden">
                {avatarType === 'image' && avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl">{avatar}</span>
                )}
              </div>
            </div>

            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-3">Choose an emoji or upload a photo</p>
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => { setShowEmojiPicker(!showEmojiPicker) }}
                  className="flex items-center gap-1.5 border border-gray-300 hover:border-maroon-400 text-gray-600 hover:text-maroon-700 text-xs font-heading tracking-widest uppercase px-3 py-2 transition-colors">
                  <Smile size={13} /> Pick Emoji
                </button>
                <button onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-1.5 border border-gray-300 hover:border-maroon-400 text-gray-600 hover:text-maroon-700 text-xs font-heading tracking-widest uppercase px-3 py-2 transition-colors">
                  <Camera size={13} /> Upload Photo
                </button>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </div>
            </div>
          </div>

          {/* Emoji picker */}
          {showEmojiPicker && (
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200">
              <p className="text-xs text-gray-500 font-heading tracking-widest uppercase mb-3">Choose your emoji</p>
              <div className="flex flex-wrap gap-2">
                {EMOJIS.map(emoji => (
                  <button key={emoji} onClick={() => { setAvatar(emoji); setAvatarType('emoji'); setAvatarPreview(null); setShowEmojiPicker(false) }}
                    className={`w-10 h-10 text-2xl rounded-full flex items-center justify-center hover:bg-maroon-100 transition-colors ${avatar === emoji && avatarType === 'emoji' ? 'bg-maroon-100 ring-2 ring-maroon-400' : ''}`}>
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile info */}
        <div className="bg-white border border-gray-200 shadow-sm p-8">
          <h2 className="font-heading text-xl uppercase text-maroon-900 mb-6">Account Information</h2>

          {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-6">{error}</div>}

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">First Name</label>
                <input type="text" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})}
                  className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
              </div>
              <div>
                <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Last Name</label>
                <input type="text" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})}
                  className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
              </div>
            </div>

            <div>
              <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Email Address</label>
              <input type="email" value={user?.email || ''} disabled
                className="w-full border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 cursor-not-allowed" />
              <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
            </div>

            <div>
              <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Phone <span className="text-gray-400 normal-case">(optional)</span></label>
              <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="(208) 555-0123"
                className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
            </div>

            <button onClick={handleSave} disabled={saving}
              className="flex items-center gap-2 bg-maroon-700 hover:bg-maroon-800 disabled:opacity-60 text-white font-heading text-xs tracking-widest uppercase px-6 py-3 transition-colors">
              {saving ? <><RefreshCw size={13} className="animate-spin" /> Saving...</>
                : saved ? <><Check size={13} /> Saved!</>
                : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Membership */}
        <div className="bg-white border border-gray-200 shadow-sm p-8">
          <h2 className="font-heading text-xl uppercase text-maroon-900 mb-4">Membership</h2>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <div className="font-semibold text-sm text-gray-900">The Standard Savings Club</div>
              <div className="text-xs text-gray-500 mt-0.5">$33/month</div>
            </div>
            <span className="bg-green-100 text-green-700 text-xs font-heading tracking-wider uppercase px-3 py-1">Active</span>
          </div>
          <div className="mt-4">
            <a href={STRIPE_PORTAL_URL} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-maroon-700 hover:text-maroon-900 text-sm font-heading tracking-wide uppercase transition-colors">
              Manage Billing <ExternalLink size={13} />
            </a>
            <p className="text-xs text-gray-400 mt-1">Update payment method, view invoices, or cancel</p>
          </div>
        </div>

        {/* Sign out */}
        <div className="bg-white border border-gray-200 shadow-sm p-8">
          <h2 className="font-heading text-xl uppercase text-maroon-900 mb-4">Account Actions</h2>
          <button onClick={signOut}
            className="border border-gray-300 hover:border-red-300 hover:text-red-600 text-gray-600 font-heading text-xs tracking-widest uppercase px-5 py-2.5 transition-colors">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
