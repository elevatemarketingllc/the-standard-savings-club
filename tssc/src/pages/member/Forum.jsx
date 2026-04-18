import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { ChevronLeft, MessageSquare, Plus, ThumbsUp, ChevronDown, ChevronUp } from 'lucide-react'

const initialPosts = [
  {
    id: 1,
    author: 'Ben Galvan',
    avatar: 'B',
    title: 'Welcome to The Standard Savings Club Community!',
    body: 'Hey everyone — so stoked to have you here. This forum is your place to connect with other members, share deals you\'ve found, ask questions, and get to know each other. We\'re building something special in Boise and you\'re part of it. Introduce yourself below!',
    date: 'April 17, 2026',
    likes: 12,
    pinned: true,
    replies: [
      { id: 1, author: 'Spencer G', avatar: 'S', body: 'Super excited to be part of this community. Grabbed my first haircut discount already — already worth it!', date: 'April 17, 2026', likes: 4 },
    ],
  },
  {
    id: 2,
    author: 'Ben Galvan',
    avatar: 'B',
    title: 'This Week\'s Zoom — Wednesday 7PM',
    body: 'This Wednesday we\'ve got the team from Boise Bug Bombers joining us. Great guys, been in business for years and have some incredible stories about growing a service business in the Treasure Valley. Zoom link will be sent to your email Tuesday night. See you there!',
    date: 'April 16, 2026',
    likes: 8,
    pinned: false,
    replies: [],
  },
  {
    id: 3,
    author: 'Member',
    avatar: 'M',
    title: 'Best deal I\'ve found so far',
    body: 'Went to Cowboy Burger last night and showed my membership — the staff was super friendly about it. Great burger, great deal. Highly recommend if you haven\'t been yet.',
    date: 'April 15, 2026',
    likes: 6,
    pinned: false,
    replies: [
      { id: 1, author: 'Ben Galvan', avatar: 'B', body: 'Love to hear it! Cowboy Burger is the real deal. Their smash burger is my go-to.', date: 'April 15, 2026', likes: 3 },
    ],
  },
]

function ReplyForm({ onSubmit, onCancel }) {
  const [text, setText] = useState('')
  return (
    <div className="mt-3">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Write a reply..."
        rows={3}
        className="w-full border border-gray-200 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm resize-none"
      />
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => { if (text.trim()) { onSubmit(text); setText('') } }}
          className="bg-maroon-700 hover:bg-maroon-800 text-white font-heading text-xs tracking-widest uppercase px-4 py-2 transition-colors"
        >
          Post Reply
        </button>
        <button onClick={onCancel} className="text-gray-500 text-xs font-heading tracking-widest uppercase px-4 py-2 hover:text-gray-700">
          Cancel
        </button>
      </div>
    </div>
  )
}

function Post({ post, user, onLike, onReply }) {
  const [expanded, setExpanded] = useState(post.pinned)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const firstName = user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'Member'

  return (
    <div className={`bg-white border shadow-sm ${post.pinned ? 'border-maroon-200' : 'border-gray-200'}`}>
      {post.pinned && (
        <div className="bg-maroon-700 text-white text-xs font-heading tracking-widest uppercase px-4 py-1.5">
          📌 Pinned Post
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 bg-maroon-700 rounded-full flex-shrink-0 flex items-center justify-center">
            <span className="font-heading text-sm font-bold text-white">{post.avatar}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm text-maroon-900">{post.author}</span>
              <span className="text-xs text-gray-400">{post.date}</span>
            </div>
            <h3 className="font-heading text-base uppercase text-maroon-900 mt-0.5">{post.title}</h3>
          </div>
          <button onClick={() => setExpanded(!expanded)} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {expanded && (
          <>
            <p className="text-gray-700 text-sm leading-relaxed mb-4 ml-12">{post.body}</p>

            <div className="ml-12 flex items-center gap-4">
              <button onClick={() => onLike(post.id)} className="flex items-center gap-1 text-xs text-gray-500 hover:text-maroon-700 transition-colors">
                <ThumbsUp size={13} /> {post.likes}
              </button>
              <button onClick={() => setShowReplyForm(!showReplyForm)} className="text-xs text-maroon-700 hover:text-maroon-900 font-heading tracking-wide uppercase transition-colors">
                Reply
              </button>
              {post.replies.length > 0 && (
                <span className="text-xs text-gray-400">{post.replies.length} {post.replies.length === 1 ? 'reply' : 'replies'}</span>
              )}
            </div>

            {/* Replies */}
            {post.replies.length > 0 && (
              <div className="ml-12 mt-4 space-y-3 border-l-2 border-gray-100 pl-4">
                {post.replies.map(reply => (
                  <div key={reply.id} className="flex items-start gap-2">
                    <div className="w-7 h-7 bg-maroon-100 rounded-full flex-shrink-0 flex items-center justify-center">
                      <span className="font-heading text-xs font-bold text-maroon-700">{reply.avatar}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-maroon-900">{reply.author}</span>
                        <span className="text-xs text-gray-400">{reply.date}</span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mt-0.5">{reply.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showReplyForm && (
              <div className="ml-12 mt-4">
                <ReplyForm
                  onSubmit={(text) => { onReply(post.id, text, firstName); setShowReplyForm(false) }}
                  onCancel={() => setShowReplyForm(false)}
                />
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
  const [posts, setPosts] = useState(initialPosts)
  const [showNewPost, setShowNewPost] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newBody, setNewBody] = useState('')
  const firstName = user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'Member'

  const handleLike = (postId) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p))
  }

  const handleReply = (postId, text, author) => {
    setPosts(posts.map(p => p.id === postId ? {
      ...p,
      replies: [...p.replies, {
        id: p.replies.length + 1,
        author,
        avatar: author.charAt(0).toUpperCase(),
        body: text,
        date: 'Just now',
        likes: 0
      }]
    } : p))
  }

  const handleNewPost = () => {
    if (!newTitle.trim() || !newBody.trim()) return
    setPosts([{
      id: posts.length + 1,
      author: firstName,
      avatar: firstName.charAt(0).toUpperCase(),
      title: newTitle,
      body: newBody,
      date: 'Just now',
      likes: 0,
      pinned: false,
      replies: [],
    }, ...posts])
    setNewTitle('')
    setNewBody('')
    setShowNewPost(false)
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
            <button
              onClick={() => setShowNewPost(!showNewPost)}
              className="flex items-center gap-2 bg-white text-maroon-900 hover:bg-gray-100 font-heading text-xs tracking-widest uppercase px-4 py-2 transition-colors"
            >
              <Plus size={14} /> New Post
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* New post form */}
        {showNewPost && (
          <div className="bg-white border border-maroon-200 shadow-sm p-6 mb-6">
            <h3 className="font-heading text-lg uppercase text-maroon-900 mb-4">Create New Post</h3>
            <input
              type="text"
              placeholder="Post title..."
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="w-full border border-gray-200 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm mb-3"
            />
            <textarea
              placeholder="What's on your mind? Share a deal, ask a question, introduce yourself..."
              value={newBody}
              onChange={e => setNewBody(e.target.value)}
              rows={4}
              className="w-full border border-gray-200 focus:border-maroon-700 focus:outline-none px-4 py-3 text-sm resize-none mb-3"
            />
            <div className="flex gap-2">
              <button onClick={handleNewPost} className="bg-maroon-700 hover:bg-maroon-800 text-white font-heading text-xs tracking-widest uppercase px-5 py-2.5 transition-colors">
                Post
              </button>
              <button onClick={() => setShowNewPost(false)} className="text-gray-500 text-xs font-heading tracking-widest uppercase px-4 py-2.5 hover:text-gray-700">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Posts */}
        <div className="space-y-4">
          {posts.map(post => (
            <Post key={post.id} post={post} user={user} onLike={handleLike} onReply={handleReply} />
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-gray-400 font-heading tracking-widest uppercase">
          <MessageSquare size={14} className="inline mr-1" />
          This is your community — keep it positive and supportive
        </div>
      </div>
    </div>
  )
}
