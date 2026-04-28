import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, MapPin, Check } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Opens default mail client with pre-filled message as fallback
    const mailto = `mailto:Join@thestandardsavingsclub.com?subject=${encodeURIComponent(form.subject || 'Contact from website')}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
    window.location.href = mailto
    setTimeout(() => { setSubmitted(true); setLoading(false) }, 500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-maroon-900 text-white py-12 text-center">
        <Link to="/" className="font-heading text-xs tracking-widest uppercase text-maroon-300 hover:text-white transition-colors mb-3 block">← The Standard Savings Club</Link>
        <h1 className="font-heading text-4xl uppercase font-bold">Contact Us</h1>
        <p className="text-maroon-200 text-sm mt-2">Boise, Idaho · Treasure Valley</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Contact info */}
          <div className="space-y-6">
            <div>
              <h2 className="font-heading text-lg uppercase text-maroon-900 mb-4">Get In Touch</h2>
              <p className="text-gray-600 text-sm leading-relaxed">Have a question about membership, a business partnership opportunity, or just want to say hi? We'd love to hear from you.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-maroon-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail size={14} className="text-maroon-700" />
                </div>
                <div>
                  <div className="font-heading text-xs tracking-widest uppercase text-gray-500 mb-0.5">Email</div>
                  <a href="mailto:Join@thestandardsavingsclub.com" className="text-maroon-700 hover:text-maroon-900 text-sm transition-colors">
                    Join@thestandardsavingsclub.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-maroon-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-maroon-700 font-bold text-xs">IG</span>
                </div>
                <div>
                  <div className="font-heading text-xs tracking-widest uppercase text-gray-500 mb-0.5">Instagram</div>
                  <a href="https://instagram.com/thestandard.id" target="_blank" rel="noreferrer" className="text-maroon-700 hover:text-maroon-900 text-sm transition-colors">
                    @thestandard.id
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-maroon-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={14} className="text-maroon-700" />
                </div>
                <div>
                  <div className="font-heading text-xs tracking-widest uppercase text-gray-500 mb-0.5">Location</div>
                  <p className="text-gray-600 text-sm">Boise, Idaho<br />Treasure Valley</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 space-y-2">
              <p className="font-heading text-xs tracking-widest uppercase text-gray-500">Quick Links</p>
              <div className="space-y-1">
                <Link to="/join" className="block text-sm text-maroon-700 hover:text-maroon-900 transition-colors">Become a Member →</Link>
                <Link to="/for-businesses" className="block text-sm text-maroon-700 hover:text-maroon-900 transition-colors">Partner Your Business →</Link>
                <Link to="/businesses" className="block text-sm text-maroon-700 hover:text-maroon-900 transition-colors">View Partner Directory →</Link>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-white border border-gray-200 shadow-sm p-10 text-center">
                <div className="w-14 h-14 bg-maroon-700 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Check size={24} color="white" strokeWidth={2.5} />
                </div>
                <h3 className="font-heading text-2xl uppercase text-maroon-900 mb-2">Message Sent!</h3>
                <p className="text-gray-500 text-sm">Your email client should have opened. If not, email us directly at Join@thestandardsavingsclub.com</p>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 shadow-sm p-8">
                <h2 className="font-heading text-lg uppercase text-maroon-900 mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Name</label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your name"
                        className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
                    </div>
                    <div>
                      <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Email</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@email.com"
                        className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Subject</label>
                    <select name="subject" value={form.subject} onChange={handleChange} required
                      className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm bg-white">
                      <option value="">Select a subject...</option>
                      <option value="Membership Question">Membership Question</option>
                      <option value="Business Partnership">Business Partnership</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Billing Question">Billing Question</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="How can we help?"
                      className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm resize-none" />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full bg-maroon-700 hover:bg-maroon-800 disabled:opacity-60 text-white font-heading font-semibold tracking-widest uppercase py-4 transition-colors">
                    {loading ? 'Opening Email...' : 'Send Message'}
                  </button>
                  <p className="text-xs text-gray-400 text-center">This will open your email client. Alternatively email us directly.</p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
