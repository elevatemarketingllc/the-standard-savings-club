import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { Check, RefreshCw, Upload, Globe, Phone, MapPin, Tag, Image, Save, LogOut, ChevronRight } from "lucide-react"

const FALLBACK_BUSINESSES = {
  'uncle-bens-haircuts': { id: null, slug: 'uncle-bens-haircuts', name: "Uncle Ben's Haircuts", tagline: "Boise's Premier Barbershop", category: 'Grooming', description: '', about: '', deal: '$10 off every haircut', deal_details: "Automatically applied at checkout — just tell your barber you're a Standard member.", website: '', phone: '', address: '', instagram: '', facebook: '', logo_url: '', cover_url: '', photos: [] },
  'cowboy-burger': { id: null, slug: 'cowboy-burger', name: 'Cowboy Burger', tagline: 'Smash Burgers Done Right', category: 'Restaurant', description: '', about: '', deal: 'Members-only discount', deal_details: 'Show your membership at the counter.', website: '', phone: '', address: '', instagram: '', facebook: '', logo_url: '', cover_url: '', photos: [] },
  'opal-teeth-whitening': { id: null, slug: 'opal-teeth-whitening', name: 'Opal Teeth Whitening Studio', tagline: 'Your Brightest Smile Starts Here', category: 'Health & Beauty', description: '', about: '', deal: 'Exclusive member rate', deal_details: 'Mention The Standard Savings Club when booking.', website: '', phone: '', address: '', instagram: '', facebook: '', logo_url: '', cover_url: '', photos: [] },
  'boise-bug-bombers': { id: null, slug: 'boise-bug-bombers', name: 'Boise Bug Bombers Pest Control', tagline: 'Protecting Treasure Valley Homes', category: 'Home Services', description: '', about: '', deal: 'Members-only pricing', deal_details: 'Reference your membership when calling.', website: '', phone: '', address: '', instagram: '', facebook: '', logo_url: '', cover_url: '', photos: [] },
  'erick-butler-training': { id: null, slug: 'erick-butler-training', name: 'Erick Butler Elite Basketball Training', tagline: 'Elevate Your Game', category: 'Sports Training', description: '', about: '', deal: 'Member discount on sessions', deal_details: 'Mention your membership when signing up.', website: '', phone: '', address: '', instagram: '', facebook: '', logo_url: '', cover_url: '', photos: [] },
  'elevate-marketing': { id: null, slug: 'elevate-marketing', name: 'Elevate Marketing LLC', tagline: 'Digital Marketing That Converts', category: 'Marketing', description: '', about: '', deal: 'Member consultation rate', deal_details: 'Mention The Standard Savings Club for your member rate.', website: 'https://elevatemarketingidaho.com', phone: '', address: '', instagram: '', facebook: '', logo_url: '', cover_url: '', photos: [] },
}

const SECTIONS = ['overview', 'deal', 'contact', 'photos']

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
  const logoRef = useRef()
  const coverRef = useRef()
  const photoRef = useRef()

  useEffect(() => {
    loadBusiness()
  }, [user])

  const loadBusiness = async () => {
    if (!user) return
    // Find which business this user manages
    const { data: bu } = await supabase
      .from('business_users')
      .select('business_id, businesses(*)')
      .eq('user_id', user.id)
      .single()

    if (bu?.businesses) {
      setBusiness(bu.businesses)
      setForm(bu.businesses)
    } else {
      // Check if email matches a known business (simple fallback for demo)
      // In production you'd always use business_users table
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
      deal: form.deal,
      deal_details: form.deal_details,
      website: form.website,
      phone: form.phone,
      address: form.address,
      instagram: form.instagram,
      facebook: form.facebook,
      updated_at: new Date().toISOString(),
    }).eq('id', business.id)

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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-maroon-900 text-white py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <p className="text-maroon-300 text-xs font-heading tracking-widest uppercase mb-0.5">Business Portal</p>
            <h1 className="font-heading text-2xl uppercase font-bold">{business.name}</h1>
          </div>
          <div className="flex items-center gap-3">
            <a href={`/businesses/${business.slug}`} target="_blank" rel="noreferrer"
              className="text-maroon-300 hover:text-white text-xs font-heading tracking-widest uppercase flex items-center gap-1 transition-colors">
              View Page <ChevronRight size={12} />
            </a>
            <button onClick={signOut} className="text-maroon-300 hover:text-white transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-maroon-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex">
          {SECTIONS.map(s => (
            <button key={s} onClick={() => setActiveSection(s)}
              className={`px-5 py-3 font-heading text-xs tracking-widest uppercase transition-colors ${activeSection === s ? 'bg-gray-100 text-maroon-900' : 'text-maroon-300 hover:text-white'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-6">{error}</div>}

        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 shadow-sm p-6">
              <h2 className="font-heading text-lg uppercase text-maroon-900 mb-5">Business Identity</h2>

              {/* Logo + Cover */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-2 block">Business Logo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-maroon-50 border border-maroon-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                      {form.logo_url
                        ? <img src={form.logo_url} alt="Logo" className="w-full h-full object-contain p-1" />
                        : <span className="font-heading text-2xl text-maroon-700">{business.name.charAt(0)}</span>
                      }
                    </div>
                    <div>
                      <button onClick={() => logoRef.current?.click()}
                        disabled={uploadingLogo}
                        className="flex items-center gap-2 border border-gray-300 hover:border-maroon-400 text-gray-600 hover:text-maroon-700 text-xs font-heading tracking-widest uppercase px-4 py-2 transition-colors">
                        {uploadingLogo ? <RefreshCw size={12} className="animate-spin" /> : <Upload size={12} />}
                        {uploadingLogo ? 'Uploading...' : 'Upload Logo'}
                      </button>
                      <p className="text-xs text-gray-400 mt-1.5">PNG, JPG. Recommended: square, 400×400px</p>
                      <input ref={logoRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-2 block">Cover Photo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-20 bg-maroon-50 border border-maroon-100 rounded-lg overflow-hidden flex-shrink-0">
                      {form.cover_url
                        ? <img src={form.cover_url} alt="Cover" className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-maroon-200"><Image size={20} /></div>
                      }
                    </div>
                    <div>
                      <button onClick={() => coverRef.current?.click()}
                        disabled={uploadingCover}
                        className="flex items-center gap-2 border border-gray-300 hover:border-maroon-400 text-gray-600 hover:text-maroon-700 text-xs font-heading tracking-widest uppercase px-4 py-2 transition-colors">
                        {uploadingCover ? <RefreshCw size={12} className="animate-spin" /> : <Upload size={12} />}
                        {uploadingCover ? 'Uploading...' : 'Upload Cover'}
                      </button>
                      <p className="text-xs text-gray-400 mt-1.5">Recommended: 1200×400px landscape</p>
                      <input ref={coverRef} type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tagline */}
              <div className="mb-4">
                <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Tagline</label>
                <input type="text" {...field('tagline')} placeholder="Your short business tagline"
                  className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
                <p className="text-xs text-gray-400 mt-1">Shown under your business name on the directory</p>
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Short Description</label>
                <input type="text" {...field('description')} placeholder="One-sentence description of your business"
                  className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
              </div>

              {/* About */}
              <div>
                <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">About Your Business</label>
                <textarea {...field('about')} placeholder="Tell members your story — who you are, what you do, why you love it..." rows={5}
                  className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm resize-none" />
              </div>
            </div>
          </div>
        )}

        {/* Deal Section */}
        {activeSection === 'deal' && (
          <div className="bg-white border border-gray-200 shadow-sm p-6">
            <h2 className="font-heading text-lg uppercase text-maroon-900 mb-2">Member Deal</h2>
            <p className="text-gray-500 text-sm mb-6">This is the exclusive offer you're giving to Standard Savings Club members. Keep it clear and compelling.</p>

            <div className="space-y-4">
              <div>
                <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Deal Headline <span className="text-red-500">*</span></label>
                <input type="text" {...field('deal')} placeholder="e.g. $10 off every haircut, 20% off services, Free consultation"
                  className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
                <p className="text-xs text-gray-400 mt-1">Short, punchy. This shows on your card in the directory.</p>
              </div>

              <div>
                <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">How to Redeem</label>
                <textarea {...field('deal_details')} placeholder="Explain exactly how members redeem this deal — mention code, what to say at checkout, how to book, etc." rows={4}
                  className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm resize-none" />
              </div>

              <div className="bg-maroon-50 border border-maroon-100 p-4">
                <p className="font-heading text-xs uppercase text-maroon-700 mb-1">Preview</p>
                <div className="flex items-start gap-2 mt-2">
                  <Tag size={14} className="text-maroon-700 mt-0.5" />
                  <div>
                    <div className="font-heading text-sm uppercase text-maroon-900">{form.deal || 'Your deal headline'}</div>
                    <p className="text-maroon-700 text-xs mt-0.5">{form.deal_details || 'How to redeem instructions'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Section */}
        {activeSection === 'contact' && (
          <div className="bg-white border border-gray-200 shadow-sm p-6">
            <h2 className="font-heading text-lg uppercase text-maroon-900 mb-5">Contact & Links</h2>
            <div className="space-y-4">
              {[
                { key: 'website', label: 'Website URL', icon: Globe, placeholder: 'https://yourbusiness.com' },
                { key: 'phone', label: 'Phone Number', icon: Phone, placeholder: '(208) 555-0100' },
                { key: 'address', label: 'Address', icon: MapPin, placeholder: '123 Main St, Boise, ID 83702' },
                { key: "instagram", label: "Instagram Username", icon: Globe, placeholder: 'yourbusiness (no @)' },
                { key: "facebook", label: "Facebook Page URL", icon: Globe, placeholder: 'https://facebook.com/yourbusiness' },
              ].map(({ key, label, icon: Icon, placeholder }) => (
                <div key={key} className="flex items-start gap-4">
                  <div className="w-9 h-9 bg-maroon-50 rounded-full flex items-center justify-center flex-shrink-0 mt-5">
                    <Icon size={15} className="text-maroon-700" />
                  </div>
                  <div className="flex-1">
                    <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">{label}</label>
                    <input type="text" {...field(key)} placeholder={placeholder}
                      className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Photos Section */}
        {activeSection === 'photos' && (
          <div className="bg-white border border-gray-200 shadow-sm p-6">
            <h2 className="font-heading text-lg uppercase text-maroon-900 mb-2">Photo Gallery</h2>
            <p className="text-gray-500 text-sm mb-6">Add photos of your business, products, team, or space. These show on your business page.</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {(form.photos || []).map((url, i) => (
                <div key={i} className="relative group aspect-square rounded overflow-hidden border border-gray-200">
                  <img src={url} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                  <button onClick={() => handleRemovePhoto(url)}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-heading uppercase tracking-wide">
                    Remove
                  </button>
                </div>
              ))}

              <button onClick={() => photoRef.current?.click()}
                disabled={uploadingPhoto}
                className="aspect-square border-2 border-dashed border-gray-300 hover:border-maroon-400 rounded flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-maroon-600 transition-colors">
                {uploadingPhoto
                  ? <RefreshCw size={20} className="animate-spin" />
                  : <><Upload size={20} /><span className="text-xs font-heading uppercase tracking-wide">Add Photo</span></>
                }
              </button>
              <input ref={photoRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </div>
            <p className="text-xs text-gray-400">Max 10 photos. JPG or PNG recommended.</p>
          </div>
        )}

        {/* Save button */}
        {activeSection !== 'photos' && (
          <div className="mt-6 flex items-center gap-4">
            <button onClick={handleSave} disabled={saving || !business?.id}
              className="flex items-center gap-2 bg-maroon-700 hover:bg-maroon-800 disabled:opacity-60 text-white font-heading text-xs tracking-widest uppercase px-6 py-3 transition-colors">
              {saving ? <><RefreshCw size={13} className="animate-spin" /> Saving...</>
                : saved ? <><Check size={13} /> Saved!</>
                : <><Save size={13} /> Save Changes</>}
            </button>
            {!business?.id && <p className="text-xs text-gray-400">Database not connected — contact admin to link your account</p>}
          </div>
        )}
      </div>
    </div>
  )
}
