import { Link } from 'react-router-dom'
import WaveDivider from '../ui/WaveDivider'
import { ArrowRight } from 'lucide-react'

export default function MissionSection() {
  return (
    <section className="relative bg-white pb-28 pt-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — the statement */}
          <div>
            <div className="section-label">Our Mission</div>
            <h2 className="font-heading text-4xl sm:text-5xl uppercase text-maroon-900 mt-2 mb-4 leading-tight">
              This Isn't a<br /><span className="text-maroon-700">Coupon Book.</span>
            </h2>
            <div className="w-16 h-1 bg-maroon-700 mb-8" />
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                The Standard Savings Club is built around helping local businesses create <strong className="text-maroon-900">real relationships with real customers</strong> — not just become another ad people scroll past.
              </p>
              <p>
                We actively promote every business inside the club through social media, email, spotlights, owner interviews, and community events. We want people to know the <em>story</em> behind the business, not just the discount.
              </p>
              <p className="font-heading text-base uppercase text-maroon-900">
                Bringing the power of word-of-mouth marketing back to local business.
              </p>
            </div>
            <div className="mt-8">
              <Link to="/our-mission"
                className="inline-flex items-center gap-2 text-maroon-700 hover:text-maroon-900 font-heading text-xs tracking-widest uppercase font-semibold transition-colors group">
                Read Our Full Mission
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right — three pillars */}
          <div className="space-y-0">
            {[
              {
                num: '01',
                title: 'Community Over Clicks',
                body: "Instead of competing for random internet traffic, we're building a platform where local businesses gain exposure to real local families and customers.",
              },
              {
                num: '02',
                title: 'Story Over Discount',
                body: 'Every partner business gets featured — not just listed. Members learn who the owner is, what they stand for, and why they should keep coming back.',
              },
              {
                num: '03',
                title: 'Loyalty Over Ads',
                body: 'We know how frustrating traditional advertising feels. This is different — a community-driven platform where businesses help support each other.',
              },
            ].map(({ num, title, body }, i) => (
              <div key={num} className={`p-6 ${i < 2 ? 'border-b border-gray-100' : ''}`}>
                <div className="flex gap-5 items-start">
                  <span className="font-heading text-4xl font-bold text-maroon-100 flex-shrink-0 leading-none">{num}</span>
                  <div>
                    <h3 className="font-heading text-base uppercase text-maroon-900 mb-2">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <WaveDivider fill="#ffffff" variant="tilt" height={80} />
    </section>
  )
}
