import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { Users, Video, MessageSquare, Plus, RefreshCw, Check, Trash2, Pin, ChevronDown, ChevronUp, Upload } from 'lucide-react'

const ADMIN_EMAILS = ['elevatemarketingidaho@gmail.com', 'admin@thestandardsavingsclub.com']

// Seed posts Ben would want pinned from the start
const SEED_POSTS = [
  {
    author_name: 'Ben Galvan',
    author_avatar: '💈',
    title: 'Welcome to The Standard Savings Club Community!',
    body: "Hey everyone — so stoked to have you here. This forum is your place to connect with other members, share deals you've found, ask questions, and get to know each other. We're building something special in Boise and you're part of it. Introduce yourself below!",
    pinned: true,
    likes: 0,
  },
  {
    author_name: 'Ben Galvan',
    author_avatar: '💈',
    title: 'How to Use Your Membership',
    body: "Quick guide: Show your membership confirmation email at any partner business to get your discount. For Uncle Ben's Haircuts, the $10 off is automatic when you check in — just tell us you're a Standard member. Zoom links go out every Tuesday and Friday night before the sessions. Any questions, post them here!",
    pinned: true,
    likes: 0,
  },
]

export default function AdminDashboard() {
  const { user, signOut } = useAuth()
  const [members, setMembers] = useState([])
  const [videos, setVideos] = useState([])
  const [posts, setPosts] = useState([])
  const [stats, setStats] = useState({ memberCount: 0, videos: 0, posts: 0 })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  // Video form
  const [showVideoForm, setShowVideoForm] = useState(false)
  const [videoForm, setVideoForm] = useState({ title: '', guest: '', business: '', date: '', duration: '', description: '', url: '', category: 'Business Growth' })
  const [savingVideo, setSavingVideo] = useState(false)
  const [savedVideo, setSavedVideo] = useState(false)

  // Post form
  const [showPostForm, setShowPostForm] = useState(false)
  const [postForm, setPostForm] = useState({ title: '', body: '', pinned: false })
  const [savingPost, setSavingPost] = useState(false)

  const isAdmin = ADMIN_EMAILS.includes(user?.email)

  useEffect(() => {
    if (isAdmin) {
      loadData()
    }
  }, [isAdmin])

  const loadData = async () => {
    setLoading(true)

    // Load posts
    const { data: postsData } = await supabase
      .from('forum_posts')
      .select('*')
      .order('created_at', { ascending: false })
    if (postsData) setPosts(postsData)

    // Load videos from localStorage as simple storage
    const storedVideos = JSON.parse(localStorage.getItem('tssc_videos') || '[]')
    setVideos(storedVideos)

    const { count: memberCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true })

    setStats({
      memberCount: memberCount || 0,
      videos: storedVideos.length,
      posts: postsData?.length || 0,
    })

    setLoading(false)
  }

  const handleSeedPosts = async () => {
    for (const post of SEED_POSTS) {
      await supabase.from('forum_posts').insert({
        user_id: user.id,
        ...post,
      })
    }
    loadData()
  }

  const handleAddVideo = async () => {
    if (!videoForm.title || !videoForm.url) return
    setSavingVideo(true)
    const newVideo = { ...videoForm, id: Date.now(), addedAt: new Date().toISOString() }
    const updated = [newVideo, ...videos]
    localStorage.setItem('tssc_videos', JSON.stringify(updated))
    setVideos(updated)
    setVideoForm({ title: '', guest: '', business: '', date: '', duration: '', description: '', url: '', category: 'Business Growth' })
    setShowVideoForm(false)
    setSavingVideo(false)
    setSavedVideo(true)
    setTimeout(() => setSavedVideo(false), 3000)
  }

  const handleDeleteVideo = (id) => {
    const updated = videos.filter(v => v.id !== id)
    localStorage.setItem('tssc_videos', JSON.stringify(updated))
    setVideos(updated)
  }

  const handleAddPost = async () => {
    if (!postForm.title || !postForm.body) return
    setSavingPost(true)
    await supabase.from('forum_posts').insert({
      user_id: user.id,
      author_name: 'Ben Galvan',
      author_avatar: '💈',
      title: postForm.title,
      body: postForm.body,
      pinned: postForm.pinned,
    })
    setPostForm({ title: '', body: '', pinned: false })
    setShowPostForm(false)
    setSavingPost(false)
    loadData()
  }

  const handleTogglePin = async (post) => {
    await supabase.from('forum_posts').update({ pinned: !post.pinned }).eq('id', post.id)
    loadData()
  }

  const handleDeletePost = async (id) => {
    await supabase.from('forum_posts').delete().eq('id', id)
    loadData()
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="font-heading text-4xl uppercase text-maroon-900 mb-4">Access Denied</div>
          <p className="text-gray-500">This page is only accessible to admins.</p>
        </div>
      </div>
    )
  }

  const TABS = ['overview', 'videos', 'forum', 'members']

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-maroon-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <p className="text-maroon-300 text-xs font-heading tracking-widest uppercase mb-1">Admin Panel</p>
            <h1 className="font-heading text-3xl uppercase font-bold">The Standard Savings Club</h1>
          </div>
          <button onClick={signOut} className="text-maroon-300 hover:text-white text-xs font-heading tracking-widest uppercase transition-colors">
            Sign Out
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-maroon-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-0">
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-heading text-xs tracking-widest uppercase transition-colors ${activeTab === tab ? 'bg-gray-100 text-maroon-900' : 'text-maroon-300 hover:text-white'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Overview */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Forum Posts', value: stats.posts, icon: MessageSquare, note: 'Total community posts' },
                { label: 'Videos', value: stats.videos, icon: Video, note: 'In the video library' },
                { label: 'Members', value: stats.memberCount ?? 0, icon: Users, note: 'Registered accounts' },
              ].map(({ label, value, icon: Icon, note }) => (
                <div key={label} className="bg-white border border-gray-200 shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 bg-maroon-100 rounded-full flex items-center justify-center">
                      <Icon size={16} className="text-maroon-700" />
                    </div>
                    <span className="font-heading text-xs tracking-widest uppercase text-gray-500">{label}</span>
                  </div>
                  <div className="font-heading text-4xl font-bold text-maroon-900">{value}</div>
                  <div className="text-xs text-gray-400 mt-1">{note}</div>
                </div>
              ))}
            </div>

            <div className="bg-white border border-gray-200 shadow-sm p-6">
              <h2 className="font-heading text-xl uppercase text-maroon-900 mb-4">Quick Actions</h2>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setActiveTab('videos')}
                  className="flex items-center gap-2 bg-maroon-700 hover:bg-maroon-800 text-white font-heading text-xs tracking-widest uppercase px-4 py-2.5 transition-colors">
                  <Plus size={13} /> Add Video
                </button>
                <button onClick={() => setActiveTab('forum')}
                  className="flex items-center gap-2 bg-maroon-700 hover:bg-maroon-800 text-white font-heading text-xs tracking-widest uppercase px-4 py-2.5 transition-colors">
                  <Plus size={13} /> New Post
                </button>
                <button onClick={handleSeedPosts}
                  className="flex items-center gap-2 border border-maroon-300 text-maroon-700 hover:bg-maroon-50 font-heading text-xs tracking-widest uppercase px-4 py-2.5 transition-colors">
                  Seed Welcome Posts
                </button>
                <a href="https://dashboard.stripe.com" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 border border-gray-300 text-gray-600 hover:bg-gray-50 font-heading text-xs tracking-widest uppercase px-4 py-2.5 transition-colors">
                  View Stripe Dashboard
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Videos */}
        {activeTab === 'videos' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl uppercase text-maroon-900">Video Library</h2>
              <button onClick={() => setShowVideoForm(!showVideoForm)}
                className="flex items-center gap-2 bg-maroon-700 hover:bg-maroon-800 text-white font-heading text-xs tracking-widest uppercase px-4 py-2.5 transition-colors">
                <Plus size={13} /> Add Video
              </button>
            </div>

            {savedVideo && (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 mb-4 flex items-center gap-2">
                <Check size={14} /> Video added successfully
              </div>
            )}

            {showVideoForm && (
              <div className="bg-white border border-maroon-200 shadow-sm p-6 mb-6">
                <h3 className="font-heading text-lg uppercase text-maroon-900 mb-4">Add New Video</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {[
                    { key: 'title', label: 'Video Title', placeholder: 'Meet the Owner: Uncle Bens Haircuts', required: true },
                    { key: 'guest', label: 'Guest Name', placeholder: 'Ben Galvan' },
                    { key: 'business', label: 'Business Name', placeholder: "Uncle Ben's Haircuts" },
                    { key: 'date', label: 'Date', placeholder: 'April 16, 2026' },
                    { key: 'duration', label: 'Duration', placeholder: '47 min' },
                    { key: 'url', label: 'Video URL (YouTube/Vimeo/Bunny)', placeholder: 'https://...', required: true },
                  ].map(({ key, label, placeholder, required }) => (
                    <div key={key}>
                      <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">
                        {label} {required && <span className="text-red-500">*</span>}
                      </label>
                      <input type="text" value={videoForm[key]} onChange={e => setVideoForm({...videoForm, [key]: e.target.value})}
                        placeholder={placeholder}
                        className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-2.5 text-sm" />
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Description</label>
                  <textarea value={videoForm.description} onChange={e => setVideoForm({...videoForm, description: e.target.value})}
                    rows={3} placeholder="What does this session cover?"
                    className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-2.5 text-sm resize-none" />
                </div>
                <div className="mb-4">
                  <label className="font-heading text-xs tracking-widest uppercase text-gray-600 mb-1.5 block">Category</label>
                  <select value={videoForm.category} onChange={e => setVideoForm({...videoForm, category: e.target.value})}
                    className="border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-2.5 text-sm">
                    {['Featured', 'Business Growth', 'Sports & Fitness', 'Health & Beauty', 'Food & Dining', 'Home Services', 'Marketing'].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleAddVideo} disabled={savingVideo}
                    className="flex items-center gap-2 bg-maroon-700 hover:bg-maroon-800 disabled:opacity-60 text-white font-heading text-xs tracking-widest uppercase px-5 py-2.5 transition-colors">
                    {savingVideo ? <><RefreshCw size={11} className="animate-spin" /> Saving...</> : <><Upload size={11} /> Add Video</>}
                  </button>
                  <button onClick={() => setShowVideoForm(false)} className="text-gray-500 text-xs font-heading tracking-widest uppercase px-4 py-2.5 hover:text-gray-700">Cancel</button>
                </div>
              </div>
            )}

            {videos.length === 0 ? (
              <div className="bg-white border border-gray-200 shadow-sm p-12 text-center text-gray-400">
                <Video size={40} className="mx-auto mb-4 opacity-30" />
                <p className="font-heading text-lg uppercase">No videos yet</p>
                <p className="text-sm mt-1">Add your first Zoom recording above</p>
              </div>
            ) : (
              <div className="space-y-3">
                {videos.map(video => (
                  <div key={video.id} className="bg-white border border-gray-200 shadow-sm p-5 flex items-start justify-between gap-4">
                    <div>
                      <div className="font-heading text-sm uppercase text-maroon-900">{video.title}</div>
                      <div className="text-xs text-gray-500 mt-1">{video.guest} · {video.business} · {video.date} · {video.duration}</div>
                      {video.url && <a href={video.url} target="_blank" rel="noreferrer" className="text-xs text-maroon-700 hover:underline mt-1 block truncate max-w-md">{video.url}</a>}
                    </div>
                    <button onClick={() => handleDeleteVideo(video.id)} className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0">
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Members */}
        {activeTab === 'members' && (
          <div className="bg-white border border-gray-200 shadow-sm p-8 text-center">
            <div className="font-heading text-2xl uppercase text-maroon-900 mb-3">Member Management</div>
            <p className="text-gray-500 text-sm mb-6">View all registered members, their membership IDs, contact info and more.</p>
            <Link to="/admin/members" className="inline-flex items-center gap-2 bg-maroon-700 hover:bg-maroon-800 text-white font-heading text-xs tracking-widest uppercase px-6 py-3 transition-colors">
              View All Members →
            </Link>
          </div>
        )}

        {/* Forum */}
        {activeTab === 'forum' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl uppercase text-maroon-900">Forum Posts</h2>
              <button onClick={() => setShowPostForm(!showPostForm)}
                className="flex items-center gap-2 bg-maroon-700 hover:bg-maroon-800 text-white font-heading text-xs tracking-widest uppercase px-4 py-2.5 transition-colors">
                <Plus size={13} /> New Post
              </button>
            </div>

            {showPostForm && (
              <div className="bg-white border border-maroon-200 shadow-sm p-6 mb-6">
                <h3 className="font-heading text-lg uppercase text-maroon-900 mb-4">Post as Ben Galvan</h3>
                <input type="text" placeholder="Post title..." value={postForm.title} onChange={e => setPostForm({...postForm, title: e.target.value})}
                  className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm mb-3" />
                <textarea placeholder="Post content..." value={postForm.body} onChange={e => setPostForm({...postForm, body: e.target.value})}
                  rows={4} className="w-full border border-gray-300 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm resize-none mb-3" />
                <label className="flex items-center gap-2 text-sm text-gray-600 mb-3 cursor-pointer">
                  <input type="checkbox" checked={postForm.pinned} onChange={e => setPostForm({...postForm, pinned: e.target.checked})} className="accent-maroon-700" />
                  Pin this post to the top
                </label>
                <div className="flex gap-2">
                  <button onClick={handleAddPost} disabled={savingPost}
                    className="flex items-center gap-2 bg-maroon-700 hover:bg-maroon-800 disabled:opacity-60 text-white font-heading text-xs tracking-widest uppercase px-5 py-2.5 transition-colors">
                    {savingPost ? <><RefreshCw size={11} className="animate-spin" /> Posting...</> : 'Post'}
                  </button>
                  <button onClick={() => setShowPostForm(false)} className="text-gray-500 text-xs font-heading tracking-widest uppercase px-4 py-2.5 hover:text-gray-700">Cancel</button>
                </div>
              </div>
            )}

            {loading ? (
              <div className="text-center py-12 text-gray-400"><RefreshCw size={20} className="animate-spin mx-auto" /></div>
            ) : posts.length === 0 ? (
              <div className="bg-white border border-gray-200 shadow-sm p-12 text-center text-gray-400">
                <p className="font-heading text-lg uppercase">No posts yet</p>
                <p className="text-sm mt-1">Click "Seed Welcome Posts" on the Overview tab to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {posts.map(post => (
                  <div key={post.id} className={`bg-white border shadow-sm p-5 ${post.pinned ? 'border-maroon-200' : 'border-gray-200'}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          {post.pinned && <span className="bg-maroon-100 text-maroon-700 text-xs font-heading tracking-wide uppercase px-2 py-0.5">Pinned</span>}
                          <span className="font-heading text-sm uppercase text-maroon-900">{post.title}</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{post.author_name} · {post.likes} likes</div>
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{post.body}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button onClick={() => handleTogglePin(post)} title={post.pinned ? 'Unpin' : 'Pin'}
                          className={`transition-colors ${post.pinned ? 'text-maroon-700' : 'text-gray-400 hover:text-maroon-700'}`}>
                          <Pin size={15} />
                        </button>
                        <button onClick={() => handleDeletePost(post.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
