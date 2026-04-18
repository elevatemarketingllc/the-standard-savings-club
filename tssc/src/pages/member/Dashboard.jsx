import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Video, MessageSquare, Tag, User, ExternalLink, X, Calendar, ChevronRight } from 'lucide-react'

const STRIPE_PORTAL_URL = 'https://billing.stripe.com/p/login/28E28s1GVfxU2M4b0N3wQ00'

const upcomingZooms = [
  { date: 'Every Wednesday', time: '7:00 PM MST', title: 'Weekly Business Owner Zoom', desc: 'Live Q&A with local Treasure Valley business owners.' },
  { date: 'Every Saturday', time: '10:00 AM MST', title: 'Member Spotlight Session', desc: 'Featured member stories and community updates.' },
]

const partnerDeals = [
  { name: "Uncle Ben's Haircuts", slug: 'uncle-bens-haircuts', deal: '$10 off every haircut', category: 'Grooming', note: 'Automatic at checkout — just show your membership' },
  { name: 'Cowboy Burger', slug: 'cowboy-burger', deal: 'Members-only discount', category: 'Restaurant', note: 'Show your member card at the counter' },
  { name: 'Opal Teeth Whitening Studio', slug: 'opal-teeth-whitening', deal: 'Exclusive member rate', category: 'Health & Beauty', note: 'Mention The Standard Savings Club when booking' },
  { name: 'Boise Bug Bombers Pest Control', slug: 'boise-bug-bombers', deal: 'Members-only pricing', category: 'Home Services', note: 'Reference your membership when calling' },
  { name: 'Erick Butler Elite Basketball Training', slug: 'erick-butler-training', deal: 'Member discount on sessions', category: 'Sports Training', note: 'Mention your membership when signing up' },
  { name: 'Elevate Marketing', slug: 'elevate-marketing', deal: 'Member consultation rate', category: 'Marketing', note: 'Contact directly and mention The Standard' },
]

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const [searchParams] = useSearchParams()
  const [showWelcome, setShowWelcome] = useState(searchParams.get('welcome') === 'true')
  const firstName = user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'Member'

  return (
    <div className="min-h-screen bg-gray-50">
      {showWelcome && (
        <div className="bg-maroon-700 text-white px-4 py-4 relative">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <span className="font-heading text-sm tracking-widest uppercase">🎉 Welcome to The Standard Savings Club!</span>
              <p className="text-maroon-200 text-xs mt-0.5">Your membership is active. Start saving at local businesses today.</p>
            </div>
            <button onClick={() => setShowWelcome(false)} className="text-maroon-200 hover:text-white ml-4 flex-shrink-0">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      <div className="bg-maroon-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-heading text-xs tracking-widest uppercase text-maroon-300 mb-1">Member Portal</p>
              <h1 className="font-heading text-3xl sm:text-4xl uppercase font-bold">Welcome, {firstName}</h1>
              <p className="text-maroon-300 text-sm mt-1">Active Member · The Standard Savings Club</p>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <a href={STRIPE_PORTAL_URL} target="_blank" rel="noreferrer"
                className="border border-maroon-600 hover:border-white text-maroon-300 hover:text-white text-xs font-heading tracking-widest uppercase px-4 py-2 transition-colors flex items-center gap-1.5">
                Manage Billing <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Quick access */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Tag, label: 'My Discounts', desc: 'View partner deals', href: '#discounts', color: 'bg-maroon-700' },
            { icon: Video, label: 'Video Library', desc: 'Watch past sessions', href: '/member/videos', color: 'bg-maroon-800' },
            { icon: MessageSquare, label: 'Forum', desc: 'Connect with members', href: '/member/forum', color: 'bg-maroon-700' },
            { icon: User, label: 'My Profile', desc: 'Update your info', href: '/member/profile', color: 'bg-maroon-800' },
          ].map(({ icon: Icon, label, desc, href, color }) => (
            <Link key={label} to={href}
              className="bg-white border border-gray-200 shadow-sm p-5 hover:border-maroon-200 hover:shadow-md transition-all duration-200 group">
              <div className={`w-10 h-10 ${color} group-hover:bg-maroon-600 rounded-full flex items-center justify-center mb-3 transition-colors`}>
                <Icon size={18} className="text-white" />
              </div>
              <div className="font-heading text-sm uppercase text-maroon-900">{label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <Calendar size={16} className="text-maroon-700" />
                <h2 className="font-heading text-lg uppercase text-maroon-900">Upcoming Zooms</h2>
              </div>
              <div className="space-y-4">
                {upcomingZooms.map((zoom, i) => (
                  <div key={i} className="border-l-2 border-maroon-700 pl-4">
                    <div className="font-heading text-xs tracking-widest uppercase text-maroon-700 mb-0.5">{zoom.date} · {zoom.time}</div>
                    <div className="font-semibold text-sm text-gray-900">{zoom.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{zoom.desc}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400">Zoom link is emailed to members before each session.</p>
              </div>
            </div>

            <div className="mt-4 bg-maroon-900 text-white p-6">
              <p className="font-heading text-xs tracking-widest uppercase text-maroon-300 mb-1">Your Subscription</p>
              <p className="font-heading text-2xl font-bold mb-1">$33 / month</p>
              <p className="text-maroon-300 text-xs mb-4">Active · Renews monthly</p>
              <a href={STRIPE_PORTAL_URL} target="_blank" rel="noreferrer"
                className="flex items-center justify-between w-full bg-maroon-700 hover:bg-maroon-600 px-4 py-3 transition-colors text-sm font-heading tracking-wide uppercase">
                Manage Billing <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Partner Discounts */}
          <div className="lg:col-span-2" id="discounts">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl uppercase text-maroon-900">Your Discounts</h2>
              <div className="flex items-center gap-3">
                <Link to="/businesses" className="text-xs text-maroon-700 font-heading tracking-widest uppercase hover:text-maroon-900 transition-colors">
                  View All Pages →
                </Link>
                <span className="font-heading text-xs tracking-widest uppercase text-maroon-700 bg-maroon-50 border border-maroon-100 px-3 py-1">
                  {partnerDeals.length} Partners
                </span>
              </div>
            </div>
            <div className="space-y-3">
              {partnerDeals.map(({ name, slug, deal, category, note }) => (
                <Link to={`/businesses/${slug}`} key={name}
                  className="bg-white border border-gray-200 shadow-sm p-5 flex items-start gap-4 hover:border-maroon-200 hover:shadow-md transition-all group block">
                  <div className="w-10 h-10 bg-maroon-100 rounded-full flex-shrink-0 flex items-center justify-center">
                    <span className="font-heading text-lg font-bold text-maroon-700">{name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-heading text-sm uppercase text-maroon-900">{name}</div>
                        <div className="text-xs text-maroon-600 font-semibold mt-0.5">{deal}</div>
                      </div>
                      <span className="text-xs text-gray-400 font-heading tracking-wide flex-shrink-0">{category}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <ChevronRight size={11} className="text-gray-400 flex-shrink-0" />
                      <p className="text-xs text-gray-500">{note}</p>
                    </div>
                    <div className="text-xs text-maroon-700 font-heading tracking-wide mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      View Full Deal <ChevronRight size={10} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-4 bg-maroon-50 border border-maroon-100 p-4 text-center">
              <p className="font-heading text-xs tracking-widest uppercase text-maroon-700">New partners added every week</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
