import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { supabase } from '../lib/supabase'
import { Calendar, Clock, MapPin, ExternalLink, ChevronRight, Tag } from 'lucide-react'

const CATEGORY_COLORS = {
  'Nightlife / Bars': 'bg-purple-50 text-purple-700',
  'Food & Drink': 'bg-orange-50 text-orange-700',
  'Family Activities': 'bg-green-50 text-green-700',
  'Sports & Fitness': 'bg-blue-50 text-blue-700',
  'Sports Training': 'bg-blue-50 text-blue-700',
  'Health & Beauty': 'bg-pink-50 text-pink-700',
  'Entertainment': 'bg-yellow-50 text-yellow-700',
  'Restaurant': 'bg-orange-50 text-orange-700',
}

function formatTime(t) {
  if (!t) return ''
  const [h, m] = t.split(':')
  const hr = parseInt(h)
  return `${hr > 12 ? hr - 12 : hr || 12}:${m} ${hr >= 12 ? 'PM' : 'AM'}`
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
}

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('upcoming') // 'upcoming' | 'all'

  useEffect(() => { loadEvents() }, [filter])

  const loadEvents = async () => {
    setLoading(true)
    const today = new Date().toISOString().split('T')[0]
    let query = supabase
      .from('business_events')
      .select('*, businesses(name, slug, logo_url)')
      .order('event_date', { ascending: true })
      .order('start_time', { ascending: true })

    if (filter === 'upcoming') query = query.gte('event_date', today)

    const { data } = await query
    setEvents(data || [])
    setLoading(false)
  }

  // Group events by date
  const grouped = events.reduce((acc, ev) => {
    const key = ev.event_date
    if (!acc[key]) acc[key] = []
    acc[key].push(ev)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO title="Events" description="Events, specials, and promotions happening at Standard Savings Club partner businesses across the Treasure Valley." path="/events" />
      {/* Header */}
      <div className="bg-maroon-900 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="font-heading text-xs tracking-widest uppercase text-maroon-300 hover:text-white transition-colors mb-6 block">← The Standard Savings Club</Link>
          <p className="font-heading text-xs tracking-widest uppercase text-maroon-400 mb-3">Treasure Valley</p>
          <h1 className="font-heading text-5xl sm:text-6xl uppercase font-bold leading-tight mb-4">
            Partner<br /><span className="text-maroon-400">Events</span>
          </h1>
          <div className="w-16 h-1 bg-maroon-700 mb-5" />
          <p className="text-maroon-200 text-lg max-w-xl">
            Events, specials, and promotions happening at Standard Savings Club partner businesses.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-maroon-800 border-b border-maroon-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1 py-2">
          {[['upcoming', 'Upcoming'], ['all', 'All Events']].map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)}
              className={`px-4 py-2 font-heading text-xs tracking-widest uppercase transition-colors ${filter === val ? 'bg-white text-maroon-900' : 'text-maroon-300 hover:text-white'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-20 text-gray-400">
            <div className="w-6 h-6 border-2 border-maroon-700 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm font-heading tracking-widest uppercase">Loading events...</p>
          </div>
        ) : Object.keys(grouped).length === 0 ? (
          <div className="text-center py-20">
            <Calendar size={40} className="text-maroon-200 mx-auto mb-4" />
            <p className="font-heading text-2xl uppercase text-maroon-900 mb-2">No Events Yet</p>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">Check back soon — partner businesses will post their events, specials, and promotions here.</p>
            <div className="mt-8">
              <Link to="/businesses" className="inline-flex items-center gap-2 border border-maroon-300 hover:border-maroon-700 text-maroon-700 font-heading text-xs tracking-widest uppercase px-6 py-3 transition-colors">
                View Partner Businesses →
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {Object.entries(grouped).map(([date, dayEvents]) => (
              <div key={date}>
                {/* Date header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-maroon-900 text-white text-center px-4 py-2 rounded flex-shrink-0">
                    <div className="font-heading text-xs uppercase text-maroon-300">{new Date(date + 'T12:00:00').toLocaleString('en-US', { month: 'short' })}</div>
                    <div className="font-heading text-3xl font-bold leading-none">{new Date(date + 'T12:00:00').getDate()}</div>
                    <div className="font-heading text-xs uppercase text-maroon-300">{new Date(date + 'T12:00:00').toLocaleString('en-US', { weekday: 'short' })}</div>
                  </div>
                  <div>
                    <h2 className="font-heading text-xl uppercase text-maroon-900">{formatDate(date)}</h2>
                    <p className="text-gray-400 text-xs mt-0.5">{dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>

                {/* Events for this day */}
                <div className="space-y-3 ml-0 sm:ml-20">
                  {dayEvents.map(ev => (
                    <div key={ev.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-5">
                      <div className="flex items-start gap-4">
                        {/* Business logo */}
                        <Link to={`/businesses/${ev.businesses?.slug}`} className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-lg bg-gray-900 overflow-hidden flex items-center justify-center">
                            {ev.businesses?.logo_url
                              ? <img src={ev.businesses.logo_url} alt={ev.businesses.name} className="w-full h-full object-contain p-1" />
                              : <span className="font-heading text-white text-lg font-bold">{ev.businesses?.name?.charAt(0)}</span>
                            }
                          </div>
                        </Link>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                            <h3 className="font-heading text-lg uppercase text-maroon-900">{ev.title}</h3>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {ev.is_free
                                ? <span className="bg-green-50 text-green-700 font-heading text-xs uppercase px-2 py-0.5">Free</span>
                                : ev.price && <span className="bg-maroon-50 text-maroon-700 font-heading text-xs uppercase px-2 py-0.5">{ev.price}</span>
                              }
                            </div>
                          </div>

                          {/* Business name */}
                          <Link to={`/businesses/${ev.businesses?.slug}`} className="text-maroon-600 hover:text-maroon-900 text-xs font-heading tracking-widest uppercase transition-colors">
                            {ev.businesses?.name}
                          </Link>

                          {/* Meta row */}
                          <div className="flex flex-wrap gap-3 mt-2">
                            {(ev.start_time) && (
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock size={11} />
                                {formatTime(ev.start_time)}{ev.end_time ? ` – ${formatTime(ev.end_time)}` : ''}
                              </div>
                            )}
                            {ev.location && (
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <MapPin size={11} />
                                {ev.location}
                              </div>
                            )}
                          </div>

                          {ev.description && <p className="text-sm text-gray-600 mt-2 leading-relaxed">{ev.description}</p>}

                          {ev.address && <p className="text-xs text-gray-400 mt-1">{ev.address}</p>}

                          {ev.event_url && (
                            <a href={ev.event_url} target="_blank" rel="noreferrer"
                              className="inline-flex items-center gap-1 mt-3 text-maroon-700 hover:text-maroon-900 text-xs font-heading tracking-widest uppercase transition-colors">
                              More Info <ExternalLink size={10} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA for businesses */}
        <div className="mt-16 bg-maroon-900 text-white p-8 text-center">
          <Calendar size={28} className="text-maroon-500 mx-auto mb-4" />
          <h3 className="font-heading text-2xl uppercase mb-2">Own a Business?</h3>
          <p className="text-maroon-300 text-sm mb-6 max-w-md mx-auto">Post your events, specials, and promotions here to reach Standard Savings Club members.</p>
          <Link to="/business-portal"
            className="inline-flex items-center gap-2 bg-white text-maroon-900 hover:bg-gray-100 font-heading text-xs tracking-widest uppercase px-6 py-3 transition-colors">
            Go to Business Portal →
          </Link>
        </div>
      </div>
    </div>
  )
}
