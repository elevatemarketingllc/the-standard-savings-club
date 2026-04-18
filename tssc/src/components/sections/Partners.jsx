import { Link } from 'react-router-dom'
import WaveDivider from '../ui/WaveDivider'

const partners = [
  { slug: 'uncle-bens-haircuts', name: "Uncle Ben's Haircuts", deal: '$10 off every cut', category: 'Grooming', initials: 'UB', bg: '#1a1a2e', accent: '#6e383b' },
  { slug: 'cowboy-burger', name: 'Cowboy Burger', deal: 'Members-only discount', category: 'Restaurant', initials: 'CB', bg: '#2d1b00', accent: '#c45e00' },
  { slug: 'opal-teeth-whitening', name: 'Opal Teeth Whitening', deal: 'Exclusive member rate', category: 'Health & Beauty', initials: 'OW', bg: '#1a2744', accent: '#4a90d9' },
  { slug: 'boise-bug-bombers', name: 'Boise Bug Bombers', deal: 'Members-only pricing', category: 'Home Services', initials: 'BB', bg: '#1a2d1a', accent: '#3d8b3d' },
  { slug: 'erick-butler-training', name: 'Erick Butler Training', deal: 'Member discount on sessions', category: 'Sports Training', initials: 'EB', bg: '#1a1a2e', accent: '#8b5cf6' },
  { slug: 'elevate-marketing', name: 'Elevate Marketing', deal: 'Member consultation rate', category: 'Marketing', initials: 'EM', bg: '#1a1a2e', accent: '#f59e0b' },
]

export default function Partners() {
  return (
    <section className="relative pb-28 pt-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="font-heading text-xs tracking-widest uppercase text-maroon-700 mb-3">Treasure Valley</div>
          <h2 className="font-heading text-4xl sm:text-5xl uppercase text-maroon-900 mb-4">Partner Businesses</h2>
          <div className="w-12 h-1 bg-maroon-700 mx-auto mb-4" />
          <p className="text-gray-600 max-w-xl mx-auto">Six hand-picked local businesses offering exclusive deals to Standard Savings Club members.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {partners.map(({ slug, name, deal, category, initials, bg, accent }) => (
            <Link key={slug} to={`/businesses/${slug}`}
              className="group flex flex-col items-center text-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
              {/* Logo */}
              <div className="w-16 h-16 rounded-xl mb-3 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow overflow-hidden"
                style={{ backgroundColor: bg }}>
                <img src={`/logos/${slug}.png`} alt={name} className="w-full h-full object-cover"
                  onError={e => { e.target.style.display = 'none'; e.target.parentNode.querySelector('.fallback').style.display = 'flex' }} />
                <span className="fallback hidden w-full h-full items-center justify-center font-heading font-bold text-white text-lg"
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
