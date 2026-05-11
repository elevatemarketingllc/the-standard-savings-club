import { Link } from 'react-router-dom'
import WaveDivider from '../ui/WaveDivider'
import { Store, Users, TrendingUp, ArrowRight } from 'lucide-react'

const perks = [
  { icon: Users, title: 'Real Relationships', desc: 'Reach members who are already looking to support local. No ads, no algorithms — just real community word-of-mouth.' },
  { icon: TrendingUp, title: 'Active Promotion', desc: 'We promote your business through social media, email, spotlights, owner interviews, and weekly live Zoom calls — not just a listing.' },
  { icon: Store, title: 'Your Story, Front & Center', desc: 'We want members to know who you are and why you do what you do. The story behind the business matters here.' },
]

export default function ForBusinesses() {
  return (
    <section className="relative bg-gray-50 pb-28 pt-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label">For Business Owners</div>
            <h2 className="font-heading text-4xl sm:text-5xl uppercase text-maroon-900 mt-2 mb-4">
              Own a<br /><span className="text-maroon-700">Business?</span>
            </h2>
            <div className="w-16 h-1 bg-maroon-700 mb-8" />
            <p className="text-gray-600 leading-relaxed mb-4">
              Most marketing companies try to sell businesses ads, clicks, and promises. We're trying to do something different.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              We're looking for local businesses that want to <strong className="text-maroon-900">grow with the community</strong> — not just advertise to it. If that sounds like something you'd like to be part of, we'd love to connect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/for-businesses"
                className="inline-flex items-center justify-center gap-2 bg-maroon-700 hover:bg-maroon-800 text-white font-heading text-sm font-semibold tracking-widest uppercase px-8 py-4 transition-colors group">
                Learn More <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/business-join"
                className="inline-flex items-center justify-center border-2 border-maroon-700 text-maroon-700 hover:bg-maroon-700 hover:text-white font-heading text-sm font-semibold tracking-widest uppercase px-8 py-4 transition-colors">
                Partner With Us
              </Link>
            </div>
            <p className="text-gray-400 text-xs mt-4">Intro offer: $33/month for your first 3 months, then $333/month</p>
          </div>

          <div className="space-y-6">
            {perks.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-gray-100 shadow-sm p-6 flex gap-5 items-start group hover:border-maroon-200 transition-colors">
                <div className="w-12 h-12 bg-maroon-700 rounded-full flex-shrink-0 flex items-center justify-center">
                  <Icon size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-heading text-lg uppercase text-maroon-900 mb-1">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}

            <div className="bg-maroon-900 text-white p-6">
              <p className="font-heading text-sm tracking-widest uppercase text-maroon-300 mb-1">Our Goal Is Simple</p>
              <p className="text-maroon-200 text-sm">Bring the power of word-of-mouth marketing back to local business.</p>
              <Link to="/our-mission" className="inline-flex items-center gap-1 text-maroon-400 hover:text-white text-xs font-heading tracking-widest uppercase mt-3 transition-colors">
                Read Our Mission <ArrowRight size={11} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <p className="text-gray-500 text-sm">Already a partner? <Link to="/business-login" className="text-maroon-700 hover:underline font-semibold">Access your business portal →</Link></p>
      </div>

      <WaveDivider fill="#4a2526" variant="peaks" height={80} />
    </section>
  )
}
