import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { db } from '../firebase/config'
import { collection, getDocs, query, where } from 'firebase/firestore'
import Footer from '../components/Footer'

function ProductPage() {
  const { category } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Category information
  const categoryInfo = {
    cattle: {
      name: 'Cattle',
      icon: '🐄',
      description: 'Premium feed solutions for beef and dairy cattle of all ages and stages.'
    },
    equine: {
      name: 'Equine',
      icon: '🐴',
      description: 'Quality feed and supplements designed for horses, ponies, and other equines.'
    },
    poultry: {
      name: 'Poultry',
      icon: '🐔',
      description: 'Complete nutrition for chickens, turkeys, ducks, and other poultry.'
    },
    swine: {
      name: 'Swine',
      icon: '🐷',
      description: 'Specialized feed formulated for pigs at all life stages.'
    },
    rabbit: {
      name: 'Rabbit',
      icon: '🐰',
      description: 'Nutritious feed for rabbits and small livestock.'
    },
    'sheep-goat': {
      name: 'Sheep & Goat',
      icon: '🐑',
      description: 'Quality feed for sheep and goats of all ages.'
    },
    grains: {
      name: 'Grains',
      icon: '🌾',
      description: 'Bulk grains and custom blends for all your livestock needs.'
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [category])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const q = query(collection(db, 'products'), where('category', '==', category))
      const querySnapshot = await getDocs(q)
      const productsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setProducts(productsList)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
    setLoading(false)
  }

  const currentCategory = categoryInfo[category] || { name: 'Products', icon: '🌾', description: 'Quality feed products.' }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-body-bg">
      {/* Category Hero */}
      <section className="bg-gradient-to-br from-primary to-secondary py-16">
        <div className="max-w-[1200px] mx-auto px-5">
          <Link 
            to="/#products" 
            onClick={scrollToTop}
            className="inline-flex items-center text-white/90 hover:text-white mb-6 no-underline font-medium transition-colors"
          >
            ← Back to Categories
          </Link>
          <div className="flex items-center gap-6 mb-4">
            <div className="text-8xl">{currentCategory.icon}</div>
            <div>
              <h1 className="text-5xl font-bold text-white mb-3">{currentCategory.name} Feed</h1>
              <p className="text-xl text-white/95">{currentCategory.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-3xl font-bold text-primary mb-8">Available Products</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl p-8 border border-accent/20">
              <p className="text-xl text-gray-600 mb-4">No products available in this category yet.</p>
              <p className="text-gray-500">Check back soon or contact us for availability!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-accent/20">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-primary mb-2">{product.name}</h3>
                    <p className="text-sm text-secondary font-semibold">{product.unit}</p>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-bold text-secondary">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 bg-gradient-to-br from-primary to-secondary rounded-xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Need Help Choosing?</h3>
            <p className="text-xl mb-6 max-w-[600px] mx-auto">
              Our team is here to help you select the perfect feed for your {currentCategory.name.toLowerCase()}.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="tel:2533138107" className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors no-underline">
                📞 Call (253) 313-8107
              </a>
              <a href="sms:2533138107" className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors no-underline">
                📱 Send a Text
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

export default ProductPage
