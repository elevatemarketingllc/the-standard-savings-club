import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-maroon-900 text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-heading text-lg tracking-widest uppercase mb-4 text-gold-400">The Standard Savings Club</h3>
            <p className="text-sm text-gray-300 leading-relaxed">Save at and support local Idaho businesses every day. Not your standard coupon book.</p>
          </div>
          <div>
            <h4 className="font-heading tracking-widest uppercase mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:text-gold-400 transition-colors">Home</Link></li>
              <li><Link to="/join" className="hover:text-gold-400 transition-colors">Join — $33/mo</Link></li>
              <li><Link to="/business" className="hover:text-gold-400 transition-colors">Business Partners</Link></li>
              <li><Link to="/login" className="hover:text-gold-400 transition-colors">Member Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading tracking-widest uppercase mb-4 text-sm">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="mailto:Join@thestandardsavingsclub.com" className="hover:text-gold-400 transition-colors">Join@thestandardsavingsclub.com</a></li>
              <li><a href="https://instagram.com/thestandard.id" target="_blank" rel="noreferrer" className="hover:text-gold-400 transition-colors">@thestandard.id</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-maroon-700 pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} The Standard Savings Club. All rights reserved. · Boise, Idaho</p>
        </div>
      </div>
    </footer>
  )
}
