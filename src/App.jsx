import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import NotFound from './pages/NotFound'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <div className="w-full overflow-x-hidden">
          <Routes>
            {/* Public Routes with Header */}
            <Route path="/" element={<><Header /><HomePage /></>} />
            <Route path="/products/:category" element={<><Header /><ProductPage /></>} />
            
            {/* Admin Routes without Header */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            {/* 404 */}
            <Route path="*" element={<><Header /><NotFound /></>} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
