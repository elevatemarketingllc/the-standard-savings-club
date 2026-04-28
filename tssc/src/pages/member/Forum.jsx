import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { ChevronLeft, MessageSquare, Plus, ThumbsUp, ChevronDown, ChevronUp, RefreshCw, Trash2 } from 'lucide-react'

function TimeAgo({ date }) {
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(mins / 60)
  const days = Math.floor(hours / 24)
  if (mins < 1) return <span>Just now</span>
  if (mins < 60) return <span>{mins}m ago</span>
  if (hours < 24) return <span>{hours}h ago</span>
  return <span>{days}d ago</span>
}

function ReplyForm({ onSubmit, onCancel }) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  return (
    <div className="mt-3">
      <textarea value={text} onChange={e => setText(e.target.value)}
        placeholder="Write a reply..." rows={3}
        className="w-full border border-gray-200 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm resize-none" />
      <div className="flex gap-2 mt-2">
        <button onClick={async () => {
          if (!text.trim()) return
          setLoading(true)
          await onSubmit(text)
          setText('')
          setLoading(false)
        }}
          disabled={loading}
          className="bg-maroon-700 hover:bg-maroon-800 disabled:opacity-60 text-white font-heading text-xs tracking-widest uppercase px-4 py-2 transition-colors flex items-center gap-1">
          {loading && <RefreshCw size={11} className="animate-spin" />} Post Reply
        </button>
        <button onClick={onCancel} className="text-gray-500 text-xs font-heading tracking-widest uppercase px-4 py-2 hover:text-gray-700">Cancel</button>
      </div>
    </div>
  )
}

function Post({ post, user, profile, onReply, onDelete }) {
  const [expanded, setExpanded] = useState(post.pinned)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replies, setReplies] = useState([])
  const [loadingReplies, setLoadingReplies] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes || 0)
  const isAuthor = user?.id === post.user_id

  const handleDeletePost = async () => {
    if (!window.confirm('Delete this post?')) return
    await supabase.from('forum_posts').delete().eq('id', post.id)
    onDelete?.(post.id)
  }

  const handleDeleteReply = async (replyId) => {
    if (!window.confirm('Delete this reply?')) return
    await supabase.from('forum_replies').delete().eq('id', replyId)
    setReplies(r => r.filter(reply => reply.id !== replyId))
  }

  useEffect(() => {
    if (expanded && replies.length === 0) loadReplies()
  }, [expanded])

  const loadReplies = async () => {
    setLoadingReplies(true)
    const { data } = await supabase
      .from('forum_replies')
      .select('*')
      .eq('post_id', post.id)
      .order('created_at', { ascending: true })
    if (data) setReplies(data)
    setLoadingReplies(false)
  }

  const handleLike = async () => {
    if (liked) return
    setLiked(true)
    setLikeCount(c => c + 1)
    await supabase.from('forum_posts').update({ likes: likeCount + 1 }).eq('id', post.id)
  }

  const handleReply = async (text) => {
    const name = profile?.first_name || user?.email?.split('@')[0] || 'Member'
    const avatar = profile?.avatar || '😊'
    const { data } = await supabase.from('forum_replies').insert({
      post_id: post.id, user_id: user.id, author_name: name, author_avatar: avatar, body: text
    }).select().single()
    if (data) setReplies(r => [...r, data])
    setShowReplyForm(false)
  }

  return (
    <div className={`bg-white border shadow-sm ${post.pinned ? 'border-maroon-200' : 'border-gray-200'}`}>
      {post.pinned && <div className="bg-maroon-700 text-white text-xs font-heading tracking-widest uppercase px-4 py-1.5">📌 Pinned</div>}
      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 bg-maroon-50 border border-maroon-100 rounded-full flex-shrink-0 flex items-center justify-center text-xl">
            {post.author_avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm text-maroon-900">{post.author_name}</span>
              <span className="text-xs text-gray-400"><TimeAgo date={post.created_at} /></span>
            </div>
            <h3 className="font-heading text-base uppercase text-maroon-900 mt-0.5">{post.title}</h3>
          </div>
          <button onClick={() => setExpanded(!expanded)} className="text-gray-400 hover:text-gray-600">
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {expanded && (
          <>
            <p className="text-gray-700 text-sm leading-relaxed mb-4 ml-12">{post.body}</p>
            <div className="ml-12 flex items-center gap-4">
              <button onClick={handleLike} className={`flex items-center gap-1 text-xs transition-colors ${liked ? 'text-maroon-700' : 'text-gray-500 hover:text-maroon-700'}`}>
                <ThumbsUp size={13} /> {likeCount}
              </button>
              <button onClick={() => setShowReplyForm(!showReplyForm)} className="text-xs text-maroon-700 hover:text-maroon-900 font-heading tracking-wide uppercase">
                Reply
              </button>
              {replies.length > 0 && <span className="text-xs text-gray-400">{replies.length} {replies.length === 1 ? 'reply' : 'replies'}</span>}
            </div>

            {loadingReplies && <div className="ml-12 mt-3 text-xs text-gray-400">Loading replies...</div>}

            {replies.length > 0 && (
              <div className="ml-12 mt-4 space-y-3 border-l-2 border-gray-100 pl-4">
                {replies.map(reply => (
                  <div key={reply.id} className="flex items-start gap-2">
                    <div className="w-7 h-7 bg-maroon-50 border border-maroon-100 rounded-full flex-shrink-0 flex items-center justify-center text-base">
                      {reply.author_avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-maroon-900">{reply.author_name}</span>
                        <span className="text-xs text-gray-400"><TimeAgo date={reply.created_at} /></span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mt-0.5">{reply.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showReplyForm && (
              <div className="ml-12 mt-4">
                <ReplyForm onSubmit={handleReply} onCancel={() => setShowReplyForm(false)} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default function Forum() {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])

  const handleDeletePost = (id) => setPosts(p => p.filter(post => post.id !== id))
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showNewPost, setShowNewPost] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newBody, setNewBody] = useState('')
  const [posting, setPosting] = useState(false)

  useEffect(() => {
    loadPosts()
    loadProfile()
  }, [])

  const loadPosts = async () => {
    const { data } = await supabase
      .from('forum_posts')
      .select('*')
      .order('pinned', { ascending: false })
      .order('created_at', { ascending: false })
    if (data) setPosts(data)
    setLoading(false)
  }

  const loadProfile = async () => {
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    if (data) setProfile(data)
  }

  const handleNewPost = async () => {
    if (!newTitle.trim() || !newBody.trim()) return
    setPosting(true)
    const name = profile?.first_name || user?.email?.split('@')[0] || 'Member'
    const avatar = profile?.avatar || '😊'
    const { data } = await supabase.from('forum_posts').insert({
      user_id: user.id, author_name: name, author_avatar: avatar, title: newTitle, body: newBody
    }).select().single()
    if (data) setPosts(p => [data, ...p])
    setNewTitle('')
    setNewBody('')
    setShowNewPost(false)
    setPosting(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-maroon-900 text-white py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/member" className="flex items-center gap-1 text-maroon-300 hover:text-white text-xs font-heading tracking-widest uppercase mb-4 transition-colors">
            <ChevronLeft size={14} /> Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-3xl sm:text-4xl uppercase font-bold">Member Forum</h1>
              <p className="text-maroon-300 text-sm mt-1">Connect, share deals, and get to know your fellow members</p>
            </div>
            <button onClick={() => setShowNewPost(!showNewPost)}
              className="flex items-center gap-2 bg-white text-maroon-900 hover:bg-gray-100 font-heading text-xs tracking-widest uppercase px-4 py-2 transition-colors">
              <Plus size={14} /> New Post
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {showNewPost && (
          <div className="bg-white border border-maroon-200 shadow-sm p-6 mb-6">
            <h3 className="font-heading text-lg uppercase text-maroon-900 mb-4">Create New Post</h3>
            <input type="text" placeholder="Post title..." value={newTitle} onChange={e => setNewTitle(e.target.value)}
              className="w-full border border-gray-200 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm mb-3" />
            <textarea placeholder="What's on your mind?" value={newBody} onChange={e => setNewBody(e.target.value)}
              rows={4} className="w-full border border-gray-200 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm resize-none mb-3" />
            <div className="flex gap-2">
              <button onClick={handleNewPost} disabled={posting}
                className="bg-maroon-700 hover:bg-maroon-800 disabled:opacity-60 text-white font-heading text-xs tracking-widest uppercase px-5 py-2.5 transition-colors flex items-center gap-1">
                {posting && <RefreshCw size={11} className="animate-spin" />} Post
              </button>
              <button onClick={() => setShowNewPost(false)} className="text-gray-500 text-xs font-heading tracking-widest uppercase px-4 py-2.5 hover:text-gray-700">Cancel</button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 text-gray-400">
            <RefreshCw size={24} className="animate-spin mx-auto mb-3" />
            <p className="font-heading text-sm uppercase tracking-widest">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <MessageSquare size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-heading text-lg uppercase">No posts yet</p>
            <p className="text-sm mt-1">Be the first to post something!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map(post => <Post key={post.id} post={post} user={user} profile={profile} onReply={() => {}} />)}
          </div>
        )}

        <div className="mt-8 text-center text-xs text-gray-400 font-heading tracking-widest uppercase">
          <MessageSquare size={14} className="inline mr-1" />
          Keep it positive and supportive
        </div>
      </div>
    </div>
  )
}
