import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollOptions {
  top: number;
  behavior: ScrollBehavior;
}

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    const scrollOptions: ScrollOptions = {
      top: 0,
      behavior: 'smooth'
    };
    
    window.scrollTo(scrollOptions);
  }, [pathname]);
  
  return null;
};

export default ScrollToTop; 