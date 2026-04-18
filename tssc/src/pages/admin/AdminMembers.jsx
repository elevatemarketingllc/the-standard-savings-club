import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { ChevronLeft, RefreshCw, Search, Users, Copy, Check } from 'lucide-react'

export default function AdminMembers() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [copied, setCopied] = useState(null)

  useEffect(() => { loadMembers() }, [])

  const loadMembers = async () => {
    setLoading(true)
    // Join profiles with auth.users — use Supabase admin view
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
    setMembers(data || [])
    setLoading(false)
  }

  const copyId = (id) => {
    navigator.clipboard.writeText(id)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const filtered = members.filter(m => {
    const q = search.toLowerCase()
    return (
      (m.first_name || '').toLowerCase().includes(q) ||
      (m.last_name || '').toLowerCase().includes(q) ||
      (m.membership_id || '').toLowerCase().includes(q) ||
      (m.phone || '').includes(q)
    )
  })

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-maroon-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/admin" className="flex items-center gap-1 text-maroon-300 hover:text-white text-xs font-heading tracking-widest uppercase mb-4 transition-colors">
            <ChevronLeft size={14} /> Admin Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-3xl uppercase font-bold">Members</h1>
              <p className="text-maroon-300 text-sm mt-1">{members.length} total registered accounts</p>
            </div>
            <button onClick={loadMembers} className="flex items-center gap-2 border border-maroon-600 hover:border-white text-maroon-300 hover:text-white font-heading text-xs tracking-widest uppercase px-4 py-2 transition-colors">
              <RefreshCw size={13} /> Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Members', value: members.length, icon: Users },
            { label: 'With Phone', value: members.filter(m => m.phone).length, icon: Users },
            { label: 'With Member ID', value: members.filter(m => m.membership_id).length, icon: Users },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white border border-gray-200 shadow-sm p-5">
              <div className="font-heading text-xs tracking-widest uppercase text-gray-500 mb-1">{label}</div>
              <div className="font-heading text-4xl font-bold text-maroon-900">{value}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search by name, member ID, or phone..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 focus:border-maroon-700 focus:outline-none text-sm bg-white" />
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Member ID', 'Name', 'Phone', 'Avatar', 'Joined', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-heading text-xs tracking-widest uppercase text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-12 text-gray-400">
                  <RefreshCw size={20} className="animate-spin mx-auto mb-2" />
                  <span className="font-heading text-xs uppercase tracking-widest">Loading...</span>
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-gray-400 font-heading text-sm uppercase tracking-widest">No members found</td></tr>
              ) : filtered.map(member => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    {member.membership_id ? (
                      <div className="flex items-center gap-2">
                        <span className="font-heading text-xs text-maroon-700 bg-maroon-50 border border-maroon-100 px-2 py-0.5">
                          {member.membership_id}
                        </span>
                        <button onClick={() => copyId(member.membership_id)} className="text-gray-400 hover:text-maroon-700 transition-colors">
                          {copied === member.membership_id ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs italic">Not assigned</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-gray-900">
                      {member.first_name || member.last_name
                        ? `${member.first_name || ''} ${member.last_name || ''}`.trim()
                        : <span className="text-gray-400 italic">No name</span>
                      }
                    </div>
                    <div className="text-gray-400 text-xs mt-0.5 font-mono">{member.id.slice(0, 8)}...</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{member.phone || <span className="text-gray-300 italic">—</span>}</td>
                  <td className="px-4 py-3">
                    {member.avatar_type === 'image' && member.avatar
                      ? <img src={member.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                      : <span className="text-2xl">{member.avatar || '😊'}</span>
                    }
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {new Date(member.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3">
                    <a href={`/verify/${member.membership_id}`} target="_blank" rel="noreferrer"
                      className="text-xs text-maroon-700 hover:text-maroon-900 font-heading uppercase tracking-wide transition-colors">
                      Verify →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
