import { Link } from 'react-router-dom'
import { Check, ArrowRight, Tag, Video, MessageSquare, Users } from 'lucide-react'

const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/28E28s1GVfxU2M4b0N3wQ00'

const perks = [
  '$10 off every haircut at Uncle Ben\'s Haircuts — automatic at checkout',
  'Exclusive discounts at local restaurants, gyms, auto, home services & more',
  'Save 15–75% at hand-picked Treasure Valley businesses',
  'Weekly live Zoom calls with real local business owners',
  'Access to member video library of past sessions',
  'Member-only community forum',
  'New partner deals added every week',
  'Cancel anytime — no contracts',
]

export default function Join() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-maroon-900 text-white py-16 text-center">
        <Link to="/" className="font-heading text-xs tracking-widest uppercase text-maroon-300 hover:text-white transition-colors mb-4 block">← The Standard Savings Club</Link>
        <div className="font-heading text-xs tracking-widest uppercase text-maroon-300 mb-3">Join Today</div>
        <h1 className="font-heading text-5xl sm:text-6xl uppercase font-bold mb-4">The Standard<br />Savings Club</h1>
        <p className="text-maroon-200 text-lg max-w-xl mx-auto">Save at and support local Idaho businesses every day.</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Perks list */}
          <div>
            <h2 className="font-heading text-2xl uppercase text-maroon-900 mb-6">Everything Included</h2>
            <div className="space-y-3">
              {perks.map((perk, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-maroon-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={11} color="white" strokeWidth={3} />
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{perk}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { icon: Tag, label: 'Partner Discounts', value: '6+' },
                { icon: Video, label: 'Weekly Zooms', value: '2x' },
                { icon: Users, label: 'Community', value: 'Active' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-white border border-gray-200 p-4 text-center shadow-sm">
                  <div className="font-heading text-2xl font-bold text-maroon-900">{value}</div>
                  <div className="text-xs text-gray-500 mt-1 font-heading tracking-wide uppercase">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing card */}
          <div>
            <div className="bg-maroon-900 text-white p-8 shadow-xl">
              <div className="font-heading text-xs tracking-widest uppercase text-maroon-300 mb-2">Membership</div>
              <div className="font-heading text-7xl font-bold mb-1">$33</div>
              <div className="font-heading text-lg text-maroon-300 uppercase mb-2">/ Month</div>
              <p className="text-maroon-400 text-sm mb-8">Cancel anytime · No contracts</p>

              {/* Step 1 - Pay */}
              <div className="mb-4">
                <div className="font-heading text-xs tracking-widest uppercase text-maroon-400 mb-2">Step 1 — Pay Securely via Stripe</div>
                <a
                  href={STRIPE_PAYMENT_LINK}
                  className="flex items-center justify-center gap-3 w-full bg-white text-maroon-900 hover:bg-gray-100 font-heading font-bold tracking-widest uppercase py-4 transition-colors text-lg">
                  Join The Club <ArrowRight size={18} />
                </a>
              </div>

              {/* Step 2 - Create account */}
              <div className="bg-maroon-800 border border-maroon-700 p-4">
                <div className="font-heading text-xs tracking-widest uppercase text-maroon-400 mb-2">Step 2 — After Payment</div>
                <p className="text-maroon-300 text-xs leading-relaxed">
                  Stripe will redirect you back here to create your account. Your membership is active immediately after payment.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-maroon-700 text-center">
                <p className="text-maroon-500 text-xs">Secured by Stripe · Cancel anytime in your billing portal</p>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-gray-500 text-sm">Already a member? <Link to="/login" className="text-maroon-700 hover:text-maroon-900 font-semibold">Sign In →</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
