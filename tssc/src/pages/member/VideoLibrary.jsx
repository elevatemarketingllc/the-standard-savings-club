import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { ChevronLeft, Play, Search, Video } from 'lucide-react'

export default function VideoLibrary() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => { loadVideos() }, [])

  const loadVideos = async () => {
    const { data } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false })
    setVideos(data || [])
    setLoading(false)
  }

  const filtered = videos.filter(v =>
    v.title.toLowerCase().includes(search.toLowerCase()) ||
    (v.description || '').toLowerCase().includes(search.toLowerCase())
  )

  const getEmbedUrl = (url) => {
    // Handle YouTube URLs
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`
    // Handle Vimeo
    const vmMatch = url.match(/vimeo\.com\/(\d+)/)
    if (vmMatch) return `https://player.vimeo.com/video/${vmMatch[1]}`
    return url
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-maroon-900 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/member" className="flex items-center gap-1 text-maroon-300 hover:text-white text-xs font-heading tracking-widest uppercase mb-4 transition-colors">
            <ChevronLeft size={14} /> Back to Dashboard
          </Link>
          <h1 className="font-heading text-4xl uppercase font-bold">Video Library</h1>
          <p className="text-maroon-300 text-sm mt-1">Past Zoom sessions with local business owners</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="relative mb-8">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search sessions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-200 focus:border-maroon-700 focus:outline-none bg-white text-sm"
          />
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400 font-heading text-sm uppercase tracking-widest">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-maroon-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Video size={24} className="text-maroon-400" />
            </div>
            <div className="font-heading text-xl uppercase text-gray-400 mb-2">
              {videos.length === 0 ? 'No Videos Yet' : 'No Results'}
            </div>
            <p className="text-gray-400 text-sm">
              {videos.length === 0
                ? 'Recordings from our weekly Zoom sessions will appear here after each call.'
                : 'Try a different search term.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(video => (
              <VideoCard key={video.id} video={video} getEmbedUrl={getEmbedUrl} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function VideoCard({ video, getEmbedUrl }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="bg-white border border-gray-200 shadow-sm overflow-hidden group">
      {/* Thumbnail / Player */}
      <div className="relative aspect-video bg-maroon-950">
        {playing ? (
          <iframe
            src={getEmbedUrl(video.url)}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {video.thumbnail ? (
              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-maroon-900 to-maroon-950">
                <Video size={32} className="text-maroon-600" />
              </div>
            )}
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center">
                <Play size={20} className="text-maroon-900 ml-1" fill="currentColor" />
              </div>
            </button>
            {video.duration && (
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 font-mono">
                {video.duration}
              </div>
            )}
          </>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-heading text-sm uppercase text-maroon-900 font-bold leading-tight mb-1">{video.title}</h3>
        {video.description && (
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{video.description}</p>
        )}
        <p className="text-gray-400 text-xs mt-2">
          {new Date(video.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>
    </div>
  )
}
