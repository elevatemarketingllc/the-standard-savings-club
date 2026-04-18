import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react'

export default function Verify() {
  const { id } = useParams()
  const [status, setStatus] = useState('loading') // loading | valid | invalid
  const [member, setMember] = useState(null)

  useEffect(() => { verifyMember() }, [id])

  const verifyMember = async () => {
    if (!id) { setStatus('invalid'); return }
    const { data } = await supabase
      .from('profiles')
      .select('first_name, last_name, avatar, avatar_type, membership_id, created_at')
      .eq('membership_id', id.toUpperCase())
      .single()

    if (data) {
      setMember(data)
      setStatus('valid')
    } else {
      setStatus('invalid')
    }
  }

  if (status === 'loading') return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <RefreshCw size={32} className="animate-spin text-white opacity-30" />
    </div>
  )

  const joinDate = member?.created_at ? new Date(member.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      style={{ background: status === 'valid' ? '#0a1f0a' : '#1f0a0a' }}>

      {status === 'valid' ? (
        <div className="w-full max-w-sm text-center">
          {/* Big green check */}
          <div className="mb-8">
            <div className="w-28 h-28 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-green-500">
              <CheckCircle size={60} className="text-green-400" strokeWidth={1.5} />
            </div>
            <div className="font-heading text-3xl uppercase font-bold text-green-400 mb-1">Verified Member</div>
            <div className="text-green-600 text-sm font-heading tracking-widest uppercase">The Standard Savings Club</div>
          </div>

          {/* Member info */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                {member.avatar_type === 'image' && member.avatar
                  ? <img src={member.avatar} alt="" className="w-full h-full object-cover rounded-full" />
                  : <span className="text-3xl">{member.avatar || '😊'}</span>
                }
              </div>
              <div className="text-left">
                <div className="font-heading text-xl uppercase text-white font-bold">
                  {member.first_name} {member.last_name}
                </div>
                <div className="text-white/40 text-xs font-heading tracking-widest uppercase mt-0.5">
                  {member.membership_id}
                </div>
              </div>
            </div>
            <div className="flex justify-between text-xs border-t border-white/10 pt-4">
              <div>
                <div className="text-white/40 font-heading tracking-widest uppercase mb-1">Status</div>
                <div className="text-green-400 font-heading uppercase font-bold">Active</div>
              </div>
              <div className="text-right">
                <div className="text-white/40 font-heading tracking-widest uppercase mb-1">Member Since</div>
                <div className="text-white font-heading uppercase">{joinDate}</div>
              </div>
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-3 mb-6">
            <p className="text-green-400 text-sm font-semibold">✓ This member is eligible for Standard Savings Club discounts</p>
          </div>

          <p className="text-white/20 text-xs">Verified by The Standard Savings Club · Boise, Idaho</p>
        </div>
      ) : (
        <div className="w-full max-w-sm text-center">
          <div className="mb-8">
            <div className="w-28 h-28 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-red-500">
              <XCircle size={60} className="text-red-400" strokeWidth={1.5} />
            </div>
            <div className="font-heading text-3xl uppercase font-bold text-red-400 mb-1">Not Verified</div>
            <div className="text-red-600 text-sm font-heading tracking-widest uppercase">Invalid or Expired Membership</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
            <p className="text-white/60 text-sm leading-relaxed">
              This membership ID could not be verified. The member may not have an active subscription, or the QR code may be invalid.
            </p>
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-6">
            <p className="text-red-400 text-sm font-semibold">✗ Do not apply Standard Savings Club discount</p>
          </div>

          <Link to="/" className="text-white/30 text-xs hover:text-white/50 transition-colors">
            thestandardsavingsclub.com
          </Link>
        </div>
      )}
    </div>
  )
}
