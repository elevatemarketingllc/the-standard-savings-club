import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { Link } from 'react-router-dom'
import { ChevronLeft, Download, Share2 } from 'lucide-react'

export default function MemberCard() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadProfile() }, [])

  // Hide navbar on mobile for fullscreen card experience
  useEffect(() => {
    const nav = document.querySelector('nav')
    if (nav && window.innerWidth < 768) {
      nav.style.display = 'none'
    }
    return () => {
      const nav = document.querySelector('nav')
      if (nav) nav.style.display = ''
    }
  }, [])

  const loadProfile = async () => {
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    setProfile(data)
    setLoading(false)
  }

  const firstName = profile?.first_name || user?.user_metadata?.first_name || 'Member'
  const lastName = profile?.last_name || user?.user_metadata?.last_name || ''
  const membershipId = profile?.membership_id || 'TSSC-000000'
  const verifyUrl = `${window.location.origin}/verify/${membershipId}`
  const avatar = profile?.avatar || '😊'
  const avatarType = profile?.avatar_type || 'emoji'

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: 'My TSSC Membership', url: verifyUrl })
    } else {
      navigator.clipboard.writeText(verifyUrl)
      alert('Verification link copied!')
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-maroon-950 flex items-center justify-center">
      <div className="text-white font-heading text-sm uppercase tracking-widest opacity-50">Loading...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-maroon-950 flex flex-col items-center justify-center px-4 py-8 [&~footer]:hidden">
      {/* Back link */}
      <div className="w-full max-w-sm mb-6">
        <Link to="/member" className="flex items-center gap-1 text-maroon-400 hover:text-white text-xs font-heading tracking-widest uppercase transition-colors">
          <ChevronLeft size={14} /> Back to Dashboard
        </Link>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm">
        <div className="bg-gradient-to-br from-maroon-800 to-maroon-950 border border-maroon-700 rounded-2xl overflow-hidden shadow-2xl">
          {/* Card header */}
          <div className="bg-maroon-900 px-6 py-5 flex items-center justify-between border-b border-maroon-700">
            <div>
              <div className="font-heading text-xs tracking-widest uppercase text-maroon-400 mb-0.5">The Standard</div>
              <div className="font-heading text-xl uppercase font-bold text-white">Savings Club</div>
            </div>
            <div className="text-right">
              <div className="font-heading text-xs tracking-widest uppercase text-maroon-400 mb-0.5">Status</div>
              <div className="flex items-center gap-1.5 justify-end">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="font-heading text-xs uppercase text-green-400">Active</span>
              </div>
            </div>
          </div>

          {/* Member info */}
          <div className="px-6 py-5 flex items-center gap-4 border-b border-maroon-700/50">
            <div className="w-14 h-14 rounded-full bg-maroon-800 border-2 border-maroon-600 flex items-center justify-center overflow-hidden flex-shrink-0">
              {avatarType === 'image' && profile?.avatar
                ? <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                : <span className="text-3xl">{avatar}</span>
              }
            </div>
            <div>
              <div className="font-heading text-xl uppercase font-bold text-white">{firstName} {lastName}</div>
              <div className="font-heading text-xs tracking-widest uppercase text-maroon-400 mt-0.5">{membershipId}</div>
            </div>
          </div>

          {/* QR Code */}
          <div className="px-6 py-8 flex flex-col items-center">
            <div className="bg-white rounded-xl p-4 mb-4 shadow-lg">
              <QRCodeSVG
                value={verifyUrl}
                size={200}
                bgColor="#ffffff"
                fgColor="#3d1214"
                level="M"
                includeMargin={false}
              />
            </div>
            <p className="text-maroon-400 text-xs text-center font-heading tracking-wider uppercase">Show this QR code at partner businesses</p>
          </div>

          {/* Card footer */}
          <div className="px-6 py-4 bg-maroon-900/50 border-t border-maroon-700/50 flex items-center justify-between">
            <div className="text-maroon-500 text-xs font-heading tracking-widest uppercase">Boise, Idaho</div>
            <div className="text-maroon-500 text-xs font-heading tracking-widest uppercase">$33/month</div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-5">
          <button onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 bg-maroon-800 hover:bg-maroon-700 border border-maroon-600 text-white font-heading text-xs tracking-widest uppercase py-3 rounded-lg transition-colors">
            <Share2 size={14} /> Share Link
          </button>
          <Link to="/member/profile"
            className="flex-1 flex items-center justify-center gap-2 bg-maroon-800 hover:bg-maroon-700 border border-maroon-600 text-white font-heading text-xs tracking-widest uppercase py-3 rounded-lg transition-colors">
            Edit Profile
          </Link>
        </div>

        {/* Add to home screen hint */}
        <div className="mt-4 text-center">
          <p className="text-maroon-600 text-xs">Tip: Add this page to your home screen for quick access at checkout</p>
        </div>
      </div>
    </div>
  )
}
