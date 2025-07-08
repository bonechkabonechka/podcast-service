// hooks/useScrollNavigation.js
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useScrollNavigation = () => {
  const [pageStep, setPageStep] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const containerRef = useRef(null); // Референс для контейнера со скроллом

  useEffect(() => {
    setPageStep(0)
  }, [location.pathname])

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault(); // Отключаем обычный скролл
      if (isScrolling) return

      const delta = e.deltaY; 
      const currentPath = location.pathname;

      const scrollThreshold = 50;
      
      if (Math.abs(delta) < scrollThreshold) {
        return;
      }

      if (delta > 0) {
            if (currentPath === '/') {
                setIsScrolling(true)
                navigate('/help')
                setPageStep(0)
                setTimeout(() => setIsScrolling(false), 300);
            } else if (currentPath === '/help') {
                if (pageStep === 0) {
                    setPageStep(1)
                } else if (pageStep === 1) {
                    setIsScrolling(true)
                    navigate('/features')
                    setPageStep(0)
                    setTimeout(() => setIsScrolling(false), 300);
                }
            } else if (currentPath === '/features') {
                if (pageStep === 0) {
                    setPageStep(1)
                } else if (pageStep === 1) {
                    setIsScrolling(true)
                    navigate('/podcasts')
                    setPageStep(0)
                    setTimeout(() => setIsScrolling(false), 300);
                }
            } else if (currentPath === '/podcasts/english') {
                if (pageStep === 0) {
                    setPageStep(1)
                } else if (pageStep === 1) {
                    setIsScrolling(true)
                    navigate('/podcasts/russian')
                    setPageStep(0)
                    setTimeout(() => setIsScrolling(false), 300);
                }
            } else if (currentPath === '/podcasts/russian') {
                if (pageStep === 0) {
                    setPageStep(1)
                } else if (pageStep === 1) {
                    setIsScrolling(true)
                    navigate('/podcasts/chinese')
                    setPageStep(0)
                    setTimeout(() => setIsScrolling(false), 300);
                }
            }
      } else {
        if (currentPath === '/help') {
            if (pageStep === 1) {
                setPageStep(0)
            } else if (pageStep === 0) {
                setIsScrolling(true)
                navigate('/')
                setPageStep(0)
                setTimeout(() => setIsScrolling(false), 300);
            }
        } else if (currentPath === '/features') {
            if (pageStep === 1) {
                setPageStep(0)
            } else if (pageStep === 0) {
                setIsScrolling(true)
                navigate('/help')
                setPageStep(0)
                setTimeout(() => setIsScrolling(false), 300);
            }

        } else if (currentPath === '/podcasts/english') {
            if (pageStep === 1) {
                setPageStep(0)
            } else if (pageStep === 0) {
                setIsScrolling(true)
                navigate('/features')
                setPageStep(0)
                setTimeout(() => setIsScrolling(false), 300);
            } 
        } else if (currentPath === '/podcasts/russian') {
            if (pageStep === 0) {
                setPageStep(1)
            } else if (pageStep === 1) {
                setIsScrolling(true)
                navigate('/podcasts/english')
                setPageStep(0)
                setTimeout(() => setIsScrolling(false), 300);
            }
        } else if (currentPath === '/podcasts/chinese') {
            if (pageStep === 0) {
                setPageStep(1)
            } else if (pageStep === 1) {
                setIsScrolling(true)
                navigate('/podcasts/russian')
                setPageStep(0)
                setTimeout(() => setIsScrolling(false), 300);
            }
        }   
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [pageStep, isScrolling, navigate, location.pathname]);

  return { containerRef, pageStep, isScrolling };
};