import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import {
  Check, RefreshCw, Upload, Globe, Phone, MapPin, Tag,
  Image, Save, LogOut, ChevronRight, Clock, ExternalLink, X,
  Calendar, Plus, Trash2
} from 'lucide-react'

const SECTIONS = ['overview', 'deal', 'links', 'hours', 'photos', 'events']

const CATEGORIES = [
  'Automotive', 'Barbershop / Grooming', 'Chiropractor / Wellness',
  'Cleaning Services', 'Construction / Contractors', 'Dentist / Dental',
  'Entertainment', 'Family Activities', 'Financial Services',
  'Food & Drink', 'Health & Beauty', 'Home Services',
  'Law / Legal', 'Marketing & Advertising', 'Medical / Healthcare',
  'Nightlife / Bars', 'Pest Control', 'Pet Services',
  'Real Estate', 'Restaurant', 'Retail / Shopping',
  'Sports & Fitness', 'Sports Training', 'Tech & IT',
  'Trades / Labor', 'Other',
]

const InputRow = ({ icon: Icon, label, hint, children }) => (
  <div className="flex items-start gap-4">
    <div className="w-9 h-9 bg-maroon-50 rounded-full flex items-center justify-center flex-shrink-0 mt-5">
      <Icon size={15} className="text-maroon-700" />
    </div>
    <div className="flex-1">
      <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  </div>
)

export default function BusinessPortal() {
  const { user, signOut } = useAuth()
  const [business, setBusiness] = useState(null)
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(null)
  const [activeSection, setActiveSection] = useState('overview')
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [uploadingCover, setUploadingCover] = useState(false)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [events, setEvents] = useState([])
  const [eventForm, setEventForm] = useState({ title: '', description: '', event_date: '', start_time: '', end_time: '', location: '', address: '', event_url: '', is_free: true, price: '', category: '' })
  const [savingEvent, setSavingEvent] = useState(false)
  const [showEventForm, setShowEventForm] = useState(false)
  const logoRef = useRef()
  const coverRef = useRef()
  const photoRef = useRef()

  useEffect(() => { loadBusiness() }, [user])
  useEffect(() => { if (business?.id) loadEvents() }, [business?.id])

  const loadEvents = async () => {
    const { data } = await supabase.from('business_events').select('*').eq('business_id', business.id).order('event_date', { ascending: true })
    setEvents(data || [])
  }

  const handleSaveEvent = async () => {
    if (!eventForm.title || !eventForm.event_date) return
    setSavingEvent(true)
    const { error } = await supabase.from('business_events').insert({ ...eventForm, business_id: business.id })
    if (!error) {
      setEventForm({ title: '', description: '', event_date: '', start_time: '', end_time: '', location: '', address: '', event_url: '', is_free: true, price: '', category: '' })
      setShowEventForm(false)
      await loadEvents()
    }
    setSavingEvent(false)
  }

  const handleDeleteEvent = async (id) => {
    await supabase.from('business_events').delete().eq('id', id)
    await loadEvents()
  }

  const loadBusiness = async () => {
    if (!user) return
    const { data: bu } = await supabase
      .from('business_users')
      .select('business_id, businesses(*)')
      .eq('user_id', user.id)
      .single()
    if (bu?.businesses) {
      setBusiness(bu.businesses)
      setForm(bu.businesses)
    } else {
      setBusiness(null)
    }
    setLoading(false)
  }

  const handleSave = async () => {
    if (!business?.id) return
    setSaving(true)
    setError(null)
    const { error } = await supabase.from('businesses').update({
      tagline: form.tagline,
      description: form.description,
      about: form.about,
      category: form.category,
      deal: form.deal,
      deal_details: form.deal_details,
      booking_url: form.booking_url,
      website: form.website,
      phone: form.phone,
      address: form.address,
      hours: form.hours,
      instagram: form.instagram,
      facebook: form.facebook,
      twitter: form.twitter,
      tiktok: form.tiktok,
      youtube: form.youtube,
      updated_at: new Date().toISOString()}).eq('id', business.id)
    if (error) setError(error.message)
    else { setSaved(true); setTimeout(() => setSaved(false), 3000) }
    setSaving(false)
  }

  const uploadImage = async (file, path) => {
    const ext = file.name.split('.').pop()
    const fileName = `${path}/${business.id}-${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('business-images').upload(fileName, file, { upsert: true })
    if (error) throw error
    const { data } = supabase.storage.from('business-images').getPublicUrl(fileName)
    return data.publicUrl
  }

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0]; if (!file) return
    setUploadingLogo(true)
    try {
      const url = await uploadImage(file, 'logos')
      await supabase.from('businesses').update({ logo_url: url }).eq('id', business.id)
      setForm(f => ({ ...f, logo_url: url }))
      setBusiness(b => ({ ...b, logo_url: url }))
    } catch (err) { setError(err.message) }
    setUploadingLogo(false)
  }

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0]; if (!file) return
    setUploadingCover(true)
    try {
      const url = await uploadImage(file, 'covers')
      await supabase.from('businesses').update({ cover_url: url }).eq('id', business.id)
      setForm(f => ({ ...f, cover_url: url }))
      setBusiness(b => ({ ...b, cover_url: url }))
    } catch (err) { setError(err.message) }
    setUploadingCover(false)
  }

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0]; if (!file) return
    setUploadingPhoto(true)
    try {
      const url = await uploadImage(file, 'photos')
      const newPhotos = [...(form.photos || []), url]
      await supabase.from('businesses').update({ photos: newPhotos }).eq('id', business.id)
      setForm(f => ({ ...f, photos: newPhotos }))
    } catch (err) { setError(err.message) }
    setUploadingPhoto(false)
  }

  const handleRemovePhoto = async (url) => {
    const newPhotos = (form.photos || []).filter(p => p !== url)
    await supabase.from('businesses').update({ photos: newPhotos }).eq('id', business.id)
    setForm(f => ({ ...f, photos: newPhotos }))
  }

  const field = (key) => ({
    value: form[key] || '',
    onChange: e => setForm(f => ({ ...f, [key]: e.target.value }))
  })

  if (loading) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <RefreshCw size={24} className="animate-spin text-maroon-700" />
    </div>
  )

  if (!business) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 shadow-sm p-8 max-w-md w-full text-center">
        <div className="font-heading text-2xl uppercase text-maroon-900 mb-3">No Business Found</div>
        <p className="text-gray-500 text-sm mb-6">Your account isn't linked to a partner business. Contact The Standard Savings Club to get set up.</p>
        <a href="mailto:Join@thestandardsavingsclub.com" className="inline-flex items-center gap-2 bg-maroon-700 hover:bg-maroon-800 text-white font-heading text-xs tracking-widest uppercase px-5 py-3 transition-colors">
          Contact Us
        </a>
      </div>
    </div>
  )

  const textInput = (key, placeholder) => (
    <input type="text" {...field(key)} placeholder={placeholder}
      className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
  )

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-maroon-900 text-white">
        {form.cover_url && (
          <div className="relative h-32 overflow-hidden">
            <img src={form.cover_url} alt="Cover" className="w-full h-full object-cover opacity-30" />
          </div>
        )}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
              {form.logo_url
                ? <img src={form.logo_url} alt="Logo" className="w-full h-full object-contain p-1" />
                : <span className="font-heading text-xl text-maroon-900">{business.name.charAt(0)}</span>
              }
            </div>
            <div>
              <p className="text-maroon-300 text-xs font-heading tracking-widest uppercase">Business Portal</p>
              <h1 className="font-heading text-xl uppercase font-bold">{business.name}</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href={`/businesses/${business.slug}`} target="_blank" rel="noreferrer"
              className="text-maroon-300 hover:text-white text-xs font-heading tracking-widest uppercase flex items-center gap-1 transition-colors">
              View Live Page <ExternalLink size={11} />
            </a>
            <button onClick={signOut} className="text-maroon-400 hover:text-white transition-colors" title="Sign out">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-maroon-800 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto">
          {SECTIONS.map(s => (
            <button key={s} onClick={() => setActiveSection(s)}
              className={`px-5 py-3 font-heading text-xs tracking-widest uppercase transition-colors whitespace-nowrap ${activeSection === s ? 'bg-gray-100 text-maroon-900' : 'text-maroon-300 hover:text-white'}`}>
              {s === 'links' ? 'Social & Links' : s === 'hours' ? 'Hours & Booking' : s === 'events' ? 'Events' : s}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-6 flex items-center justify-between">
          {error}
          <button onClick={() => setError(null)}><X size={14} /></button>
        </div>}

        {/* ── OVERVIEW ── */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            {/* Images */}
            <div className="bg-white border border-gray-200 shadow-sm p-6">
              <h2 className="font-heading text-lg uppercase text-maroon-900 mb-5">Images</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-6">
                {/* Logo */}
                <div>
                  <p className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-3">Business Logo</p>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-maroon-50 border border-maroon-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                      {form.logo_url
                        ? <img src={form.logo_url} alt="Logo" className="w-full h-full object-contain p-1" />
                        : <span className="font-heading text-2xl text-maroon-700">{business.name.charAt(0)}</span>
                      }
                    </div>
                    <div>
                      <button onClick={() => logoRef.current?.click()} disabled={uploadingLogo}
                        className="flex items-center gap-2 border border-gray-300 hover:border-maroon-400 text-gray-600 hover:text-maroon-700 text-xs font-heading tracking-widest uppercase px-4 py-2 transition-colors">
                        {uploadingLogo ? <RefreshCw size={12} className="animate-spin" /> : <Upload size={12} />}
                        {uploadingLogo ? 'Uploading...' : 'Upload Logo'}
                      </button>
                      <p className="text-xs text-gray-400 mt-1.5">Square, 400×400px recommended</p>
                      <input ref={logoRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                    </div>
                  </div>
                </div>
                {/* Cover */}
                <div>
                  <p className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-3">Cover / Banner Photo</p>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-20 bg-maroon-50 border border-maroon-100 rounded-lg overflow-hidden flex-shrink-0">
                      {form.cover_url
                        ? <img src={form.cover_url} alt="Cover" className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-maroon-200"><Image size={20} /></div>
                      }
                    </div>
                    <div>
                      <button onClick={() => coverRef.current?.click()} disabled={uploadingCover}
                        className="flex items-center gap-2 border border-gray-300 hover:border-maroon-400 text-gray-600 hover:text-maroon-700 text-xs font-heading tracking-widest uppercase px-4 py-2 transition-colors">
                        {uploadingCover ? <RefreshCw size={12} className="animate-spin" /> : <Upload size={12} />}
                        {uploadingCover ? 'Uploading...' : 'Upload Cover'}
                      </button>
                      <p className="text-xs text-gray-400 mt-1.5">1200×400px landscape</p>
                      <input ref={coverRef} type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Info */}
            <div className="bg-white border border-gray-200 shadow-sm p-6">
              <h2 className="font-heading text-lg uppercase text-maroon-900 mb-5">Business Info</h2>
              <div className="space-y-4">
                <div>
                  <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Business Category</label>
                  <select value={form.category || ''} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm bg-white">
                    <option value="">Select a category...</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <p className="text-xs text-gray-400 mt-1">Shows on your profile and helps members find you in the directory</p>
                </div>
                <div>
                  <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Tagline</label>
                  <input type="text" {...field('tagline')} placeholder="Short, punchy line shown under your business name"
                    className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
                </div>
                <div>
                  <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Short Description</label>
                  <input type="text" {...field('description')} placeholder="One sentence shown on directory cards"
                    className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
                  <p className="text-xs text-gray-400 mt-1">Shown on the partner directory listing card</p>
                </div>
                <div>
                  <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">About Your Business</label>
                  <textarea {...field('about')} placeholder="Tell members your full story — who you are, what makes you different, your history, your team..." rows={6}
                    className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm resize-none" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── DEAL ── */}
        {activeSection === 'deal' && (
          <div className="bg-white border border-gray-200 shadow-sm p-6">
            <h2 className="font-heading text-lg uppercase text-maroon-900 mb-2">Member Offer</h2>
            <p className="text-gray-500 text-sm mb-6">The exclusive deal you're giving Standard Savings Club members. Keep it clear and compelling.</p>
            <div className="space-y-4">
              <div>
                <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Offer Headline <span className="text-red-500">*</span></label>
                <input type="text" {...field('deal')} placeholder="e.g. $10 off every haircut · 20% off services · Free consultation"
                  className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
                <p className="text-xs text-gray-400 mt-1">This shows on your card in the directory and on your profile page</p>
              </div>
              <div>
                <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">How to Redeem</label>
                <textarea {...field('deal_details')} placeholder="Explain exactly how members use this deal — what to say, any code, how to book, any exclusions..." rows={5}
                  className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm resize-none" />
              </div>
              <div>
                <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Booking / Order Link</label>
                <input type="text" {...field('booking_url')} placeholder="https://book.yourbusiness.com (optional direct CTA link)"
                  className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
                <p className="text-xs text-gray-400 mt-1">Shows as a "Book Now" or "Order Online" button on your profile</p>
              </div>

              {/* Live Preview */}
              <div className="bg-maroon-50 border border-maroon-100 p-5 mt-2">
                <p className="font-heading text-xs uppercase text-maroon-600 mb-3">Live Preview</p>
                <div className="bg-maroon-900 text-white p-5 rounded">
                  <p className="font-heading text-xs tracking-widest uppercase text-maroon-300 mb-2">Member Exclusive</p>
                  <div className="flex items-start gap-3">
                    <Tag size={16} className="text-maroon-300 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-heading text-lg uppercase font-bold">{form.deal || 'Your offer headline'}</div>
                      <p className="text-maroon-200 text-sm mt-1">{form.deal_details || 'How to redeem instructions'}</p>
                    </div>
                  </div>
                  {form.booking_url && (
                    <div className="mt-4 inline-flex items-center gap-2 bg-white text-maroon-900 font-heading text-xs tracking-widest uppercase px-4 py-2">
                      <ExternalLink size={11} /> Book / Order Now
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── SOCIAL & LINKS ── */}
        {activeSection === 'links' && (
          <div className="bg-white border border-gray-200 shadow-sm p-6">
            <h2 className="font-heading text-lg uppercase text-maroon-900 mb-5">Social & Contact Links</h2>
            <div className="space-y-4">
              <InputRow icon={Globe} label="Website URL" hint="Full URL including https://">
                {textInput('website', 'https://yourbusiness.com')}
              </InputRow>
              <InputRow icon={Phone} label="Phone Number">
                {textInput('phone', '(208) 555-0100')}
              </InputRow>
              <InputRow icon={MapPin} label="Address">
                {textInput('address', '123 Main St, Boise, ID 83702')}
              </InputRow>

              <div className="border-t border-gray-100 pt-4">
                <p className="font-heading text-xs tracking-widest uppercase text-gray-400 mb-4">Social Media</p>
                <div className="space-y-4">
                  <InputRow icon={() => <span className="text-sm">📸</span>} label="Instagram" hint="Username without @">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">@</span>
                      <input type="text" {...field('instagram')} placeholder="yourbusiness"
                        className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none pl-8 pr-4 py-3 text-sm" />
                    </div>
                  </InputRow>
                  <InputRow icon={() => <span className="text-sm">📘</span>} label="Facebook" hint="Full URL or page name">
                    {textInput('facebook', 'https://facebook.com/yourbusiness')}
                  </InputRow>
                  <InputRow icon={() => <span className="text-sm">𝕏</span>} label="X / Twitter" hint="Username without @">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">@</span>
                      <input type="text" {...field('twitter')} placeholder="yourbusiness"
                        className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none pl-8 pr-4 py-3 text-sm" />
                    </div>
                  </InputRow>
                  <InputRow icon={() => <span className="text-sm">📱</span>} label="TikTok" hint="Username without @">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">@</span>
                      <input type="text" {...field('tiktok')} placeholder="yourbusiness"
                        className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none pl-8 pr-4 py-3 text-sm" />
                    </div>
                  </InputRow>
                  <InputRow icon={() => <span className="text-sm">▶️</span>} label="YouTube Channel URL">
                    {textInput('youtube', 'https://youtube.com/@yourbusiness')}
                  </InputRow>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── HOURS & BOOKING ── */}
        {activeSection === 'hours' && (
          <div className="bg-white border border-gray-200 shadow-sm p-6">
            <h2 className="font-heading text-lg uppercase text-maroon-900 mb-2">Hours & Booking</h2>
            <p className="text-gray-500 text-sm mb-6">Let members know when you're open and how to book or visit.</p>
            <div className="space-y-4">
              <div>
                <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Business Hours</label>
                <textarea {...field('hours')}
                  placeholder={'Mon–Fri: 9am–6pm\nSat: 10am–4pm\nSun: Closed'}
                  rows={7}
                  className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm resize-none font-mono" />
                <p className="text-xs text-gray-400 mt-1">Enter each day or range on its own line. Displays exactly as written.</p>
              </div>
              <div>
                <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Booking / Scheduling Link</label>
                <input type="text" {...field('booking_url')} placeholder="https://calendly.com/you or https://yourbooking.com"
                  className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
                <p className="text-xs text-gray-400 mt-1">Calendly, Square, Vagaro, OpenTable, etc. Shows as a button on your profile.</p>
              </div>
            </div>
          </div>
        )}

        {/* ── PHOTOS ── */}
        {activeSection === 'photos' && (
          <div className="bg-white border border-gray-200 shadow-sm p-6">
            <h2 className="font-heading text-lg uppercase text-maroon-900 mb-2">Photo Gallery</h2>
            <p className="text-gray-500 text-sm mb-6">Add photos of your business, products, team, or space. Shows as a gallery on your profile page.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {(form.photos || []).map((url, i) => (
                <div key={i} className="relative group aspect-square rounded overflow-hidden border border-gray-200">
                  <img src={url} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                  <button onClick={() => handleRemovePhoto(url)}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 text-white">
                    <X size={20} />
                    <span className="text-xs font-heading uppercase tracking-wide">Remove</span>
                  </button>
                </div>
              ))}
              {(form.photos || []).length < 10 && (
                <button onClick={() => photoRef.current?.click()} disabled={uploadingPhoto}
                  className="aspect-square border-2 border-dashed border-gray-300 hover:border-maroon-400 rounded flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-maroon-600 transition-colors">
                  {uploadingPhoto
                    ? <RefreshCw size={20} className="animate-spin" />
                    : <><Upload size={20} /><span className="text-xs font-heading uppercase tracking-wide">Add Photo</span></>
                  }
                </button>
              )}
              <input ref={photoRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </div>
            <p className="text-xs text-gray-400">{(form.photos || []).length}/10 photos · JPG or PNG recommended</p>
          </div>
        )}

        {/* ── EVENTS ── */}
        {activeSection === 'events' && (
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-heading text-lg uppercase text-maroon-900">Events & Promotions</h2>
                  <p className="text-gray-500 text-sm mt-1">Add events, specials, or promotions that show up on the public Events calendar.</p>
                </div>
                <button onClick={() => setShowEventForm(v => !v)}
                  className="flex items-center gap-2 bg-maroon-700 hover:bg-maroon-800 text-white font-heading text-xs tracking-widest uppercase px-4 py-2 transition-colors">
                  <Plus size={13} /> Add Event
                </button>
              </div>

              {/* New event form */}
              {showEventForm && (
                <div className="bg-gray-50 border border-gray-200 p-5 mb-6 space-y-4">
                  <h3 className="font-heading text-sm uppercase text-maroon-900 mb-3">New Event</h3>
                  <div>
                    <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Event Title <span className="text-red-500">*</span></label>
                    <input type="text" value={eventForm.title} onChange={e => setEventForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Grand Opening, Happy Hour Special, Free Class Night"
                      className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Date <span className="text-red-500">*</span></label>
                      <input type="date" value={eventForm.event_date} onChange={e => setEventForm(f => ({ ...f, event_date: e.target.value }))}
                        className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
                    </div>
                    <div>
                      <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Start Time</label>
                      <input type="time" value={eventForm.start_time} onChange={e => setEventForm(f => ({ ...f, start_time: e.target.value }))}
                        className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
                    </div>
                    <div>
                      <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">End Time</label>
                      <input type="time" value={eventForm.end_time} onChange={e => setEventForm(f => ({ ...f, end_time: e.target.value }))}
                        className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Description</label>
                    <textarea value={eventForm.description} onChange={e => setEventForm(f => ({ ...f, description: e.target.value }))} rows={3} placeholder="Tell members what this event is about..."
                      className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm resize-none" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Location Name</label>
                      <input type="text" value={eventForm.location} onChange={e => setEventForm(f => ({ ...f, location: e.target.value }))} placeholder="e.g. Our Main Location, Boise Downtown"
                        className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
                    </div>
                    <div>
                      <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Address</label>
                      <input type="text" value={eventForm.address} onChange={e => setEventForm(f => ({ ...f, address: e.target.value }))} placeholder="123 Main St, Boise, ID"
                        className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Event Link (optional)</label>
                      <input type="text" value={eventForm.event_url} onChange={e => setEventForm(f => ({ ...f, event_url: e.target.value }))} placeholder="https://..."
                        className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
                    </div>
                    <div>
                      <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Admission</label>
                      <div className="flex gap-3 items-center mt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" checked={eventForm.is_free} onChange={() => setEventForm(f => ({ ...f, is_free: true, price: '' }))} className="accent-maroon-700" />
                          <span className="text-sm text-gray-700">Free</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" checked={!eventForm.is_free} onChange={() => setEventForm(f => ({ ...f, is_free: false }))} className="accent-maroon-700" />
                          <span className="text-sm text-gray-700">Paid</span>
                        </label>
                        {!eventForm.is_free && (
                          <input type="text" value={eventForm.price} onChange={e => setEventForm(f => ({ ...f, price: e.target.value }))} placeholder="e.g. $15"
                            className="border border-gray-300 focus:border-maroon-700 focus:outline-none px-3 py-2 text-sm w-24" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <button onClick={handleSaveEvent} disabled={savingEvent || !eventForm.title || !eventForm.event_date}
                      className="flex items-center gap-2 bg-maroon-700 hover:bg-maroon-800 disabled:opacity-50 text-white font-heading text-xs tracking-widest uppercase px-6 py-3 transition-colors">
                      {savingEvent ? <><RefreshCw size={12} className="animate-spin" /> Saving...</> : <><Check size={12} /> Save Event</>}
                    </button>
                    <button onClick={() => setShowEventForm(false)} className="text-gray-500 hover:text-gray-700 text-sm transition-colors">Cancel</button>
                  </div>
                </div>
              )}

              {/* Existing events list */}
              {events.length === 0 && !showEventForm ? (
                <div className="text-center py-12 text-gray-400">
                  <Calendar size={32} className="mx-auto mb-3 opacity-30" />
                  <p className="font-heading text-sm uppercase tracking-widest">No events yet</p>
                  <p className="text-xs mt-1">Add your first event to appear on the community calendar</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {events.map(ev => (
                    <div key={ev.id} className="flex items-start gap-4 p-4 border border-gray-100 bg-gray-50 rounded">
                      <div className="bg-maroon-700 text-white text-center px-3 py-2 rounded flex-shrink-0 min-w-[52px]">
                        <div className="font-heading text-xs uppercase">{new Date(ev.event_date + 'T12:00:00').toLocaleString('en-US', { month: 'short' })}</div>
                        <div className="font-heading text-2xl font-bold leading-none">{new Date(ev.event_date + 'T12:00:00').getDate()}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-heading text-sm uppercase text-maroon-900">{ev.title}</div>
                        {(ev.start_time || ev.location) && (
                          <div className="text-xs text-gray-500 mt-0.5">
                            {ev.start_time && <span>{ev.start_time.slice(0,5)}{ev.end_time ? ` – ${ev.end_time.slice(0,5)}` : ''}</span>}
                            {ev.start_time && ev.location && <span> · </span>}
                            {ev.location && <span>{ev.location}</span>}
                          </div>
                        )}
                        {ev.description && <p className="text-xs text-gray-500 mt-1 truncate">{ev.description}</p>}
                      </div>
                      <button onClick={() => handleDeleteEvent(ev.id)} className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Save */}
        {activeSection !== 'photos' && activeSection !== 'events' && (
          <div className="mt-6 flex items-center gap-4">
            <button onClick={handleSave} disabled={saving || !business?.id}
              className="flex items-center gap-2 bg-maroon-700 hover:bg-maroon-800 disabled:opacity-50 text-white font-heading text-xs tracking-widest uppercase px-8 py-4 transition-colors">
              {saving ? <><RefreshCw size={13} className="animate-spin" /> Saving...</>
                : saved ? <><Check size={13} /> Saved!</>
                : <><Save size={13} /> Save Changes</>}
            </button>
            {saved && <p className="text-green-600 text-sm font-medium">Changes are live on your profile.</p>}
          </div>
        )}
      </div>
    </div>
  )
}
