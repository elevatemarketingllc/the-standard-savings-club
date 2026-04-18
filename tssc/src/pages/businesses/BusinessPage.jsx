import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { MapPin, Globe, Phone, Tag, ChevronLeft, ChevronRight, Lock } from "lucide-react"

const FALLBACK_BUSINESSES = {
  'uncle-bens-haircuts': {
    slug: 'uncle-bens-haircuts', name: "Uncle Ben's Haircuts", tagline: "Boise's Premier Barbershop", category: 'Grooming',
    description: "Classic cuts, modern style. Uncle Ben's is the home base of The Standard Savings Club.",
    about: "Uncle Ben's Haircuts has been serving the Boise community with quality cuts and great vibes. Founded by Ben Galvan, the shop is built on community, craft, and making every customer feel like family.",
    deal: '$10 off every haircut', deal_details: "Automatically applied at checkout — just tell your barber you're a Standard member. No code needed.",
    website: 'https://unclebenshaircuts.com', phone: '(208) 555-0101', featured: true,
  },
  'cowboy-burger': {
    slug: 'cowboy-burger', name: 'Cowboy Burger', tagline: 'Smash Burgers Done Right', category: 'Restaurant',
    description: "Boise's best smash burger. Local ingredients, big flavor.",
    about: 'Cowboy Burger brings the best smash burgers in the Treasure Valley. Made fresh to order with locally sourced ingredients.',
    deal: 'Members-only discount', deal_details: 'Show your Standard Savings Club membership at the counter for your exclusive discount.',
  },
  'opal-teeth-whitening': {
    slug: 'opal-teeth-whitening', name: 'Opal Teeth Whitening Studio', tagline: 'Your Brightest Smile Starts Here', category: 'Health & Beauty',
    description: 'Professional teeth whitening treatments in a relaxing studio environment.',
    about: 'Opal Teeth Whitening Studio offers professional-grade whitening treatments in a comfortable, spa-like setting.',
    deal: 'Exclusive member rate', deal_details: 'Mention The Standard Savings Club when booking your appointment.',
  },
  'boise-bug-bombers': {
    slug: 'boise-bug-bombers', name: 'Boise Bug Bombers Pest Control', tagline: 'Protecting Treasure Valley Homes', category: 'Home Services',
    description: 'Local pest control you can trust. Serving Boise and surrounding areas.',
    about: 'Boise Bug Bombers has been protecting Treasure Valley homes and businesses from pests for years. Family owned and operated.',
    deal: 'Members-only pricing', deal_details: 'Reference your Standard Savings Club membership when calling to schedule service.',
  },
  'erick-butler-training': {
    slug: 'erick-butler-training', name: 'Erick Butler Elite Basketball Training', tagline: 'Elevate Your Game', category: 'Sports Training',
    description: 'Elite basketball training for youth and adult athletes in the Treasure Valley.',
    about: 'Erick Butler brings professional-level training to Boise youth and adult athletes. With a focus on fundamentals, athleticism, and mindset.',
    deal: 'Member discount on sessions', deal_details: 'Mention your Standard Savings Club membership when signing up for training sessions.',
  },
  'elevate-marketing': {
    slug: 'elevate-marketing', name: 'Elevate Marketing LLC', tagline: 'Digital Marketing That Converts', category: 'Marketing',
    description: 'Boise-based digital marketing agency helping local businesses grow.',
    about: 'Elevate Marketing LLC specializes in helping Treasure Valley businesses build their brand, grow their audience, and convert customers.',
    deal: 'Member consultation rate', deal_details: 'Contact Elevate Marketing and mention The Standard Savings Club for your exclusive member rate.',
    website: 'https://elevatemarketingidaho.com', phone: '(208) 555-0106',
  },
}

const CATEGORY_ICONS = {
  'Grooming': '✂️', 'Restaurant': '🍔', 'Health & Beauty': '✨',
  'Home Services': '🏠', 'Sports Training': '🏀', 'Marketing': '📈',
}

export default function BusinessPage() {
  const { slug } = useParams()
  const { user } = useAuth()
  const [business, setBusiness] = useState(null)
  const [loading, setLoading] = useState(true)
  const [photoIndex, setPhotoIndex] = useState(0)

  useEffect(() => {
    loadBusiness()
  }, [slug])

  const loadBusiness = async () => {
    try {
      const { data, error } = await supabase.from('businesses').select('*').eq('slug', slug).single()
      if (error || !data) {
        setBusiness(FALLBACK_BUSINESSES[slug] || null)
      } else {
        setBusiness(data)
      }
    } catch (e) {
      setBusiness(FALLBACK_BUSINESSES[slug] || null)
    }
    setLoading(false)
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="font-heading text-gray-400 text-sm uppercase tracking-widest">Loading...</div>
    </div>
  )

  if (!business) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center text-center px-4">
      <div>
        <div className="font-heading text-4xl uppercase text-maroon-900 mb-3">Business Not Found</div>
        <Link to="/businesses" className="text-maroon-700 hover:underline text-sm">← View All Partners</Link>
      </div>
    </div>
  )

  const photos = business.photos?.filter(Boolean) || []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover / Hero */}
      <div className="relative bg-maroon-900 text-white" style={{ minHeight: '300px' }}>
        {business.cover_url ? (
          <div className="absolute inset-0">
            <img src={business.cover_url} alt={business.name} className="w-full h-full object-cover opacity-40" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-maroon-900 to-maroon-800" />
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link to="/businesses" className="inline-flex items-center gap-1 text-maroon-300 hover:text-white text-xs font-heading tracking-widest uppercase mb-8 transition-colors">
            <ChevronLeft size={14} /> All Partners
          </Link>

          <div className="flex items-end gap-6">
            {/* Logo */}
            <div className="w-24 h-24 bg-white rounded-xl flex-shrink-0 flex items-center justify-center shadow-lg overflow-hidden">
              <img
                src={business.logo_url || `/logos/${business.slug}.png`}
                alt={business.name}
                className="w-full h-full object-cover"
                onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }}
              />
              <span style={{display:'none'}} className="font-heading text-4xl font-bold text-maroon-900 w-full h-full flex items-center justify-center">
                {business.name.charAt(0)}
              </span>
            </div>
            <div>
              <div className="font-heading text-xs tracking-widest uppercase text-maroon-300 mb-1">
                {CATEGORY_ICONS[business.category]} {business.category}
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl uppercase font-bold">{business.name}</h1>
              {business.tagline && <p className="text-maroon-200 text-lg mt-1">{business.tagline}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">

            {/* About */}
            {business.about && (
              <div className="bg-white border border-gray-200 shadow-sm p-6">
                <h2 className="font-heading text-xl uppercase text-maroon-900 mb-4">About</h2>
                <p className="text-gray-700 leading-relaxed">{business.about}</p>
              </div>
            )}

            {/* Photos */}
            {photos.length > 0 && (
              <div className="bg-white border border-gray-200 shadow-sm p-6">
                <h2 className="font-heading text-xl uppercase text-maroon-900 mb-4">Photos</h2>
                <div className="relative">
                  <img src={photos[photoIndex]} alt={`${business.name} photo ${photoIndex + 1}`}
                    className="w-full aspect-video object-cover rounded" />
                  {photos.length > 1 && (
                    <>
                      <button onClick={() => setPhotoIndex(i => (i - 1 + photos.length) % photos.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70">
                        <ChevronLeft size={16} />
                      </button>
                      <button onClick={() => setPhotoIndex(i => (i + 1) % photos.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70">
                        <ChevronRight size={16} />
                      </button>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {photos.map((_, i) => (
                          <button key={i} onClick={() => setPhotoIndex(i)}
                            className={`w-1.5 h-1.5 rounded-full transition-colors ${i === photoIndex ? 'bg-white' : 'bg-white/50'}`} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                {photos.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {photos.map((url, i) => (
                      <button key={i} onClick={() => setPhotoIndex(i)}
                        className={`aspect-square rounded overflow-hidden border-2 transition-colors ${i === photoIndex ? 'border-maroon-700' : 'border-transparent'}`}>
                        <img src={url} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Member Deal */}
            <div className="bg-maroon-900 text-white p-6">
              <div className="font-heading text-xs tracking-widest uppercase text-maroon-300 mb-2">Member Exclusive</div>
              <div className="flex items-start gap-3 mb-3">
                <Tag size={18} className="text-maroon-300 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-heading text-xl uppercase font-bold">{business.deal}</div>
                  {business.deal_details && (
                    <p className="text-maroon-200 text-sm mt-1 leading-relaxed">{business.deal_details}</p>
                  )}
                </div>
              </div>
              {!user && (
                <Link to="/join" className="flex items-center justify-center gap-2 w-full bg-white text-maroon-900 hover:bg-gray-100 font-heading text-xs tracking-widest uppercase py-3 mt-3 transition-colors">
                  <Lock size={12} /> Join to Unlock
                </Link>
              )}
            </div>

            {/* Contact */}
            <div className="bg-white border border-gray-200 shadow-sm p-6">
              <h3 className="font-heading text-base uppercase text-maroon-900 mb-4">Contact</h3>
              <div className="space-y-3">
                {business.address && (
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <MapPin size={15} className="text-maroon-700 flex-shrink-0 mt-0.5" />
                    <span>{business.address}</span>
                  </div>
                )}
                {business.phone && (
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone size={15} className="text-maroon-700 flex-shrink-0" />
                    <a href={`tel:${business.phone}`} className="hover:text-maroon-700 transition-colors">{business.phone}</a>
                  </div>
                )}
                {business.website && (
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Globe size={15} className="text-maroon-700 flex-shrink-0" />
                    <a href={business.website} target="_blank" rel="noreferrer" className="hover:text-maroon-700 transition-colors truncate">
                      {business.website.replace('https://', '')}
                    </a>
                  </div>
                )}
                {business.instagram && (
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Globe size={15} className="text-maroon-700 flex-shrink-0" />
                    <a href={`https://instagram.com/${business.instagram}`} target="_blank" rel="noreferrer" className="hover:text-maroon-700">
                      @{business.instagram}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Other partners teaser */}
            <div className="bg-gray-100 border border-gray-200 p-5 text-center">
              <p className="font-heading text-xs tracking-widest uppercase text-gray-500 mb-2">More Partners</p>
              <Link to="/businesses" className="text-maroon-700 hover:text-maroon-900 font-heading text-sm uppercase tracking-wide transition-colors">
                View All 6 Partners →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
