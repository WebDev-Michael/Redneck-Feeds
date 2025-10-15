import { Link, useLocation, useNavigate } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()
  const location = useLocation()
  const navigate = useNavigate()

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className="bg-dark-bg text-white pt-12 pb-4">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="text-center md:text-left">
            <h3 className="text-white mb-4 text-2xl font-bold">🌾 Redneck Feeds</h3>
            <p className="text-white/80 leading-relaxed">Your trusted partner for quality agricultural grain delivery.</p>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-secondary mb-4 text-xl font-bold">Quick Links</h4>
            <ul className="list-none p-0">
              <li className="mb-2">
                <a onClick={() => scrollToSection('hero')} className="text-white/80 no-underline transition-colors hover:text-secondary cursor-pointer">Home</a>
              </li>
              <li className="mb-2">
                <a onClick={() => scrollToSection('about')} className="text-white/80 no-underline transition-colors hover:text-secondary cursor-pointer">About</a>
              </li>
              <li className="mb-2">
                <a onClick={() => scrollToSection('products')} className="text-white/80 no-underline transition-colors hover:text-secondary cursor-pointer">Products</a>
              </li>
              <li className="mb-2">
                <a onClick={() => scrollToSection('contact')} className="text-white/80 no-underline transition-colors hover:text-secondary cursor-pointer">Contact</a>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-secondary mb-4 text-xl font-bold">Contact</h4>
            <ul className="list-none p-0">
              <li className="mb-2 text-white/80">📞 (253) 313-8107</li>
              <li className="mb-2 text-white/80">📱 Text us anytime</li>
              <li className="mb-2 text-white/80">🕒 Mon-Fri: 7am - 6pm</li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-secondary mb-4 text-xl font-bold">Payment</h4>
            <p className="text-white/80 leading-relaxed">We accept all major payment methods through Pay Anywhere.</p>
            <div className="text-4xl mt-2">💳</div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white/60 text-sm">&copy; {currentYear} Redneck Feeds. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
