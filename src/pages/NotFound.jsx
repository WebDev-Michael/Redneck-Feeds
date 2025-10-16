import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

function NotFound() {
  return (
    <div className="min-h-screen bg-light-bg">
      <section className="min-h-[80vh] flex items-center justify-center bg-body-bg">
        <div className="max-w-[600px] mx-auto px-5 text-center">
          <div className="text-9xl mb-8">🌾</div>
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-600 mb-8">
            Looks like this page wandered off to the barn. Let's get you back on track!
          </p>
          <Link 
            to="/" 
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors no-underline"
          >
            Return Home
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

export default NotFound

