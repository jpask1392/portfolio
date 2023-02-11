import cn from "classnames";
import { motion, useMotionValue } from "framer-motion"
import { use, useEffect, useState } from "react";
import { useScrollContext } from "@/components/context/scroll";

interface Props {
  location: string 
}

const PageProgress: React.FC<Props> = ({
  location
}) => {
  const { scroll } = useScrollContext();
  const [ progress, setProgress ] = useState(0);
  
  useEffect(() => {
    if (!scroll) return;

    scroll.on("scroll", ({ limit, scroll, delta }: any) => {
      setProgress((delta.y / limit.y) * 100)
    })
  }, [scroll])

  return (
    <span 
      className={cn("w-2.5 border-black fixed inset-y-0", {
        "right-0 border-l" : location === "right",
        "left-0 border-r" : location === "left"
      })}
      data-scroll-sticky 
      data-scroll-target="main-scroll-wrapper"
    >
      <motion.span 
        className="bg-black absolute bottom-0 w-full h-full origin-bottom" 
        animate={{ 
          scaleY: `${progress}%`
        }} 
      />
    </span>
  )
}

export default PageProgress;