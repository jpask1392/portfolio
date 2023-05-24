import Link from "next/link";
import { motion, useMotionValue } from "framer-motion";
import useIsomorphicLayoutEffect from "@/components/hooks/useIsomorphicLayoutEffect";
import type { SbBlokData } from "@storyblok/react";
import { useEffect, useRef, useState } from "react";
import ReviewTile from "./ReviewTile";

interface Props {
  reviews: {
    content: {
      author: string
      body: string
      jobTitle: string
      rating: number
      title: string
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

  useEffect(() => {
    let timeoutId: any = null;
    const handleResize = () => {
      if (!constraintsRef.current || !trackRef.current) return;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => 
        setDrag(trackRef.current.scrollWidth - (constraintsRef.current?.clientWidth || 0)), 
      500);
    }

    handleResize();
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div 
      ref={constraintsRef}
      className="relative overflow-x-hidden pb-2 md:pb-0 md:overflow-visible" 
    >
      <nav className="mb-6 flex space-x-2">
        <Link 
          href="/about" 
          className="bg-white hover:bg-black hover:text-white text-black uppercase font-medium px-2.5 py-0.5 border border-black rounded font-header"
        >About me</Link>
        <Link
          href="/work" 
          className="bg-white hover:bg-black hover:text-white text-black uppercase font-medium px-2.5 py-0.5 border border-black rounded font-header"
        >Projects</Link>
        <a 
          href="mailto:contact@jamiepask.com"
          className="bg-white hover:bg-black hover:text-white text-black uppercase font-medium px-2.5 py-0.5 border border-black rounded font-header"
        >Contact Me</a>
      </nav>
      <motion.ul
        ref={trackRef}
        className="flex -mx-3 cursor-grab" 
        drag="x"
        dragConstraints={{ 
          left: - drag, 
          right: 0 
        }}
      >
        {
          reviews.map(({ content }, i) => {
            return (
              <li className="w-[90%] md:w-1/2 2xl:w-1/3 flex-shrink-0 px-3" key={i}>
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