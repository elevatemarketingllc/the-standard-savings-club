import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, Lock, Search, ChevronLeft, Calendar, Clock } from 'lucide-react'

// Placeholder videos — Ben will upload real ones via admin panel
const videos = [
  {
    id: 1,
    title: 'Meet the Owner: Uncle Ben\'s Haircuts',
    guest: 'Ben Galvan',
    business: 'Uncle Ben\'s Haircuts',
    date: 'April 16, 2026',
    duration: '47 min',
    thumbnail: null,
    description: 'Ben shares his journey from barber to business owner, how he built his community following, and what The Standard Savings Club means to Boise.',
    category: 'Featured',
  },
  {
    id: 2,
    title: 'Growing a Local Pest Control Business',
    guest: 'Boise Bug Bombers Team',
    business: 'Boise Bug Bombers Pest Control',
    date: 'April 9, 2026',
    duration: '52 min',
    thumbnail: null,
    description: 'How Boise Bug Bombers built a loyal customer base through referrals and community involvement. Q&A with members included.',
    category: 'Business Growth',
  },
  {
    id: 3,
    title: 'Building an Elite Training Program',
    guest: 'Erick Butler',
    business: 'Erick Butler Elite Basketball Training',
    date: 'April 2, 2026',
    duration: '38 min',
    thumbnail: null,
    description: 'Erick Butler breaks down his training philosophy, how he works with youth athletes, and tips for parents looking to develop young players.',
    category: 'Sports & Fitness',
  },
  {
    id: 4,
    title: 'Teeth Whitening: What You Need to Know',
    guest: 'Opal Studio Team',
    business: 'Opal Teeth Whitening Studio',
    date: 'March 26, 2026',
    duration: '41 min',
    thumbnail: null,
    description: 'The team at Opal answers member questions about teeth whitening treatments, what to expect, and how to maintain results.',
    category: 'Health & Beauty',
  },
]

const categories = ['All', 'Featured', 'Business Growth', 'Sports & Fitness', 'Health & Beauty']

export default function VideoLibrary() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [playing, setPlaying] = useState(null)

  const filtered = videos.filter(v => {
    const matchSearch = v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.guest.toLowerCase().includes(search.toLowerCase()) ||
      v.business.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory === 'All' || v.category === activeCategory
    return matchSearch && matchCat
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-maroon-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/member" className="flex items-center gap-1 text-maroon-300 hover:text-white text-xs font-heading tracking-widest uppercase mb-4 transition-colors">
            <ChevronLeft size={14} /> Back to Dashboard
          </Link>
          <h1 className="font-heading text-3xl sm:text-4xl uppercase font-bold">Video Library</h1>
          <p className="text-maroon-300 text-sm mt-1">Past Zoom sessions with local business owners — exclusively for members</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search videos, guests, businesses..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 focus:border-maroon-700 focus:outline-none text-sm bg-white"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-heading tracking-wider uppercase transition-colors ${
                  activeCategory === cat
                    ? 'bg-maroon-700 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-maroon-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Videos grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Play size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-heading text-lg uppercase">No videos found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filtered.map(video => (
              <div key={video.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-maroon-200 transition-all duration-200">
                {/* Thumbnail */}
                <div className="relative bg-maroon-900 aspect-video flex items-center justify-center group cursor-pointer"
                  onClick={() => setPlaying(playing === video.id ? null : video.id)}>
                  {/* Placeholder thumbnail */}
                  <div className="absolute inset-0 bg-gradient-to-br from-maroon-800 to-maroon-950 flex items-center justify-center">
                    <div className="text-center px-8">
                      <div className="font-heading text-white text-lg uppercase leading-tight opacity-60">{video.business}</div>
                    </div>
                  </div>
                  <div className="relative z-10 w-14 h-14 bg-white/20 group-hover:bg-white/30 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm">
                    <Play size={22} className="text-white ml-1" />
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 font-heading">
                    {video.duration}
                  </div>
                  <div className="absolute top-3 left-3 bg-maroon-700 text-white text-xs px-2 py-1 font-heading tracking-wider uppercase">
                    {video.category}
                  </div>
                </div>

                {/* Video info */}
                <div className="p-5">
                  <h3 className="font-heading text-lg uppercase text-maroon-900 leading-tight mb-1">{video.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {video.date}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {video.duration}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{video.description}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-maroon-100 rounded-full flex items-center justify-center">
                      <span className="font-heading text-xs font-bold text-maroon-700">{video.guest.charAt(0)}</span>
                    </div>
                    <span className="text-xs text-gray-500">{video.guest} · {video.business}</span>
                  </div>
                </div>

                {/* Play expanded (placeholder for actual video embed) */}
                {playing === video.id && (
                  <div className="border-t border-gray-100 p-5 bg-maroon-50">
                    <div className="aspect-video bg-maroon-900 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Play size={40} className="mx-auto mb-3 opacity-50" />
                        <p className="font-heading text-sm uppercase tracking-widest opacity-60">Video Coming Soon</p>
                        <p className="text-xs text-maroon-300 mt-1">Ben will upload the recording here</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* New videos notice */}
        <div className="mt-10 bg-maroon-900 text-white p-6 text-center">
          <p className="font-heading text-xs tracking-widest uppercase text-maroon-300 mb-1">New Videos Every Week</p>
          <p className="text-maroon-200 text-sm">Every Wednesday and Saturday Zoom is uploaded here within 48 hours. Check back regularly.</p>
        </div>
      </div>
    </div>
  )
}
