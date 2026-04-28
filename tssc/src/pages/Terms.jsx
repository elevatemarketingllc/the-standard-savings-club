import { Link } from 'react-router-dom'

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-maroon-900 text-white py-12 text-center">
        <Link to="/" className="font-heading text-xs tracking-widest uppercase text-maroon-300 hover:text-white transition-colors mb-3 block">← The Standard Savings Club</Link>
        <h1 className="font-heading text-4xl uppercase font-bold">Terms of Service</h1>
        <p className="text-maroon-300 text-sm mt-2">Last updated: April 2026</p>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border border-gray-200 shadow-sm p-8 sm:p-12 prose prose-gray max-w-none">
          <h2 className="font-heading text-xl uppercase text-maroon-900 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">By joining The Standard Savings Club, you agree to these Terms of Service. If you do not agree, please do not use our services.</p>

          <h2 className="font-heading text-xl uppercase text-maroon-900 mb-4">2. Membership</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">Membership is $33/month and provides access to exclusive discounts at partner businesses, weekly live Zoom sessions with local business owners, a member forum, and a video library of past sessions. Membership is for individual use only and is non-transferable.</p>

          <h2 className="font-heading text-xl uppercase text-maroon-900 mb-4">3. Billing & Cancellation</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">Your membership renews automatically each month via Stripe. You may cancel at any time through your billing portal — there are no cancellation fees and no long-term commitments. Cancellations take effect at the end of the current billing period. No refunds are issued for partial months.</p>

          <h2 className="font-heading text-xl uppercase text-maroon-900 mb-4">4. Partner Discounts</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">Discounts are offered by third-party partner businesses and are subject to change. The Standard Savings Club is not responsible for the products, services, or business practices of any partner business. We do not guarantee discount availability at any time.</p>

          <h2 className="font-heading text-xl uppercase text-maroon-900 mb-4">5. Member Conduct</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">Members agree to use the community forum and Zoom sessions respectfully. We reserve the right to suspend or terminate membership for abusive, harassing, or inappropriate behavior without refund.</p>

          <h2 className="font-heading text-xl uppercase text-maroon-900 mb-4">6. Membership Card & QR Code</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">Your membership QR code is personal and should not be shared. Sharing your QR code to obtain discounts for non-members is grounds for immediate account termination.</p>

          <h2 className="font-heading text-xl uppercase text-maroon-900 mb-4">7. Changes to Service</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">We reserve the right to modify, suspend, or discontinue any part of our service at any time. We will provide reasonable notice of material changes via email.</p>

          <h2 className="font-heading text-xl uppercase text-maroon-900 mb-4">8. Contact</h2>
          <p className="text-gray-600 text-sm leading-relaxed">Questions? Reach us at <a href="mailto:Join@thestandardsavingsclub.com" className="text-maroon-700 hover:underline">Join@thestandardsavingsclub.com</a></p>
        </div>
      </div>
    </div>
  )
}
