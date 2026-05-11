import { Link } from 'react-router-dom'
import { Store, Users, TrendingUp, CheckCircle, Star, ChevronRight, ArrowRight } from 'lucide-react'

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
  'Business portal — edit your listing anytime',
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
                <Link to="/business-join"
                  className="inline-flex items-center justify-center gap-2 bg-white text-maroon-900 hover:bg-gray-100 font-heading text-sm font-semibold tracking-widest uppercase px-8 py-4 transition-colors">
                  Partner With Us <ArrowRight size={16} />
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

      {/* ── INTRO OFFER BANNER ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-maroon-900 text-white p-8 sm:p-12 relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-maroon-800 rounded-full translate-x-32 -translate-y-32 pointer-events-none" />
            <div className="relative">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 bg-maroon-700 border border-maroon-600 px-3 py-1.5">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-heading text-xs tracking-widest uppercase text-yellow-300">Limited Intro Offer</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="font-heading text-4xl sm:text-5xl uppercase font-bold mb-4 leading-tight">
                    Try It for<br /><span className="text-maroon-400">$33/Month</span>
                  </h2>
                  <p className="text-maroon-200 text-lg leading-relaxed mb-2">
                    Your first 3 months as a partner are just <strong className="text-white">$33/month</strong> — the same price a regular member pays to access your deal.
                  </p>
                  <p className="text-maroon-300 text-sm mb-8">
                    After 3 months it moves to $333/month. That's it — cancel anytime, no contracts.
                  </p>
                  <Link to="/business-join"
                    className="inline-flex items-center gap-2 bg-white text-maroon-900 hover:bg-gray-100 font-heading text-sm font-semibold tracking-widest uppercase px-8 py-4 transition-colors">
                    See Partner Pricing <ArrowRight size={16} />
                  </Link>
                </div>

                {/* Pricing breakdown */}
                <div className="space-y-3">
                  <div className="bg-maroon-800 border border-maroon-600 p-5 flex items-center justify-between">
                    <div>
                      <p className="font-heading text-sm uppercase text-white">Months 1–3</p>
                      <p className="text-maroon-400 text-xs mt-0.5">Introductory rate</p>
                    </div>
                    <div className="text-right">
                      <p className="font-heading text-3xl font-bold text-white">$33</p>
                      <p className="text-maroon-400 text-xs">/ month</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <ChevronRight size={16} className="text-maroon-600 rotate-90" />
                  </div>
                  <div className="bg-maroon-800 border border-maroon-700 p-5 flex items-center justify-between">
                    <div>
                      <p className="font-heading text-sm uppercase text-white">Month 4+</p>
                      <p className="text-maroon-400 text-xs mt-0.5">Standard partner rate</p>
                    </div>
                    <div className="text-right">
                      <p className="font-heading text-3xl font-bold text-maroon-300">$333</p>
                      <p className="text-maroon-400 text-xs">/ month</p>
                    </div>
                  </div>
                  <p className="text-maroon-500 text-xs text-center pt-1">Handled automatically through Stripe · Cancel anytime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What's Included + How It Works */}
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
                  { n: '01', t: 'Choose Your Plan', d: 'Start at $33/month for your first 3 months — same as a member. No risk, no long-term commitment.' },
                  { n: '02', t: 'Pay via Stripe', d: 'Secure checkout. Stripe handles the billing and auto-transitions you to $333/month after month 3.' },
                  { n: '03', t: 'Create Your Account', d: 'After payment, set up your login. Ben links your account to your business page within 24 hours.' },
                  { n: '04', t: 'Go Live', d: 'Log in to your portal, upload your logo, add your deal, and start reaching members the same day.' },
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
              <p className="font-heading text-xs tracking-widest uppercase text-maroon-300 mb-1">Ready to Partner?</p>
              <p className="text-maroon-200 text-sm mb-5">Start for $33/month — same as your customers pay for membership.</p>
              <Link to="/business-join"
                className="inline-flex items-center justify-center gap-2 bg-white text-maroon-900 hover:bg-gray-100 font-heading text-xs tracking-widest uppercase px-8 py-3 transition-colors">
                Get Started for $33 →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
