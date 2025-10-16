import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTop } from '../utils/scrollUtils';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use setTimeout to ensure scroll happens after render
    // This is especially important for mobile devices
    setTimeout(() => {
      scrollToTop();
    }, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;

