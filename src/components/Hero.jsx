import heroImage from '../assets/hero.png'

function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToProducts = () => {
    const element = document.getElementById('products')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative" id="hero" style={{backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="max-w-[1200px] mx-auto px-5 relative z-10 text-center text-white">
        <h1 className="text-5xl md:text-6xl mb-6 text-white drop-shadow-lg leading-tight">
          Redneck Feeds LLC Grain Delivery
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-white/95 max-w-[700px] mx-auto drop-shadow-md">
          Providing premium feed and grain solutions to farms and ranches across Kitsap and Mason Counties. 
          Fast delivery, competitive prices, and reliable service you can count on.
        </p>
        <div className="flex gap-6 justify-center flex-wrap">
          <button 
            className="px-8 py-3 rounded-lg border-none text-base font-semibold cursor-pointer transition-all bg-primary text-white hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-lg"
            onClick={scrollToProducts}
          >
            View Products
          </button>
          <button 
            className="px-8 py-3 rounded-lg border-2 border-white text-base font-semibold cursor-pointer transition-all bg-transparent text-white hover:bg-white hover:text-primary"
            onClick={scrollToContact}
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
