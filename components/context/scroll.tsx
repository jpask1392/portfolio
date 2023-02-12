
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useMotionValue } from "framer-motion"

export const ScrollContext = createContext<any>({
  scroll: null,
});

/**
 * Context provider needs to be added within 
 * _app.js so that it gets destroyed and rebuilt 
 * on page changes.
 * 
 * @param param0 
 * @returns 
 */
export function ScrollContextProvider({ children } : { children: any }) {
  const [scroll, setScroll] = useState<any>(null)
  const containerRef = useRef(null);
  const pageTransitionDuration = 800; // miliseconds

  useEffect(() => {
    if (!scroll) {
      (async () => {
        try {
          const LocomotiveScroll = (await import('locomotive-scroll' as any)).default

          setTimeout(() => {
            setScroll(
              new LocomotiveScroll({
                el: containerRef.current,
                smooth: true,
                multiplier: 0.3,
              })
            )
          }, pageTransitionDuration + 200)
          
        } catch (error) {
          throw Error(`[SmoothScrollProvider]: ${error}`)
        }
      })()
    }

    return () => {
      scroll && scroll.destroy()
    }
  }, [scroll])

  return (
    <ScrollContext.Provider value={{ 
      scroll: scroll,
    }}>
      <motion.div 
        data-scroll-container
        id="main-scroll-wrapper"
        ref={containerRef} 
        className="min-h-[100vh] w-full absolute"
        initial={{ opacity: 1, top: 1100, zIndex: 1 }}
        animate={{ 
          top: 0,
        }}
        exit={{ opacity: 0, top: -200, zIndex: -1, }}
        transition={{ 
          ease: [0.2, 0.99, 0.11, 0.99],
          duration: pageTransitionDuration / 1000,
          
        }}
      >
        {children}
      </motion.div>
    </ScrollContext.Provider>
  );
}

export function useScrollContext() {
  return useContext(ScrollContext);
}
