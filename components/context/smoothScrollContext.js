import React, { createContext, useEffect, useState, useContext } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRouter } from "next/router";


export const SmoothScrollContext = createContext({
  scroll: null,
})

export function useSmoothScrollContext() {
  return useContext(SmoothScrollContext);
}

export const SmoothScrollProvider = ({ children, options }) => {
  const [scroll, setScroll] = useState(null);
  const router = useRouter()

  /**
   * Reset the scroll container on route change
   */
  useEffect(() => {
    const handleRouteChange = (url) => {
      scroll && scroll.destroy();
      setScroll(null);
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    var resize;

    if (!scroll) {
      (async () => {
        try {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locoScroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]') ?? undefined,
            ...options,
          })

          // set up scrolltrigger
          locoScroll.on("scroll", () => ScrollTrigger.update());

          ScrollTrigger.scrollerProxy(".has-scroll-smooth [data-scroll-container]", {
            scrollTop(value) {
              return arguments.length 
                ? locoScroll.scrollTo(value, 0, 0) 
                : locoScroll.scroll.instance.scroll.y;
            }, 
            getBoundingClientRect() {
              return {
                top: 0, 
                left: 0, 
                width: window.innerWidth, 
                height: window.innerHeight
              };
            },
            // pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
          });

          // set the state
          setScroll(locoScroll)

          /**
           * If adding the event listener here, will need to remove on cleanup
           * 
           */
          ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
          ScrollTrigger.refresh();

          // add resize to remove on cleanup
          resize = () => {
            ScrollTrigger.refresh();
          }

          window.addEventListener("resize", resize);
          window.addEventListener("focus", resize);

        } catch (error) {
          throw Error(`[SmoothScrollProvider]: ${error}`)
        }
      })()
    }

    return () => {
      if (scroll) {
        scroll && scroll.destroy()
        // setScroll(null);
        window.removeEventListener("resize", resize);
        window.removeEventListener("focus", resize);
      }
    }
  }, [scroll])

  return (
    <SmoothScrollContext.Provider 
      value={{ scroll, gsap, ScrollTrigger }}
    >{children}</SmoothScrollContext.Provider>
  )
}

SmoothScrollContext.displayName = 'SmoothScrollContext'
SmoothScrollProvider.displayName = 'SmoothScrollProvider'