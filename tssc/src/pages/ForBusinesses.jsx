import { Link } from 'react-router-dom'
import { Store, Users, TrendingUp, CheckCircle, Star, ChevronRight, ArrowRight, Megaphone, Mail, Video, Handshake, Globe, Heart } from 'lucide-react'

const promotions = [
  { icon: Globe, label: 'Social Media Exposure', desc: 'Featured posts across our platforms introducing your business to the community.' },
  { icon: Mail, label: 'Email & Text Marketing', desc: 'Direct messages to members highlighting your deal and your story.' },
  { icon: Star, label: 'Business Spotlights', desc: 'Dedicated features that go beyond the discount — your brand, your people, your why.' },
  { icon: Video, label: 'Owner Interviews', desc: 'We tell the story behind the business, not just the offer.' },
  { icon: Handshake, label: 'Community Partnerships', desc: 'Connections with other local businesses inside the club for collabs and cross-promotion.' },
  { icon: Users, label: 'Networking & Events', desc: 'Local events and meetups that put your name in the room with real customers.' },
]

const received = [
  'Featured placement inside the club',
  'Promotion across our platforms',
  'Direct exposure to local members',
  'Opportunities for collaborations and events',
  'Customer lead generation',
  'Recurring local visibility',
  'A chance to build long-term customer relationships',
]

export default function ForBusinesses() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── HERO ── */}
      <div className="bg-maroon-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="font-heading text-xs tracking-widest uppercase text-maroon-300 hover:text-white transition-colors mb-8 block">← The Standard Savings Club</Link>
          <div className="max-w-3xl">
            <p className="font-heading text-xs tracking-widest uppercase text-maroon-400 mb-4">For Business Owners</p>
            <h1 className="font-heading text-5xl sm:text-6xl uppercase font-bold leading-tight mb-6">
              This Isn't<br /><span className="text-maroon-400">Another Ad.</span>
            </h1>
            <p className="text-maroon-200 text-xl leading-relaxed mb-10 max-w-2xl">
              Most marketing companies try to sell businesses ads, clicks, and promises. We're trying to do something different.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/business-join"
                className="inline-flex items-center justify-center gap-2 bg-white text-maroon-900 hover:bg-gray-100 font-heading text-sm font-semibold tracking-widest uppercase px-8 py-4 transition-colors">
                Partner With Us <ArrowRight size={16} />
              </Link>
              <a href="mailto:Join@thestandardsavingsclub.com"
                className="inline-flex items-center justify-center border-2 border-maroon-500 text-white hover:bg-maroon-800 font-heading text-sm font-semibold tracking-widest uppercase px-8 py-4 transition-colors">
                Email Us
              </a>
            </div>
            <p className="text-maroon-500 text-sm mt-5">Already a partner? <Link to="/business-login" className="text-maroon-300 hover:text-white underline transition-colors">Access your portal →</Link></p>
          </div>
        </div>
      </div>

      {/* ── MANIFESTO ── */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-heading text-xs tracking-widest uppercase text-maroon-700 mb-4">Our Mission</p>
              <h2 className="font-heading text-4xl uppercase text-maroon-900 leading-tight mb-6">
                Bring Word-of-Mouth<br />Marketing Back to<br /><span className="text-maroon-600">Local Business.</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  The Standard Savings Club is built around helping local businesses create <strong className="text-maroon-900">real relationships with real customers</strong> — not just become another ad people scroll past.
                </p>
                <p>
                  Customers join and get access to exclusive local deals, discounts, giveaways, events, and perks from businesses around the Treasure Valley. But the real value is deeper than just coupons.
                </p>
                <p>
                  <strong className="text-maroon-900">We want people to know the story behind the business, not just the discount.</strong>
                </p>
              </div>
            </div>

            {/* Pull quote */}
            <div className="bg-maroon-900 text-white p-10">
              <div className="w-10 h-1 bg-maroon-500 mb-6" />
              <blockquote className="font-heading text-2xl sm:text-3xl uppercase leading-tight text-white mb-6">
                "As business owners ourselves, we know how expensive and frustrating traditional advertising can feel."
              </blockquote>
              <p className="text-maroon-300 text-sm leading-relaxed">
                Most businesses are constantly being pitched ads with little relationship or loyalty attached to them. Instead of competing for random internet traffic, we're building a community-driven platform where local businesses help support each other while gaining exposure to real local families and customers.
              </p>
              <div className="mt-8 pt-6 border-t border-maroon-700">
                <p className="font-heading text-xs tracking-widest uppercase text-maroon-400">— Ben Galvan, Founder</p>
                <p className="text-maroon-500 text-xs mt-1">Owner, Uncle Ben's Haircuts · Boise, ID</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-14">
            <p className="font-heading text-xs tracking-widest uppercase text-maroon-700 mb-3">How It Works</p>
            <h2 className="font-heading text-4xl uppercase text-maroon-900 mb-4">Community, Not Clicks</h2>
            <div className="w-12 h-1 bg-maroon-700 mx-auto mb-4" />
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              We actively promote the businesses inside the club — not just list them. Here's how we get your name out there.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotions.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-maroon-50 rounded-full flex items-center justify-center mb-4">
                  <Icon size={18} className="text-maroon-700" />
                </div>
                <h3 className="font-heading text-sm uppercase text-maroon-900 mb-2">{label}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHAT BUSINESSES RECEIVE ── */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-heading text-xs tracking-widest uppercase text-maroon-700 mb-4">What You Receive</p>
              <h2 className="font-heading text-4xl uppercase text-maroon-900 leading-tight mb-8">
                Built to Help You<br />Grow With the<br />Community.
              </h2>
              <div className="space-y-3">
                {received.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-maroon-700 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mt-8 border-t border-gray-100 pt-8">
                We're looking for businesses that want to <strong className="text-maroon-900">grow with the community</strong> — not just advertise to it. If that sounds like something you'd like to be part of, we'd love to connect and show you more.
              </p>
            </div>

            {/* Steps + CTA */}
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 shadow-sm p-8">
                <p className="font-heading text-xs tracking-widest uppercase text-maroon-700 mb-5">Getting Started</p>
                <div className="space-y-5">
                  {[
                    { n: '01', t: 'Get a Code from Ben', d: 'Reach out to Ben directly — he\'ll give you a discount code based on your situation. TSSC1 (1 month) or TSSC3 (3 months) at $33.' },
                    { n: '02', t: 'Pay via Stripe', d: 'Click Partner With Us, enter your code at checkout, and pay securely. Standard rate is $333/month.' },
                    { n: '03', t: 'Create Your Account', d: 'Stripe sends you back here to create your login. Ben links your account to your page within 24 hours.' },
                    { n: '04', t: 'Go Live', d: 'Upload your logo, add your deal, fill in your story — and start reaching members the same day.' },
                  ].map(({ n, t, d }) => (
                    <div key={n} className="flex gap-4 items-start">
                      <span className="font-heading text-3xl font-bold text-maroon-100 flex-shrink-0 leading-none">{n}</span>
                      <div>
                        <p className="font-heading text-sm uppercase text-maroon-900 mb-0.5">{t}</p>
                        <p className="text-gray-500 text-sm leading-relaxed">{d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing callout */}
              <div className="bg-maroon-900 text-white p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Star size={13} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-heading text-xs tracking-widest uppercase text-yellow-300">Partner Pricing</span>
                </div>
                <div className="flex items-end gap-2 mb-1">
                  <span className="font-heading text-5xl font-bold">$333</span>
                  <span className="font-heading text-lg text-maroon-300 uppercase pb-1">/ month</span>
                </div>
                <p className="text-maroon-300 text-sm mb-1">Standard partner rate · cancel anytime</p>
                <div className="flex items-center gap-2 mb-5">
                  <ChevronRight size={13} className="text-maroon-500" />
                  <p className="text-maroon-400 text-sm">Have a code from Ben? <strong className="text-maroon-200">Drops to $33/mo</strong> for your intro period</p>
                </div>
                <Link to="/business-join"
                  className="flex items-center justify-center gap-2 w-full bg-white text-maroon-900 hover:bg-gray-100 font-heading text-xs font-bold tracking-widest uppercase py-4 transition-colors">
                  Partner With Us <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="bg-maroon-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <Heart size={32} className="text-maroon-500 mx-auto mb-6" />
          <h2 className="font-heading text-4xl sm:text-5xl uppercase font-bold mb-4 leading-tight">
            This Is<br /><span className="text-maroon-400">Different.</span>
          </h2>
          <p className="text-maroon-200 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            We're not here to sell you another ad campaign. We're here to build something real — a community where local businesses and local customers actually know each other.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/business-join"
              className="inline-flex items-center gap-2 bg-white text-maroon-900 hover:bg-gray-100 font-heading text-sm font-bold tracking-widest uppercase px-10 py-5 transition-colors">
              Partner With Us <ArrowRight size={16} />
            </Link>
            <a href="mailto:Join@thestandardsavingsclub.com"
              className="inline-flex items-center justify-center border-2 border-maroon-600 text-maroon-200 hover:text-white hover:border-maroon-400 font-heading text-sm tracking-widest uppercase px-10 py-5 transition-colors">
              Let's Talk First
            </a>
          </div>
        </div>
      </div>

    </div>
  )
}
