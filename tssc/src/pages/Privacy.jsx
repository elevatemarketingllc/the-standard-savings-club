import { Link } from 'react-router-dom'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-maroon-900 text-white py-12 text-center">
        <Link to="/" className="font-heading text-xs tracking-widest uppercase text-maroon-300 hover:text-white transition-colors mb-3 block">← The Standard Savings Club</Link>
        <h1 className="font-heading text-4xl uppercase font-bold">Privacy Policy</h1>
        <p className="text-maroon-300 text-sm mt-2">Last updated: April 2026</p>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white border border-gray-200 shadow-sm p-8 sm:p-12">
          <h2 className="font-heading text-xl uppercase text-maroon-900 mb-4">Information We Collect</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">When you join, we collect your name, email address, phone number, and payment information (processed securely by Stripe — we never store your card details). We also collect information you provide in the forum and profile settings.</p>

          <h2 className="font-heading text-xl uppercase text-maroon-900 mb-4">How We Use Your Information</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-2">We use your information to:</p>
          <ul className="text-gray-600 text-sm leading-relaxed mb-6 list-disc pl-5 space-y-1">
            <li>Provide and manage your membership</li>
            <li>Process billing through Stripe</li>
            <li>Send you Zoom links and membership updates via email</li>
            <li>Generate and manage your membership ID and QR code</li>
            <li>Allow partner businesses to verify your active membership</li>
          </ul>

          <h2 className="font-heading text-xl uppercase text-maroon-900 mb-4">What We Share</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">We do not sell your personal information. When a business scans your membership QR code, they see your name, member ID, and active status only. Payment processing is handled by Stripe under their privacy policy.</p>

          <h2 className="font-heading text-xl uppercase text-maroon-900 mb-4">Data Storage</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">Your data is stored securely via Supabase (hosted on AWS infrastructure). We retain your data for as long as your account is active. Upon cancellation and account deletion, your data is removed within 30 days.</p>

          <h2 className="font-heading text-xl uppercase text-maroon-900 mb-4">Your Rights</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">You may request access to, correction of, or deletion of your personal data at any time by emailing us. You may also update your profile information directly in your account settings.</p>

          <h2 className="font-heading text-xl uppercase text-maroon-900 mb-4">Cookies</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">We use session cookies for authentication only. We do not use advertising cookies or third-party tracking.</p>

          <h2 className="font-heading text-xl uppercase text-maroon-900 mb-4">Contact</h2>
          <p className="text-gray-600 text-sm leading-relaxed">Privacy questions? Email us at <a href="mailto:Join@thestandardsavingsclub.com" className="text-maroon-700 hover:underline">Join@thestandardsavingsclub.com</a></p>
        </div>
      </div>
    </div>
  )
}
