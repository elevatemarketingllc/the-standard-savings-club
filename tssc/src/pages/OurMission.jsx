import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { ArrowRight, Globe, Mail, Star, Video, Handshake, Users, CheckCircle, Heart, TrendingUp } from 'lucide-react'

const promotions = [
  { icon: Globe, label: 'Social Media Exposure' },
  { icon: Mail, label: 'Email & Text Marketing' },
  { icon: Star, label: 'Featured Business Spotlights' },
  { icon: Video, label: 'Owner Interviews & Storytelling' },
  { icon: Handshake, label: 'Community Partnerships' },
  { icon: Users, label: 'Local Networking & Events' },
]

const businessPerks = [
  'Featured placement inside the club',
  'Promotion across our platforms',
  'Direct exposure to local members',
  'Opportunities for collaborations and events',
  'Customer lead generation',
  'Recurring local visibility',
  'A chance to build long-term customer relationships',
]

export default function OurMission() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO title="Our Mission" description="The Standard Savings Club is built around helping local businesses create real relationships with local customers again — bringing word-of-mouth marketing back to Boise." path="/our-mission" />

      {/* ── HERO ── */}
      <div className="bg-maroon-900 text-white py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="font-heading text-xs tracking-widest uppercase text-maroon-300 hover:text-white transition-colors mb-8 block">← The Standard Savings Club</Link>
          <p className="font-heading text-xs tracking-widest uppercase text-maroon-400 mb-4">Our Mission</p>
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl uppercase font-bold leading-tight mb-8">
            This Isn't<br /><span className="text-maroon-400">Another Ad.</span>
          </h1>
          <div className="w-16 h-1 bg-maroon-600 mb-8" />
          <p className="text-maroon-200 text-xl leading-relaxed max-w-2xl">
            Most marketing companies try to sell businesses ads, clicks, and promises. We're trying to do something different.
          </p>
        </div>
      </div>

      {/* ── THE PROBLEM ── */}
      <div className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-heading text-xs tracking-widest uppercase text-maroon-700 mb-4">The Problem</p>
              <h2 className="font-heading text-4xl uppercase text-maroon-900 leading-tight mb-6">
                Ads Without<br />Relationships.
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-base">
                <p>
                  As business owners ourselves, we know how expensive and frustrating traditional advertising can feel. Most businesses are constantly being pitched ads with little relationship or loyalty attached to them.
                </p>
                <p>
                  Instead of competing for random internet traffic, we're building something that's been lost — a community-driven platform where local businesses help support each other while gaining exposure to <strong className="text-maroon-900">real local families and customers.</strong>
                </p>
              </div>
            </div>

            {/* Pull quote */}
            <div className="bg-maroon-900 text-white p-10">
              <div className="w-10 h-1 bg-maroon-500 mb-6" />
              <blockquote className="font-heading text-2xl sm:text-3xl uppercase leading-snug text-white mb-6">
                "We want people to know the story behind the business — not just the discount."
              </blockquote>
              <div className="pt-6 border-t border-maroon-700">
                <p className="font-heading text-xs tracking-widest uppercase text-maroon-400">— Ben Galvan, Founder</p>
                <p className="text-maroon-500 text-xs mt-1">Owner, Uncle Ben's Haircuts · Boise, Idaho</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── THE SOLUTION ── */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-14">
            <p className="font-heading text-xs tracking-widest uppercase text-maroon-700 mb-3">The Solution</p>
            <h2 className="font-heading text-4xl sm:text-5xl uppercase text-maroon-900 mb-4 leading-tight">
              Bring Word-of-Mouth<br />Marketing Back.
            </h2>
            <div className="w-16 h-1 bg-maroon-700 mx-auto mb-6" />
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              The Standard Savings Club is built around helping local businesses create real relationships with local customers again — not just become another ad people scroll past.
            </p>
          </div>

          {/* Two-column split: members / businesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 shadow-sm p-8">
              <div className="w-10 h-10 bg-maroon-50 rounded-full flex items-center justify-center mb-5">
                <Users size={18} className="text-maroon-700" />
              </div>
              <h3 className="font-heading text-xl uppercase text-maroon-900 mb-3">For Members</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Customers join The Standard Savings Club and get access to exclusive local deals, discounts, giveaways, events, and perks from businesses around the Treasure Valley.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                But the real value is deeper than coupons. Members build actual connections with the businesses they support — and the business owners behind them.
              </p>
              <div className="mt-6 pt-5 border-t border-gray-100">
                <Link to="/join" className="inline-flex items-center gap-2 text-maroon-700 hover:text-maroon-900 font-heading text-xs tracking-widest uppercase font-semibold transition-colors">
                  Join for $33/Month <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            <div className="bg-white border border-gray-200 shadow-sm p-8">
              <div className="w-10 h-10 bg-maroon-50 rounded-full flex items-center justify-center mb-5">
                <TrendingUp size={18} className="text-maroon-700" />
              </div>
              <h3 className="font-heading text-xl uppercase text-maroon-900 mb-3">For Businesses</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Partner businesses don't just get a listing — they get a community behind them. We actively promote the businesses inside the club through every channel we have.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                We're looking for businesses that want to grow <em>with</em> the community — not just advertise to it.
              </p>
              <div className="mt-6 pt-5 border-t border-gray-100">
                <Link to="/for-businesses" className="inline-flex items-center gap-2 text-maroon-700 hover:text-maroon-900 font-heading text-xs tracking-widest uppercase font-semibold transition-colors">
                  Learn About Partnering <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── HOW WE PROMOTE ── */}
      <div className="bg-maroon-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <p className="font-heading text-xs tracking-widest uppercase text-maroon-400 mb-3">Active Promotion</p>
            <h2 className="font-heading text-4xl uppercase mb-4 leading-tight">We Don't Just List You.<br />We Promote You.</h2>
            <div className="w-16 h-1 bg-maroon-600 mx-auto" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {promotions.map(({ icon: Icon, label }) => (
              <div key={label} className="bg-maroon-800 border border-maroon-700 p-5 flex items-center gap-3">
                <div className="w-8 h-8 bg-maroon-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon size={15} className="text-maroon-300" />
                </div>
                <span className="font-heading text-xs tracking-wide uppercase text-maroon-200">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHAT BUSINESSES RECEIVE ── */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-heading text-xs tracking-widest uppercase text-maroon-700 mb-4">What Businesses Receive</p>
              <h2 className="font-heading text-4xl uppercase text-maroon-900 leading-tight mb-8">
                More Than a<br />Listing.
              </h2>
              <div className="space-y-3">
                {businessPerks.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle size={17} className="text-maroon-700 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-8">
              <p className="font-heading text-xs tracking-widest uppercase text-maroon-700 mb-5">Our Goal Is Simple</p>
              <p className="font-heading text-2xl uppercase text-maroon-900 leading-snug mb-6">
                Bring the Power of Word-of-Mouth Marketing Back to Local Business.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                If you're a business that wants to build real, lasting relationships with local customers — and not just chase clicks — we'd love to connect and show you more.
              </p>
              <div className="space-y-3">
                <Link to="/business-join"
                  className="flex items-center justify-center gap-2 w-full bg-maroon-700 hover:bg-maroon-800 text-white font-heading text-xs tracking-widest uppercase py-4 transition-colors">
                  Partner With Us <ArrowRight size={13} />
                </Link>
                <a href="mailto:Join@thestandardsavingsclub.com"
                  className="flex items-center justify-center gap-2 w-full border border-gray-300 hover:border-maroon-400 text-gray-600 hover:text-maroon-700 font-heading text-xs tracking-widest uppercase py-4 transition-colors">
                  Let's Talk First
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="bg-maroon-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <Heart size={28} className="text-maroon-600 mx-auto mb-6" />
          <h2 className="font-heading text-4xl sm:text-5xl uppercase font-bold mb-4 leading-tight">
            This Is<br /><span className="text-maroon-400">Different.</span>
          </h2>
          <p className="text-maroon-200 text-lg leading-relaxed max-w-xl mx-auto mb-10">
            Join as a member and save at local businesses you already love. Or partner with us and let the community work for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/join"
              className="inline-flex items-center gap-2 bg-white text-maroon-900 hover:bg-gray-100 font-heading text-sm font-bold tracking-widest uppercase px-10 py-4 transition-colors">
              Join for $33/Month <ArrowRight size={15} />
            </Link>
            <Link to="/for-businesses"
              className="inline-flex items-center justify-center border-2 border-maroon-600 text-maroon-200 hover:text-white hover:border-maroon-400 font-heading text-sm tracking-widest uppercase px-10 py-4 transition-colors">
              Partner With Us
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
