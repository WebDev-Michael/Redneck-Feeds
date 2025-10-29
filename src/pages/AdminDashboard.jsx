import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase/config'
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  query,
  where 
} from 'firebase/firestore'

function AdminDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    unit: '50 lb bag',
    category: 'cattle',
    inStock: true,
    imageUrl: ''
  })

  const categories = ['cattle', 'equine', 'poultry', 'swine', 'rabbit', 'sheep-goat', 'grains', 'misc']
  
  const categoryLabels = {
    cattle: 'Cattle',
    equine: 'Equine',
    poultry: 'Poultry',
    swine: 'Swine',
    rabbit: 'Rabbit',
    'sheep-goat': 'Sheep & Goat',
    grains: 'Grains',
    misc: 'Misc'
  }

  // Helper function to convert Imgur page URLs to direct image URLs
  const convertImgurUrl = (url) => {
    if (!url) return url
    const trimmed = url.trim()
    // Match imgur.com/[id] or www.imgur.com/[id]
    const imgurMatch = trimmed.match(/imgur\.com\/([a-zA-Z0-9]+)/)
    if (imgurMatch) {
      const imageId = imgurMatch[1]
      // Try .jpg first, as most Imgur images are jpg
      return `https://i.imgur.com/${imageId}.jpg`
    }
    return trimmed
  }

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  // Count products per category
  const productCounts = categories.reduce((acc, cat) => {
    acc[cat] = products.filter(p => p.category === cat).length
    return acc
  }, {})

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const productsSnapshot = await getDocs(collection(db, 'products'))
      const productsList = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      // Debug: Log products with imageUrl to verify data
      productsList.forEach(product => {
        if (product.imageUrl) {
          console.log('Product with image:', product.name, 'ImageURL:', product.imageUrl)
        }
      })
      setProducts(productsList)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
    setLoading(false)
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Failed to log out:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // Prepare data with trimmed and converted imageUrl
      const trimmedUrl = formData.imageUrl.trim()
      const productData = {
        ...formData,
        imageUrl: trimmedUrl ? convertImgurUrl(trimmedUrl) : ''
      }
      
      if (editingProduct) {
        // Update existing product
        const productRef = doc(db, 'products', editingProduct.id)
        await updateDoc(productRef, productData)
      } else {
        // Add new product
        await addDoc(collection(db, 'products'), {
          ...productData,
          createdAt: new Date()
        })
      }
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        unit: '50 lb bag',
        category: 'cattle',
        inStock: true,
        imageUrl: ''
      })
      setShowAddForm(false)
      setEditingProduct(null)
      fetchProducts()
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Failed to save product')
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      unit: product.unit,
      category: product.category,
      inStock: product.inStock,
      imageUrl: product.imageUrl || ''
    })
    setShowAddForm(true)
    // Scroll to top to show the edit form
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', productId))
        fetchProducts()
      } catch (error) {
        console.error('Error deleting product:', error)
        alert('Failed to delete product')
      }
    }
  }

  const cancelEdit = () => {
    setShowAddForm(false)
    setEditingProduct(null)
    setFormData({
      name: '',
      description: '',
      price: '',
      unit: '50 lb bag',
      category: 'cattle',
      inStock: true,
      imageUrl: ''
    })
  }

  return (
    <div className="min-h-screen bg-body-bg">
      {/* Header */}
      <div className="bg-primary text-white py-4 px-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-white/80">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with Add Product Button */}
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-primary">Product Management</h2>
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
            >
              + Add New Product
            </button>
          )}
        </div>

        {/* Category Filter */}
        {!showAddForm && (
          <div className="mb-8 bg-card-bg rounded-xl p-6 border border-accent/20">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <label className="text-gray-700 font-semibold">Filter by Category:</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  All ({products.length})
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === cat
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {categoryLabels[cat]} ({productCounts[cat] || 0})
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Product Form */}
        {showAddForm && (
          <div className="bg-card-bg rounded-xl p-6 mb-8 border border-accent/20">
            <h3 className="text-2xl font-bold text-primary mb-6">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Image URL</label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value.trim()})}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-gray-500 mt-1">Enter a URL to an image of the product</p>
                <p className="text-xs text-blue-600 mt-1">💡 For Imgur links, use direct image URLs: https://i.imgur.com/[id].jpg</p>
                {formData.imageUrl && (
                  <div className="mt-3">
                    <div className="rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center min-h-[200px]">
                      <img 
                        src={convertImgurUrl(formData.imageUrl)} 
                        alt="Preview"
                        className="w-full h-auto max-h-[300px] object-contain"
                        onError={(e) => {
                          // Try .png if .jpg fails
                          const currentSrc = e.target.src
                          if (currentSrc.endsWith('.jpg')) {
                            e.target.src = currentSrc.replace('.jpg', '.png')
                          } else {
                            e.target.style.display = 'none'
                          }
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="$45.99"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                  <input
                    type="text"
                    required
                    value={formData.unit}
                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="inStock" className="ml-2 text-sm font-medium text-gray-700">
                  In Stock
                </label>
              </div> */}

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 bg-card-bg rounded-xl border border-accent/20">
            <p className="text-xl text-gray-600">No products yet. Add your first product!</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-card-bg rounded-xl border border-accent/20">
            <p className="text-xl text-gray-600">No products in this category yet.</p>
            <p className="text-gray-500 mt-2">Try selecting a different category or add new products.</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              {selectedCategory !== 'all' && ` in ${categoryLabels[selectedCategory]}`}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
               <div key={product.id} className="bg-white rounded-xl p-6 border border-accent/20 hover:shadow-lg transition-shadow">
                 <div className="mb-4 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center min-h-[300px]">
                   {product.imageUrl && product.imageUrl.trim() !== '' ? (
                     <img 
                       src={convertImgurUrl(product.imageUrl.trim())} 
                       alt={product.name}
                       className="w-full h-auto max-h-[400px] object-contain"
                       loading="lazy"
                       onError={(e) => {
                         // Try .png if .jpg fails
                         const currentSrc = e.target.src
                         if (currentSrc.endsWith('.jpg')) {
                           e.target.src = currentSrc.replace('.jpg', '.png')
                         } else if (currentSrc.endsWith('.png')) {
                           e.target.src = currentSrc.replace('.png', '.gif')
                         } else {
                           e.target.onerror = null
                           e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="Arial" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage Error%3C/text%3E%3C/svg%3E'
                         }
                       }}
                     />
                   ) : (
                     <div className="w-full min-h-[300px] flex items-center justify-center bg-gray-100">
                       <span className="text-gray-400 text-sm">No image</span>
                     </div>
                   )}
                 </div>
                 <div className="mb-4">
                   <h3 className="text-xl font-bold text-primary">{product.name}</h3>
                   <p className="text-sm text-secondary font-semibold">{product.category}</p>
                 </div>
                 
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-lg font-bold text-secondary mb-2">{product.price}</p>
                <p className="text-sm text-gray-500 mb-4">{product.unit}</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard

