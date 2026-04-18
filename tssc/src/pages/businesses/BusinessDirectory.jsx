import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { MapPin, Search, ExternalLink, Tag, ChevronRight } from 'lucide-react'

const CATEGORIES = ['All', 'Grooming', 'Restaurant', 'Health & Beauty', 'Home Services', 'Sports Training', 'Marketing']

const CATEGORY_COLORS = {
  'Grooming': 'bg-blue-50 text-blue-700',
  'Restaurant': 'bg-orange-50 text-orange-700',
  'Health & Beauty': 'bg-pink-50 text-pink-700',
  'Home Services': 'bg-green-50 text-green-700',
  'Sports Training': 'bg-purple-50 text-purple-700',
  'Marketing': 'bg-yellow-50 text-yellow-700',
}

// Fallback static businesses if DB not set up yet
const FALLBACK = [
  { slug: 'uncle-bens-haircuts', name: "Uncle Ben's Haircuts", tagline: "Boise's Premier Barbershop", category: 'Grooming', deal: '$10 off every haircut', featured: true },
  { slug: 'cowboy-burger', name: 'Cowboy Burger', tagline: 'Smash Burgers Done Right', category: 'Restaurant', deal: 'Members-only discount', featured: false },
  { slug: 'opal-teeth-whitening', name: 'Opal Teeth Whitening Studio', tagline: 'Your Brightest Smile Starts Here', category: 'Health & Beauty', deal: 'Exclusive member rate', featured: false },
  { slug: 'boise-bug-bombers', name: 'Boise Bug Bombers Pest Control', tagline: 'Protecting Treasure Valley Homes', category: 'Home Services', deal: 'Members-only pricing', featured: false },
  { slug: 'erick-butler-training', name: 'Erick Butler Elite Basketball Training', tagline: 'Elevate Your Game', category: 'Sports Training', deal: 'Member discount on sessions', featured: false },
  { slug: 'elevate-marketing', name: 'Elevate Marketing LLC', tagline: 'Digital Marketing That Converts', category: 'Marketing', deal: 'Member consultation rate', featured: false },
]

export default function BusinessDirectory() {
  const [businesses, setBusinesses] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBusinesses()
  }, [])

  const loadBusinesses = async () => {
    try {
      const { data, error } = await supabase.from('businesses').select('*').eq('active', true).order('featured', { ascending: false })
      if (error || !data?.length) {
        setBusinesses(FALLBACK)
      } else {
        setBusinesses(data)
      }
    } catch (e) {
      setBusinesses(FALLBACK)
    }
    setLoading(false)
  }

  const filtered = businesses.filter(b => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) || 
      (b.tagline || '').toLowerCase().includes(search.toLowerCase()) ||
      (b.category || '').toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'All' || b.category === category
    return matchSearch && matchCat
  })

  const featured = filtered.filter(b => b.featured)
  const rest = filtered.filter(b => !b.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-maroon-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="font-heading text-xs tracking-widest uppercase text-maroon-300 mb-3">Treasure Valley</div>
          <h1 className="font-heading text-5xl sm:text-6xl uppercase font-bold mb-4">Partner Businesses</h1>
          <p className="text-maroon-200 text-lg max-w-2xl mx-auto">Exclusive member discounts at the best local businesses in Boise and the Treasure Valley.</p>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search businesses..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 focus:border-maroon-700 focus:outline-none text-sm" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-3 py-2 text-xs font-heading tracking-wider uppercase transition-colors whitespace-nowrap ${
                  category === cat ? 'bg-maroon-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured */}
        {featured.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-1 bg-maroon-700" />
              <h2 className="font-heading text-xl uppercase text-maroon-900">Featured Partners</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featured.map(biz => <BusinessCard key={biz.slug} business={biz} featured />)}
            </div>
          </div>
        )}

        {/* All businesses */}
        {rest.length > 0 && (
          <div>
            {featured.length > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-1 bg-maroon-700" />
                <h2 className="font-heading text-xl uppercase text-maroon-900">All Partners</h2>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map(biz => <BusinessCard key={biz.slug} business={biz} />)}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <MapPin size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-heading text-lg uppercase">No businesses found</p>
          </div>
        )}

        {/* CTA for businesses */}
        <div className="mt-16 bg-maroon-900 text-white p-8 text-center">
          <p className="font-heading text-xs tracking-widest uppercase text-maroon-300 mb-2">Are you a local business?</p>
          <h3 className="font-heading text-2xl uppercase font-bold mb-3">Join The Standard Savings Club</h3>
          <p className="text-maroon-200 text-sm mb-6 max-w-xl mx-auto">Partner with us to reach hundreds of local members actively looking to support Boise businesses.</p>
          <Link to="/for-businesses" className="inline-flex items-center gap-2 bg-white text-maroon-900 hover:bg-gray-100 font-heading text-xs tracking-widest uppercase px-6 py-3 transition-colors">
            Learn More <ChevronRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  )
}

function BusinessCard({ business: biz, featured }) {
  const colorClass = CATEGORY_COLORS[biz.category] || 'bg-gray-100 text-gray-600'
  const initial = biz.name.charAt(0)

  return (
    <Link to={`/businesses/${biz.slug}`}
      className={`bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-maroon-200 transition-all duration-200 group block ${featured ? 'p-6' : 'p-5'}`}>

      <div className={`flex items-start gap-4 ${featured ? 'mb-4' : 'mb-3'}`}>
        {/* Logo */}
        <div className={`${featured ? 'w-16 h-16' : 'w-12 h-12'} rounded-lg flex-shrink-0 overflow-hidden bg-gray-900 shadow-sm`}>
          <img
            src={biz.logo_url || `/logos/${biz.slug}.png`}
            alt={biz.name}
            className="w-full h-full object-cover"
            onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }}
          />
          <span style={{display:'none'}} className={`${featured ? 'w-16 h-16 text-2xl' : 'w-12 h-12 text-xl'} bg-maroon-900 flex items-center justify-center font-heading font-bold text-white`}>{initial}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className={`inline-flex items-center px-2 py-0.5 text-xs font-heading tracking-wide ${colorClass} mb-1.5`}>
            {biz.category}
          </div>
          <h3 className={`font-heading uppercase text-maroon-900 leading-tight ${featured ? 'text-xl' : 'text-base'}`}>{biz.name}</h3>
          {biz.tagline && <p className="text-gray-500 text-xs mt-0.5">{biz.tagline}</p>}
        </div>
      </div>

      {featured && biz.description && (
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{biz.description}</p>
      )}

      <div className="flex items-center gap-2 bg-maroon-50 border border-maroon-100 px-3 py-2">
        <Tag size={12} className="text-maroon-700 flex-shrink-0" />
        <span className="text-maroon-700 text-xs font-semibold">{biz.deal}</span>
      </div>

      <div className="mt-3 flex items-center text-xs text-maroon-700 font-heading tracking-wide group-hover:gap-2 transition-all">
        View Details <ChevronRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  )
}
