import { motion } from "framer-motion";
import useIsomorphicLayoutEffect from "@/components/hooks/useIsomorphicLayoutEffect";
import type { SbBlokData } from "@storyblok/react";
import { useRef, useState } from "react";
import ReviewTile from "./ReviewTile";

interface Props {
  reviews: {
    content: {
      author: string
      body: string
      jobTitle: string
      rating: number
    }
  }[]
}

interface Blok extends SbBlokData, Props {}

interface ReviewsProps extends Props {
  children?: any
  blok?: Blok
}

const ReviewsCarousel: React.FC<ReviewsProps> = (props) => {
  const {
    reviews
  } = props.blok || props;

  const trackRef = useRef<any | null>(null);
  const constraintsRef = useRef<HTMLDivElement | null>(null)
  const [ drag, setDrag ] = useState(0);

  const handleResize = () => {
    if (!trackRef.current || !constraintsRef.current) return;
    setDrag(0 - Math.abs(trackRef.current.scrollWidth - constraintsRef.current.clientWidth))
  }

  useIsomorphicLayoutEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="relative" ref={constraintsRef}>
      {/* <div className="absolute inset-0 flex z-10">
        <button onClick={() => handleClick("prev")} className="w-1/2 bg-slate-300">Prev</button>
        <button onClick={() => handleClick("next")} className="w-1/2 bg-slate-800">Next</button>
      </div> */}

      <motion.ul
        ref={trackRef} 
        className="flex -mx-3 cursor-grab" 
        drag="x"
        dragConstraints={{ left: drag, right: 0 }}
      >
        {
          reviews.map(({ content }, i) => {
            return (
              <li className="w-full md:w-1/2 2xl:w-1/3 flex-shrink-0 px-3" key={i}>
                <ReviewTile {...content} />
              </li>
            )
          })
        }
      </motion.ul>
    </div>
  )
}

export default ReviewsCarousel