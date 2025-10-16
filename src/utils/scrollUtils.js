/**
 * Utility functions for smooth scrolling that work across all devices including mobile
 */

/**
 * Smooth scroll to top of page - works on all mobile devices
 */
export const scrollToTop = () => {
  // Try modern smooth scroll first
  try {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  } catch (error) {
    // Fallback for older browsers/iOS
    window.scrollTo(0, 0)
  }
}

/**
 * Smooth scroll to element by ID - works on all mobile devices
 * @param {string} elementId - The ID of the element to scroll to
 * @param {number} offset - Optional offset from top (default: 0)
 */
export const scrollToElement = (elementId, offset = 0) => {
  const element = document.getElementById(elementId)
  if (!element) return

  // Get element position relative to document
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
  const offsetPosition = elementPosition - offset

  // Try modern smooth scroll first
  try {
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  } catch (error) {
    // Fallback for older browsers/iOS - uses element.scrollIntoView
    try {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } catch (e) {
      // Final fallback - instant scroll
      element.scrollIntoView(true)
    }
  }
}

/**
 * Smooth scroll with callback - useful for navigation then scroll scenarios
 * @param {Function} callback - Function to execute after scroll
 * @param {number} delay - Delay before executing callback (default: 100ms)
 */
export const scrollWithCallback = (callback, delay = 100) => {
  setTimeout(() => {
    if (typeof callback === 'function') {
      callback()
    }
  }, delay)
}

