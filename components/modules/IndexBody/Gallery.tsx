import { motion, useScroll } from "framer-motion";
import cn from "classnames"
import type { storyBlokImage } from "@/types/storyBlok";
import CustomImage from "@/components/ui/Image/CustomImage";
import { useRef, useEffect, useState } from "react";
import useIsomorphicLayoutEffect from "@/components/hooks/useIsomorphicLayoutEffect";


interface Props {
  images: storyBlokImage[]
}

const Gallery: React.FC<Props> = ({
  images
}) => {
  const [scroll, setScroll] = useState<any>(null)
  const carouselRef = useRef(null);
  // const { scrollXProgress } = useScroll({
  //   container: carouselRef,
  // });

  useEffect(() => {
    if (!scroll) {
      (async () => {
        try {
          const LocomotiveScroll = (await import('locomotive-scroll' as any)).default
          setScroll(
            new LocomotiveScroll({
              el: carouselRef.current,
              smooth: true,
              direction: "horizontal"
            })
          )
        } catch (error) {
          throw Error(`[SmoothScrollProvider]: ${error}`)
        }
      })()
    }

    return () => {
      scroll && scroll.destroy()
    }
  }, [scroll])

  // const variants = {
  //   show: {
  //     backgroundColor: "#f00"
  //   },
  //   hidden: {
  //     opacity:
  //     transition: { duration: 2 }
  //   }
  // }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 150 },
    show: { 
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.2, 0.99, 0.11, 0.99],
        duration: 1,
      }
     }
  }
 
  return (
    <div className="h-screen w-screen flex items-center" ref={carouselRef}>
      <section data-scroll-section className="min-w-[100vw] flex-shrink-0 h-[90vh]">
        <motion.div 
          className="flex p-12 space-x-20 items-start h-full" 
          variants={container}
          initial="hidden"
          animate={scroll ? "show" : "hidden"}
        >
          {
            images?.map((image, i) => {
              return (
                <motion.div 
                  data-scroll 
                  variants={item}
                  key={i} 
                  className={cn("flex-shrink-0 relative z-0 h-full", {
                    // "w-[380px]": i === 0,
                    // "w-[469px] self-end": i > 0 && (i === 1 || i % 3 === 0 || i % 5 === 0),
                    // "w-[457px]": i === 2
                  })}
                >
                  <CustomImage 
                    image={image} 
                    className="relative z-10 rounded-lg overflow-hidden h-full w-auto" 
                    sizes={{
                      sm: "100vw",
                      md: "40vw",
                      lg: "40vw",
                    }}
                  />
                  <span className="blur-lg absolute top-full left-1/2 -translate-x-1/2 -translate-y-[70%] w-[80%] aspect-square bg-gradient-radial from-black"/>
                </motion.div>
              )
            })
          }
        </motion.div>
      </section>
    </div>
  )
}

export default Gallery;