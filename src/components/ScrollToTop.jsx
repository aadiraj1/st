import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const scrollToHashElement = (hashStr) => {
  if (!hashStr) return;
  const id = hashStr.replace('#', '');
  
  const attemptScroll = () => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = Math.max(0, elementPosition - navHeight);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      return true;
    }
    return false;
  };

  // Immediate attempt
  if (!attemptScroll()) {
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (attemptScroll() || attempts >= 30) {
        clearInterval(interval);
      }
    }, 100);
  }
};

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      scrollToHashElement(hash);
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

