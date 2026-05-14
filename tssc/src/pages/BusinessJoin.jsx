import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { Check, ArrowRight, Store, Users, TrendingUp, Star, ChevronRight } from 'lucide-react'

// ⚠️ Replace with your real business Stripe Payment Link after creating it in Stripe Dashboard
const BUSINESS_STRIPE_LINK = 'https://buy.stripe.com/28EdRagBP1H4cmE2uh3wQ01'

const included = [
  'Your own business profile page with logo, photos & deal',
  'Listed in the member discount directory',
  'Featured on weekly live Zoom calls',
  'Word-of-mouth referrals from active members',
  'Membership card QR code verification at your counter',
  'New partners added and promoted each week',
  'Access to the business portal — edit your listing anytime',
  'Cancel anytime — no long-term contracts',
]

export default function BusinessJoin() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO title="Partner With Us" description="Join The Standard Savings Club as a partner business. Get featured in the member directory and promoted to local Boise customers." path="/business-join" />
      {/* Header */}
      <div className="bg-maroon-900 text-white py-16 text-center">
        <Link to="/for-businesses" className="font-heading text-xs tracking-widest uppercase text-maroon-300 hover:text-white transition-colors mb-4 block">
          ← For Business Owners
        </Link>
        <div className="font-heading text-xs tracking-widest uppercase text-maroon-300 mb-3">Partner Pricing</div>
        <h1 className="font-heading text-5xl sm:text-6xl uppercase font-bold mb-4">
          Partner<br /><span className="text-maroon-400">With Us</span>
        </h1>
        <p className="text-maroon-200 text-lg max-w-xl mx-auto px-4">
          Start for the same price as a regular membership. Your first 3 months are just $33/mo.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Included list */}
          <div>
            <h2 className="font-heading text-2xl uppercase text-maroon-900 mb-6">What You Get</h2>
            <div className="space-y-3 mb-10">
              {included.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-maroon-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={11} color="white" strokeWidth={3} />
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Store, label: 'Partner Spots', value: '10+' },
                { icon: Users, label: 'Members', value: 'Growing' },
                { icon: TrendingUp, label: 'Zoom Calls', value: 'Weekly' },
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
              {/* Intro badge */}
              <div className="inline-flex items-center gap-2 bg-maroon-700 border border-maroon-600 px-3 py-1.5 mb-5">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="font-heading text-xs tracking-widest uppercase text-yellow-300">Partner Pricing</span>
              </div>

              {/* Pricing */}
              <div className="mb-2">
                <span className="font-heading text-7xl font-bold">$333</span>
                <span className="font-heading text-xl text-maroon-300 uppercase"> / mo</span>
              </div>
              <p className="text-maroon-300 text-sm mb-1">Standard partner rate</p>
              <div className="flex items-center gap-2 mb-6">
                <ChevronRight size={14} className="text-maroon-500" />
                <p className="text-maroon-400 text-sm">Have a code from Ben? <strong className="text-maroon-200">Enter it at checkout</strong> to unlock your intro rate</p>
              </div>

              <div className="bg-maroon-800 border border-maroon-600 p-4 mb-6 text-center">
                <p className="text-maroon-300 text-sm leading-relaxed">
                  Have a code from Ben? Enter it at checkout to unlock your intro rate.
                </p>
              </div>

              {/* Step 1 */}
              <div className="mb-4">
                <div className="font-heading text-xs tracking-widest uppercase text-maroon-400 mb-2">Step 1 — Pay Securely via Stripe</div>
                <a
                  href={BUSINESS_STRIPE_LINK}
                  className="flex items-center justify-center gap-3 w-full bg-white text-maroon-900 hover:bg-gray-100 font-heading font-bold tracking-widest uppercase py-4 transition-colors text-base">
                  Start Partnering <ArrowRight size={18} />
                </a>
              </div>

              {/* Step 2 */}
              <div className="bg-maroon-800 border border-maroon-700 p-4">
                <div className="font-heading text-xs tracking-widest uppercase text-maroon-400 mb-2">Step 2 — After Payment</div>
                <p className="text-maroon-300 text-xs leading-relaxed">
                  Stripe redirects you back here to create your business account. Ben will link your portal within 24 hours.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-maroon-700 text-center">
                <p className="text-maroon-500 text-xs">Secured by Stripe · Cancel anytime in your billing portal</p>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-gray-500 text-sm">Already a partner? <Link to="/business-login" className="text-maroon-700 hover:text-maroon-900 font-semibold">Sign In →</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
