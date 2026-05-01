import { Link } from 'react-router-dom'
import { Store, Users, TrendingUp, CheckCircle } from 'lucide-react'

const perks = [
  { icon: Users, title: 'Direct Access to Members', desc: 'Promote your offer to local members who are already looking to support businesses like yours. No ads, no algorithms — just word of mouth.' },
  { icon: TrendingUp, title: 'Word-of-Mouth Marketing', desc: 'Get in front of a growing community of Boise locals who actively share deals with friends and family. Your best customers become your best promoters.' },
  { icon: Store, title: 'Weekly Zoom Exposure', desc: 'Be featured on our weekly live Zoom calls and introduce your business directly to engaged members who show up to learn and support.' },
]

const included = [
  'Your own business profile page with logo, photos & deal',
  'Listed in the member discount directory',
  'Featured on weekly live Zoom calls',
  'Word-of-mouth referrals from active members',
  'Membership card QR code verification at your counter',
  'New partners added and promoted weekly',
]

export default function ForBusinesses() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-maroon-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="font-heading text-xs tracking-widest uppercase text-maroon-300 hover:text-white transition-colors mb-6 block">← The Standard Savings Club</Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-heading text-xs tracking-widest uppercase text-maroon-300 mb-3">For Business Owners</p>
              <h1 className="font-heading text-5xl sm:text-6xl uppercase font-bold leading-tight mb-6">
                Own a<br /><span className="text-maroon-400">Business?</span>
              </h1>
              <p className="text-maroon-200 text-lg leading-relaxed mb-8">
                Partner with The Standard Savings Club and put your business in front of members who are actively looking to support local — every single day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/business-register"
                  className="inline-flex items-center justify-center bg-white text-maroon-900 hover:bg-gray-100 font-heading text-sm font-semibold tracking-widest uppercase px-8 py-4 transition-colors">
                  Partner With Us
                </Link>
                <a href="mailto:Join@thestandardsavingsclub.com"
                  className="inline-flex items-center justify-center border-2 border-maroon-500 text-white hover:bg-maroon-800 font-heading text-sm font-semibold tracking-widest uppercase px-8 py-4 transition-colors">
                  Email Us
                </a>
              </div>
              <p className="text-maroon-400 text-sm mt-4">Already a partner? <Link to="/business-login" className="text-maroon-300 hover:text-white underline transition-colors">Access your portal →</Link></p>
            </div>

            <div className="space-y-4">
              {perks.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-maroon-800 border border-maroon-700 p-5 flex gap-4 items-start">
                  <div className="w-10 h-10 bg-maroon-700 rounded-full flex-shrink-0 flex items-center justify-center">
                    <Icon size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base uppercase text-white mb-1">{title}</h3>
                    <p className="text-maroon-300 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* What's Included */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-heading text-3xl uppercase text-maroon-900 mb-2">What's Included</h2>
            <p className="text-gray-500 text-sm mb-8">Everything you need to reach and retain Standard members.</p>
            <div className="space-y-3">
              {included.map(item => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-maroon-700 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 shadow-sm p-8">
              <p className="font-heading text-xs tracking-widest uppercase text-maroon-700 mb-3">How It Works</p>
              <div className="space-y-5">
                {[
                  { n: '01', t: 'Reach Out', d: 'Email us or stop by Uncle Ben\'s Haircuts to speak with Ben directly.' },
                  { n: '02', t: 'Get Listed', d: 'We set up your business profile and link your account to the portal.' },
                  { n: '03', t: 'Go Live', d: 'Log in to your business portal, fill in your deal, upload photos, and go live.' },
                  { n: '04', t: 'Members Find You', d: 'Active members browse the directory and use your deal every day.' },
                ].map(({ n, t, d }) => (
                  <div key={n} className="flex gap-4 items-start">
                    <span className="font-heading text-3xl font-bold text-maroon-100 flex-shrink-0 leading-none">{n}</span>
                    <div>
                      <p className="font-heading text-sm uppercase text-maroon-900 mb-0.5">{t}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-maroon-900 text-white p-6 text-center">
              <p className="font-heading text-xs tracking-widest uppercase text-maroon-300 mb-2">Ready to Partner?</p>
              <p className="text-maroon-200 text-sm mb-5">Join a growing network of Treasure Valley businesses reaching local members every day.</p>
              <Link to="/business-register"
                className="inline-flex items-center justify-center bg-white text-maroon-900 hover:bg-gray-100 font-heading text-xs tracking-widest uppercase px-8 py-3 transition-colors">
                Get Started →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
