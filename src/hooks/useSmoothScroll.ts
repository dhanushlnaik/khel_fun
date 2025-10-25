import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useSmoothScroll = () => {
  useEffect(() => {
    // Smooth scroll configuration
    const smoothScroll = () => {
      let scrollY = window.scrollY;
      let targetScrollY = scrollY;
      
      const updateScroll = () => {
        scrollY += (targetScrollY - scrollY) * 0.1;
        
        if (Math.abs(targetScrollY - scrollY) < 0.1) {
          scrollY = targetScrollY;
        }
        
        window.scrollTo(0, scrollY);
        
        if (scrollY !== targetScrollY) {
          requestAnimationFrame(updateScroll);
        }
      };
      
      window.addEventListener('scroll', () => {
        targetScrollY = window.scrollY;
        requestAnimationFrame(updateScroll);
      }, { passive: true });
    };

    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};

export default useSmoothScroll;
