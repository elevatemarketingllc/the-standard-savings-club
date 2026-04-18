import { useState } from 'react'
import { Check, ArrowRight, Shield, ExternalLink } from 'lucide-react'

// Replace this with the Payment Link URL from Stripe dashboard
// Billing → Payment links → Create link → select the $33/mo price
const PAYMENT_LINK = import.meta.env.VITE_STRIPE_PAYMENT_LINK || '#'

const included = [
  '$10 off every haircut at Uncle Ben\'s Haircuts — automatic at checkout',
  'Exclusive discounts at local restaurants, gyms, auto, home services & more',
  'Save 15–75% at hand-picked Treasure Valley businesses',
  'Weekly live Zoom calls with real local business owners',
  'Access to member video library of all past Zoom sessions',
  'Member-only community forum',
  'New partner deals added every week',
  'Cancel anytime — no contracts, no commitments',
]

export default function Join() {
  const handleJoin = () => {
    window.location.href = PAYMENT_LINK
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-maroon-900 text-white py-14 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="font-heading text-xs tracking-widest uppercase text-gray-300 mb-3">Join Today</div>
          <h1 className="font-heading text-5xl sm:text-6xl uppercase font-bold mb-4">
            The Standard<br />Savings Club
          </h1>
          <p className="text-maroon-200 text-lg">Save at and support local Idaho businesses every day.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          <div>
            <h2 className="font-heading text-3xl uppercase text-maroon-900 mb-2">Everything Included</h2>
            <div className="w-12 h-1 bg-maroon-700 mb-8" />
            <div className="space-y-4">
              {included.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-maroon-700 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                    <Check size={11} color="white" strokeWidth={3} />
                  </div>
                  <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-maroon-50 border border-maroon-100 p-5">
              <p className="font-heading text-sm uppercase text-maroon-700 mb-1">Boise, Idaho</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Built for Treasure Valley locals who want to save money while supporting the businesses that make our community great.
              </p>
            </div>
          </div>

          <div>
            <div className="bg-white border border-gray-200 shadow-sm p-8">
              <div className="text-center mb-8">
                <div className="font-heading text-xs tracking-widest uppercase text-maroon-700 mb-2">Membership</div>
                <div className="font-heading text-7xl font-bold text-maroon-900 leading-none">$33</div>
                <div className="font-heading text-lg tracking-widest uppercase text-gray-400 mt-1">/ Month</div>
                <div className="text-gray-500 text-sm mt-2">Cancel anytime · No contracts</div>
              </div>

              <button
                onClick={handleJoin}
                className="w-full bg-maroon-700 hover:bg-maroon-800 text-white font-heading font-semibold tracking-widest uppercase py-4 transition-colors flex items-center justify-center gap-2 group"
              >
                Join The Club
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-gray-400 text-xs">
                <Shield size={12} />
                <span>Secure checkout powered by Stripe</span>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
                {[
                  "You'll create your member account after checkout",
                  "Instant access to all member benefits",
                  "Cancel anytime from your member dashboard",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                    <Check size={12} className="text-maroon-700 flex-shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-heading mb-3">Partner Businesses</p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Uncle Ben's Haircuts", 'Cowboy Burger', 'Opal Teeth Whitening', 'Boise Bug Bombers', 'Erick Butler Training', 'Elevate Marketing'].map(name => (
                  <span key={name} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 font-heading tracking-wide">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
