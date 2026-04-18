import { Routes, Route } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// Public pages
import Home from './pages/Home'
import Join from './pages/Join'
import BusinessSignup from './pages/BusinessSignup'

// Auth pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

// Member pages (protected)
import Dashboard from './pages/member/Dashboard'
import VideoLibrary from './pages/member/VideoLibrary'
import Forum from './pages/member/Forum'
import Profile from './pages/member/Profile'

// Admin pages (protected)
import AdminDashboard from './pages/admin/AdminDashboard'
import BusinessDirectory from './pages/businesses/BusinessDirectory'
import BusinessPage from './pages/businesses/BusinessPage'
import BusinessPortal from './pages/business-portal/BusinessPortal'

// Layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ProtectedRoute from './components/layout/ProtectedRoute'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<Join />} />
          <Route path="/business" element={<BusinessSignup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Member portal - protected */}
          <Route path="/member" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/member/videos" element={<ProtectedRoute><VideoLibrary /></ProtectedRoute>} />
          <Route path="/member/forum" element={<ProtectedRoute><Forum /></ProtectedRoute>} />
          <Route path="/member/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* Admin - protected + admin role */}
          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          <Route path="/businesses" element={<BusinessDirectory />} />
          <Route path="/businesses/:slug" element={<BusinessPage />} />
          <Route path="/business-portal" element={<ProtectedRoute><BusinessPortal /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
