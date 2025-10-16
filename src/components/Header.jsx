import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { scrollToElement } from '../utils/scrollUtils'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false)
    
    // If we're on a product page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/')
      // Wait longer on mobile for navigation to complete
      setTimeout(() => {
        scrollToElement(sectionId)
      }, 150)
    } else {
      // Immediate scroll on same page
      scrollToElement(sectionId)
    }
  }

  return (
    <header className="w-full bg-white shadow-md py-4">
      <div className="max-w-[1200px] mx-auto px-5">
        <nav className="flex justify-between items-center relative">
          <Link to="/" className="no-underline">
            <h2 className="text-primary text-2xl font-bold m-0">🐴 Redneck Feeds LLC</h2>
          </Link>
          
          <div className={`md:flex md:gap-8 md:items-center ${isMenuOpen ? 'flex' : 'hidden'} flex-col md:flex-row bg-white md:bg-transparent text-center md:text-left transition-all py-8 md:py-0 shadow-md md:shadow-none absolute left-0 right-0 top-full md:static`}>
            <a onClick={() => scrollToSection('hero')} className="text-gray-800 no-underline font-medium transition-colors hover:text-primary cursor-pointer text-xl md:text-base">Home</a>
            <a onClick={() => scrollToSection('about')} className="text-gray-800 no-underline font-medium transition-colors hover:text-primary cursor-pointer text-xl md:text-base">About</a>
            <a onClick={() => scrollToSection('products')} className="text-gray-800 no-underline font-medium transition-colors hover:text-primary cursor-pointer text-xl md:text-base">Categories</a>
            <a onClick={() => scrollToSection('contact')} className="text-gray-800 no-underline font-medium transition-colors hover:text-primary cursor-pointer text-xl md:text-base">Contact</a>
          </div>

          <button className="md:hidden flex flex-col gap-1 bg-transparent border-none cursor-pointer p-0" onClick={toggleMenu}>
            <span className="w-6 h-0.5 bg-primary transition-all"></span>
            <span className="w-6 h-0.5 bg-primary transition-all"></span>
            <span className="w-6 h-0.5 bg-primary transition-all"></span>
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
