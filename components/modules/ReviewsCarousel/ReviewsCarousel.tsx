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
      className="relative pb-2 md:pb-0" 
    >
      <nav className="mb-4 flex space-x-6">
        <Link 
          href="/about" 
          className="font-header underline uppercase"
        >About me</Link>
        <Link
          href="/work" 
          className="font-header underline uppercase"
        >Projects</Link>
        <a 
          href="mailto:contact@jamiepask.com"
          className="font-header underline uppercase"
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
              <li className="w-[90%] md:w-full max-w-[450px] flex-shrink-0 px-3" key={i}>
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