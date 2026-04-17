import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'

const included = [
  '$10 off every haircut at Uncle Ben\'s Haircuts',
  'Exclusive discounts at local restaurants, gyms, auto & more',
  'Weekly live Zoom calls with local business owners',
  'Access to member video library of past sessions',
  'Member-only community forum',
  'New partner deals added weekly',
  'Cancel anytime — no contracts',
]

export default function Pricing() {
  return (
    <section className="bg-maroon-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="font-heading text-xs tracking-widest uppercase text-maroon-200 mb-2">Membership</div>
          <h2 className="font-heading text-4xl sm:text-5xl uppercase">One Simple Price</h2>
          <div className="w-16 h-1 bg-maroon-700 mx-auto mt-4" />
        </div>

        <div className="max-w-lg mx-auto">
          <div className="bg-maroon-800 border border-maroon-600 p-10">
            <div className="text-center mb-8">
              <div className="font-heading text-8xl font-bold text-white leading-none">$33</div>
              <div className="font-heading text-lg tracking-widest uppercase text-maroon-300 mt-1">/ Month</div>
              <div className="text-maroon-400 text-sm mt-2">Cancel anytime · No contracts</div>
            </div>

            <div className="space-y-4 mb-10">
              {included.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-maroon-700 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                    <Check size={11} color="white" strokeWidth={3} />
                  </div>
                  <span className="text-maroon-100 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            <Link to="/join"
              className="block w-full text-center bg-maroon-700 hover:bg-maroon-800 text-white font-heading text-sm font-semibold tracking-widest uppercase py-4 transition-colors">
              Join The Standard Savings Club
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
