import { Link } from 'react-router-dom'

function Categories() {
  const categories = [
    {
      id: 'cattle',
      name: 'Cattle',
      description: 'Premium feed solutions for beef and dairy cattle.',
      icon: '🐄',
      path: '/products/cattle'
    },
    {
      id: 'equine',
      name: 'Equine',
      description: 'Quality feed and supplements for horses and ponies.',
      icon: '🐴',
      path: '/products/equine'
    },
    {
      id: 'poultry',
      name: 'Poultry',
      description: 'Complete nutrition for chickens, turkeys, ducks and gamebirds.',
      icon: '🐔',
      path: '/products/poultry'
    },
    {
      id: 'swine',
      name: 'Swine',
      description: 'Specialized feed for pigs at all life stages.',
      icon: '🐷',
      path: '/products/swine'
    },
    {
      id: 'rabbit',
      name: 'Rabbit',
      description: 'Nutritious feed for rabbits and small livestock.',
      icon: '🐰',
      path: '/products/rabbit'
    },
    {
      id: 'sheep-goat',
      name: 'Sheep & Goat',
      description: 'Quality feed for sheep and goats of all ages.',
      icon: '🐑',
      path: '/products/sheep-goat'
    },
    {
      id: 'grains',
      name: 'Grains',
      description: 'Bulk grains and custom blends for all livestock.',
      icon: '🌾',
      path: '/products/grains'
    },
    {
      id: 'misc',
      name: 'Misc',
      description: 'Additional feed products and supplements.',
      icon: '📦',
      path: '/products/misc'
    }
  ]

  return (
    <section className="py-20" id="products">
      <div className="max-w-[1200px] mx-auto px-5">
        <h2 className="text-center text-4xl mb-5 text-primary font-bold">Feed Categories</h2>
        <p className="text-center text-xl text-gray-600 mb-16 max-w-[600px] mx-auto">
          Browse our selection by animal type. Click any category to view available products and pricing.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.path}
              className="rounded-xl overflow-hidden transition-all shadow-md hover:-translate-y-1 hover:shadow-2xl no-underline group border border-accent/20 bg-white"
            >
              <div className="bg-gradient-to-br from-primary to-secondary h-40 flex items-center justify-center text-7xl">
                {category.icon}
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-2xl mb-2 text-primary font-bold group-hover:text-primary-dark transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">{category.description}</p>
                <div className="mt-4 text-secondary font-semibold group-hover:translate-x-1 transition-transform inline-block">
                  View Products →
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center p-6 bg-white rounded-xl border border-accent/30">
          <p className="text-lg text-primary font-medium">
            💳 We accept all major payment methods through Pay Anywhere for your convenience.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Categories

