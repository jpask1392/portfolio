import cn from "classnames";
import { motion, useMotionValue } from "framer-motion"
import { use, useEffect, useState } from "react";
import { useScrollContext } from "@/components/context/scroll";

const PageProgress = ({
  location
}) => {
  const { scroll } = useScrollContext();
  const [ progress, setProgress ] = useState(0);
  
  useEffect(() => {
    if (!scroll) return;
    scroll.on("scroll", ({limit, scroll}) => {
      setProgress((scroll.y / limit.y) * 100)
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
        className="bg-black absolute bottom-0 w-full" 
        animate={{ height: `${progress}%`}} 
        // transition={{ 
        //   type: 'spring',
        //   damping: 10,
        //   stiffness: 5,
        //   restDelta: 0.001
        // }}
      />
    </span>
  )
}

export default PageProgress;