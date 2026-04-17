import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function CallToAction() {
  return (
    <section className="bg-maroon-900 text-white py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="font-heading text-xs tracking-widest uppercase text-accent-200 mb-4">Join Today</div>
        <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl uppercase font-bold leading-none mb-6">
          Start Saving at<br /><span className="text-accent-200">Local Businesses</span><br />Today
        </h2>
        <div className="w-16 h-1 bg-accent-300 mx-auto mb-8" />
        <p className="text-maroon-200 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          Join hundreds of Treasure Valley locals saving money and supporting the businesses that make Boise great.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/join"
            className="inline-flex items-center justify-center gap-2 bg-accent-300 hover:bg-accent-400 text-white font-heading font-semibold tracking-widest uppercase px-10 py-5 text-lg transition-colors group">
            Join for $33/Month
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="mailto:Join@thestandardsavingsclub.com"
            className="inline-flex items-center justify-center gap-2 border-2 border-maroon-500 hover:border-accent-300 hover:text-accent-200 text-white font-heading font-semibold tracking-widest uppercase px-10 py-5 text-lg transition-colors">
            Contact Us
          </a>
        </div>
        <p className="text-maroon-400 text-sm mt-6">$33/month · Cancel anytime · No contracts</p>
        <div className="mt-12 pt-8 border-t border-maroon-700">
          <p className="font-heading text-xs tracking-widest uppercase text-maroon-400 mb-3">Bringing the Power of Word-of-Mouth Marketing Back to Life</p>
          <p className="text-maroon-300 text-sm">thestandardsavingsclub.com · Boise, Idaho</p>
        </div>
      </div>
    </section>
  )
}
