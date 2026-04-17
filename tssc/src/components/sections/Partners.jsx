const partners = [
  { name: 'Erick Butler Elite Basketball Training', category: 'Sports Training' },
  { name: 'Opal Teeth Whitening Studio', category: 'Beauty & Wellness' },
  { name: 'Boise Bug Bombers Pest Control', category: 'Home Services' },
  { name: 'Cowboy Burger', category: 'Restaurant' },
  { name: 'Uncle Ben\'s Haircuts', category: 'Grooming' },
  { name: 'Elevate Marketing', category: 'Marketing' },
]

export default function Partners() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="section-label">Our Partners</div>
          <h2 className="font-heading text-4xl sm:text-5xl uppercase text-maroon-900 mt-2">
            Save At &amp; Support These<br />Local Businesses
          </h2>
          <div className="w-16 h-1 bg-maroon-700 mx-auto mt-4" />
          <p className="text-gray-500 text-sm mt-4">Partners added weekly · Save 15–75% at every location</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
          {partners.map(({ name, category }) => (
            <div key={name} className="bg-white border border-gray-100 shadow-sm p-6 flex flex-col items-center text-center group hover:border-maroon-200 hover:shadow-md transition-all duration-200">
              <div className="w-16 h-16 bg-maroon-700 rounded-full flex items-center justify-center mb-4 group-hover:bg-maroon-700 transition-colors duration-200">
                <span className="font-heading text-2xl font-bold text-white">
                  {name.charAt(0)}
                </span>
              </div>
              <h3 className="font-heading text-sm uppercase text-maroon-900 leading-tight mb-1">{name}</h3>
              <span className="text-xs text-gray-500 font-medium">{category}</span>
            </div>
          ))}
        </div>

        <div className="text-center border-t border-gray-200 pt-10">
          <div className="inline-flex items-center gap-2 bg-maroon-700 text-white px-6 py-3">
            <span className="w-2 h-2 bg-accent-200 rounded-full animate-pulse" />
            <span className="font-heading text-xs tracking-widest uppercase">New partners added every week</span>
          </div>
        </div>
      </div>
    </section>
  )
}
