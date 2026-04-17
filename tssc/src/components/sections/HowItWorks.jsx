import { Link } from 'react-router-dom'

const steps = [
  { num: '01', title: 'Join for $33/Month', desc: 'Sign up online in minutes. Cancel anytime, no contracts, no commitments.' },
  { num: '02', title: 'Get Instant Access', desc: 'Your member account unlocks all current partner discounts and the weekly Zoom schedule immediately.' },
  { num: '03', title: 'Save at Local Businesses', desc: 'Show your membership at partner locations to redeem exclusive discounts. New deals added every week.' },
  { num: '04', title: 'Meet the Owners', desc: 'Join weekly live Zoom calls with real local business owners. Ask questions, hear stories, build connections.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-maroon-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="font-heading text-xs tracking-widest uppercase text-accent-200 mb-2">Simple Process</div>
          <h2 className="font-heading text-4xl sm:text-5xl uppercase">How It Works</h2>
          <div className="w-16 h-1 bg-accent-300 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
          {steps.map(({ num, title, desc }) => (
            <div key={num} className="relative">
              <div className="font-heading text-7xl font-bold text-accent-300 opacity-40 leading-none mb-4">{num}</div>
              <h3 className="font-heading text-lg uppercase text-accent-200 mb-2">{title}</h3>
              <p className="text-maroon-200 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/join"
            className="inline-flex items-center gap-2 bg-accent-300 hover:bg-accent-400 text-white font-heading text-sm font-semibold tracking-widest uppercase px-10 py-4 transition-colors">
            Start Saving Today
          </Link>
          <p className="text-maroon-400 text-xs mt-3">$33/month · Cancel anytime</p>
        </div>
      </div>
    </section>
  )
}
