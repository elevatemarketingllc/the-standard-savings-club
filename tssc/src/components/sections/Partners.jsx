import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import WaveDivider from '../ui/WaveDivider'

const STATIC_PARTNERS = [
  { slug: 'uncle-bens-haircuts', name: "Uncle Ben's Haircuts", deal: '$10 off every cut', initials: 'UB', bg: '#000000' },
  { slug: 'cowboy-burger', name: 'Cowboy Burger', deal: 'Members-only discount', initials: 'CB', bg: '#2a0a0a' },
  { slug: 'opal-teeth-whitening', name: 'Opal Teeth Whitening', deal: 'Exclusive member rate', initials: 'OW', bg: '#ffffff' },
  { slug: 'boise-bug-bombers', name: 'Boise Bug Bombers', deal: 'Members-only pricing', initials: 'BB', bg: '#000000' },
  { slug: 'erick-butler-training', name: 'Erick Butler Training', deal: 'Member discount on sessions', initials: 'EB', bg: '#000000' },
  { slug: 'elevate-marketing', name: 'Elevate Marketing', deal: 'Member consultation rate', initials: 'EM', bg: '#000000' },
]

export default function Partners() {
  const [partners, setPartners] = useState(STATIC_PARTNERS)

  useEffect(() => {
    supabase.from('businesses').select('slug, name, deal, logo_url').eq('active', true).order('featured', { ascending: false })
      .then(({ data }) => {
        if (data?.length) {
          // Merge DB data with static fallbacks for bg/initials
          const merged = data.map(b => {
            const s = STATIC_PARTNERS.find(p => p.slug === b.slug) || { initials: b.name.slice(0,2).toUpperCase(), bg: '#1a1a2e' }
            return { ...s, ...b }
          })
          setPartners(merged)
        }
      })
  }, [])

  return (
    <section className="relative pb-28 pt-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="font-heading text-xs tracking-widest uppercase text-maroon-700 mb-3">Treasure Valley</div>
          <h2 className="font-heading text-4xl sm:text-5xl uppercase text-maroon-900 mb-4">Partner Businesses</h2>
          <div className="w-12 h-1 bg-maroon-700 mx-auto mb-4" />
          <p className="text-gray-600 max-w-xl mx-auto">Hand-picked local businesses offering exclusive deals to Standard Savings Club members.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-10">
          {partners.map(({ slug, name, deal, initials, bg, logo_url }) => (
            <Link key={slug} to={`/businesses/${slug}`}
              className="group flex flex-col items-center text-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-28 h-28 rounded-2xl mb-3 flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow overflow-hidden"
                style={{ backgroundColor: bg }}>
                {/* Prefer Supabase logo_url, fall back to static file, then initials */}
                <img
                  src={logo_url || `/logos/${slug}.png`}
                  alt={name}
                  className="w-full h-full object-contain p-2"
                  onError={e => {
                    // If logo_url failed, try static file
                    if (logo_url && !e.target.src.includes('/logos/')) {
                      e.target.src = `/logos/${slug}.png`
                    } else {
                      e.target.style.display = 'none'
                      e.target.parentNode.querySelector('.fallback').style.display = 'flex'
                    }
                  }}
                />
                <span className="fallback hidden w-full h-full items-center justify-center font-heading font-bold text-white text-2xl"
                  style={{ backgroundColor: bg }}>{initials}</span>
              </div>
              <div className="font-heading text-xs uppercase text-maroon-900 leading-tight mb-1">{name}</div>
              <div className="text-xs text-gray-500 leading-tight">{deal}</div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/businesses"
            className="inline-flex items-center gap-2 border border-maroon-300 hover:border-maroon-700 text-maroon-700 hover:text-maroon-900 font-heading text-xs tracking-widest uppercase px-6 py-3 transition-colors">
            View All Partner Pages →
          </Link>
        </div>
      </div>

      <WaveDivider fill="#4a2526" variant="tilt" height={80} />
    </section>
  )
}
