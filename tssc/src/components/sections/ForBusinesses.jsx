import { Link } from 'react-router-dom'
import { Store, Users, TrendingUp } from 'lucide-react'

const perks = [
  { icon: Users, title: 'Direct Access to Members', desc: 'Promote your offer to local members who are already looking to support businesses like yours.' },
  { icon: TrendingUp, title: 'Word-of-Mouth Marketing', desc: 'Get in front of a growing community of Boise locals who actively share deals with friends and family.' },
  { icon: Store, title: 'Weekly Zoom Exposure', desc: 'Be featured on our weekly live Zoom calls and introduce your business directly to engaged members.' },
]

export default function ForBusinesses() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label">For Business Owners</div>
            <h2 className="font-heading text-4xl sm:text-5xl uppercase text-maroon-900 mt-2 mb-4">
              Own a<br /><span className="text-maroon-700">Business?</span>
            </h2>
            <div className="w-16 h-1 bg-maroon-700 mb-8" />
            <p className="text-gray-600 leading-relaxed mb-4">
              Stop by an Uncle Ben's Haircuts location to speak directly with Ben, or send us an email to get your business listed.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Local businesses helping local businesses. Promote your offer to members who want to support you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/business"
                className="inline-flex items-center justify-center bg-maroon-700 hover:bg-maroon-800 text-white font-heading text-sm font-semibold tracking-widest uppercase px-8 py-4 transition-colors">
                Partner With Us
              </Link>
              <a href="mailto:Join@thestandardsavingsclub.com"
                className="inline-flex items-center justify-center border-2 border-maroon-700 text-maroon-700 hover:bg-maroon-700 hover:text-white font-heading text-sm font-semibold tracking-widest uppercase px-8 py-4 transition-colors">
                Email Us
              </a>
            </div>
          </div>

          <div className="space-y-6">
            {perks.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-gray-100 shadow-sm p-6 flex gap-5 items-start group hover:border-maroon-200 transition-colors">
                <div className="w-12 h-12 bg-maroon-700 group-hover:bg-maroon-700 rounded-full flex-shrink-0 flex items-center justify-center transition-colors">
                  <Icon size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-heading text-lg uppercase text-maroon-900 mb-1">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}

            <div className="bg-maroon-700 text-white p-6">
              <p className="font-heading text-sm tracking-widest uppercase text-maroon-200 mb-1">Partners Added Weekly</p>
              <p className="text-maroon-200 text-sm">Join a growing network of Treasure Valley businesses reaching local members every day.</p>
            </div>
          </div>
        </div>
      </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
          <p className="text-gray-500 text-sm">Already a partner? <Link to="/business-login" className="text-maroon-700 hover:underline font-semibold">Access your business portal →</Link></p>
        </div>
      </section>
  )
}
