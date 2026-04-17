import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-maroon-900 text-white overflow-hidden min-h-[92vh] flex items-center">

      {/* Background texture */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px)' }}
      />

      {/* Maroon gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-maroon-950 via-maroon-900 to-maroon-800" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-maroon-700 border border-maroon-600 px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-accent-300 rounded-full animate-pulse" />
              <span className="font-heading text-xs tracking-widest uppercase text-accent-200">Boise, Idaho</span>
            </div>

            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-none tracking-wide uppercase mb-6">
              Save At &<br />
              <span className="text-accent-200">Support Local</span><br />
              Idaho Businesses<br />
              Every Day.
            </h1>

            <p className="text-maroon-200 text-lg leading-relaxed mb-4 italic font-medium">
              Not Your Standard Coupon Book.<br />
              Built for Real Local Savings and Supporting Our Community.
            </p>

            <div className="flex flex-wrap gap-6 mb-10 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-300 rounded-full flex items-center justify-center text-white font-bold text-sm">$</div>
                <div>
                  <div className="font-heading text-sm tracking-wider uppercase text-accent-200">$10 Off Monthly</div>
                  <div className="text-xs text-maroon-300">at Uncle Ben's Haircuts</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-300 rounded-full flex items-center justify-center text-white font-bold text-sm">%</div>
                <div>
                  <div className="font-heading text-sm tracking-wider uppercase text-accent-200">Save 15–75%</div>
                  <div className="text-xs text-maroon-300">at local businesses</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-300 rounded-full flex items-center justify-center text-white font-bold text-sm">🎙</div>
                <div>
                  <div className="font-heading text-sm tracking-wider uppercase text-accent-200">Weekly Live Zooms</div>
                  <div className="text-xs text-maroon-300">with real business owners</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/join"
                className="inline-flex items-center justify-center gap-2 bg-accent-300 hover:bg-accent-400 text-white font-heading text-sm font-semibold tracking-widest uppercase px-8 py-4 transition-all duration-200 group">
                Join Now — $33/Month
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 border-2 border-maroon-500 hover:border-accent-300 hover:text-accent-200 text-white font-heading text-sm font-semibold tracking-widest uppercase px-8 py-4 transition-all duration-200">
                See How It Works
              </a>
            </div>

            <p className="text-maroon-400 text-xs mt-4 tracking-wide">Cancel anytime · No contracts · New deals added weekly</p>
          </div>

          {/* Right — Card */}
          <div className="hidden lg:block">
            <div className="bg-maroon-800 border border-maroon-600 p-8">
              <div className="text-center mb-8">
                <div className="font-heading text-accent-200 text-xs tracking-widest uppercase mb-2">Membership</div>
                <div className="font-heading text-8xl font-bold text-white leading-none">$33</div>
                <div className="font-heading text-lg tracking-widest uppercase text-maroon-300 mt-1">/ Month</div>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  '$10 off every haircut at Uncle Ben\'s Haircuts',
                  'Exclusive discounts at restaurants, gyms, auto, home services & more',
                  'Weekly live Zoom calls with real local business owners',
                  'New partner deals added every week',
                  'Cancel anytime — no contracts',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-accent-300 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-maroon-100 text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/join"
                className="block w-full text-center bg-accent-300 hover:bg-accent-400 text-white font-heading text-sm font-semibold tracking-widest uppercase py-4 transition-colors">
                Join The Club
              </Link>

              <p className="text-center text-maroon-400 text-xs mt-3">Bringing the power of word-of-mouth marketing back to life</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
