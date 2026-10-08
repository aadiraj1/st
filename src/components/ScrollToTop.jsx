import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const scrollToHashElement = (hashStr, delay = 0) => {
  if (!hashStr) return;
  let id = hashStr.replace('#', '');

  const executeScroll = () => {
    let attempts = 0;
    const attemptScroll = () => {
      // If dealer-map is targeted, aim directly at the search bar target
      let element = null;
      if (id === 'dealer-map') {
        element = document.getElementById('dealer-search-target') || document.getElementById('dealer-map');
      } else {
        element = document.getElementById(id);
      }

      if (element) {
        const nav = document.querySelector('nav');
        const navHeight = nav ? nav.getBoundingClientRect().height : (window.innerWidth < 768 ? 64 : 80);
        // Small buffer so the search bar sits comfortably right below the fixed navbar
        const buffer = 16;
        const rect = element.getBoundingClientRect();
        const targetScrollY = window.pageYOffset + rect.top - navHeight - buffer;

        window.scrollTo({
          top: Math.max(0, targetScrollY),
          behavior: 'smooth'
        });
        return true;
      }
      return false;
    };

    // First immediate check
    if (!attemptScroll()) {
      const interval = setInterval(() => {
        attempts++;
        if (attemptScroll() || attempts >= 30) {
          clearInterval(interval);
        }
      }, 100);
    }
  };

  if (delay > 0) {
    setTimeout(executeScroll, delay);
  } else {
    executeScroll();
  }
};

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Small timeout to allow homepage components to mount when coming from another page
      const timer = setTimeout(() => {
        scrollToHashElement(hash);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;

