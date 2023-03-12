import GalleryNav from "./GalleryNav";
import { motion } from "framer-motion";
import { useScrollContext } from "@/components/context/scroll";
import cn from "classnames";
import CustomImage from "@/components/ui/Image/CustomImage";
import { useState, useRef } from "react";
import { storyBlokImage } from "@/types/storyBlok";

interface Props {
  images: storyBlokImage[]
  expanded: boolean
  setExpanded: any
  sectionRef: any
}

const ImageGallery: React.FC<Props> = ({
  images,
  expanded,
  setExpanded,
  sectionRef,
}) => {
  const { scroll } = useScrollContext();
  const [ hasExpanded, setHasExpanded ] = useState(false);
  const [ x, setX ] = useState(0);
  const [ activeImageIndex, setActiveImageIndex ] = useState(0);
  const imageRefs = useRef<HTMLDivElement[] | null[]>([]);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const constraintsRef = useRef<HTMLDivElement | null>(null);
  

  const handleClick = () => {
    if (!scroll && !document) return;
    if (window.innerWidth < 1068) return;
    let expandedCopy = !expanded;
    setExpanded(!expanded);
    setX(0);
    setActiveImageIndex(0);

    const pageChangeButton: HTMLDivElement | null = document.querySelector(".page-change-button");
    if (pageChangeButton) {
      pageChangeButton.style.display = expandedCopy ? "none" : "block"
    }

    setTimeout(() => {
      scroll.update()

      if (expandedCopy) {
        scroll.scrollTo(sectionRef.current, {
          duration: 700,
          callback: () => {
            scroll.stop()
          }
        })
      };

      if (!expandedCopy) {
        scroll.start()
      }

      setHasExpanded(expandedCopy)
    }, 700)
  }

  const handleArrowClick = (e: React.SyntheticEvent, direction: "prev" | "next") => {
    e.preventDefault();

    if (!trackRef.current || !constraintsRef.current) return;

    if (direction === "prev" && activeImageIndex > 0) {
      setActiveImageIndex(activeImageIndex - 1);
      let newX = Math.abs(x + (imageRefs.current[activeImageIndex - 1]?.clientWidth || 0));
      (activeImageIndex - 1 === 0) ? setX(0) : setX(- newX);
    }

    if (direction === "next" && activeImageIndex < imageRefs.current.length - 1) {
      setActiveImageIndex(activeImageIndex + 1);  
      let newX = Math.abs(x - (imageRefs.current[activeImageIndex]?.clientWidth || 0));
      if (newX > Math.abs(trackRef.current?.scrollWidth - (constraintsRef.current?.clientWidth || 0))) {
        setX(- Math.abs(trackRef.current?.scrollWidth - (constraintsRef.current?.clientWidth || 0)));  
      } else {
        setX(- newX);
      }
    }
  }

  return (
    <div className="relative group/menu" ref={constraintsRef}>
      <div className="overflow-auto md:overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex items-start space-x-1" 
          animate={{ x }}
          transition={{ duration: 0.3 }}
        >
          {
            images?.map((image, i) => {
              return (
                <div 
                  key={i}
                  ref={(ref) => imageRefs.current[i] = ref}
                  className={cn("flex-shrink-0 transition-all duration-700", {
                    "h-[350px]": !expanded,
                    "h-screen": expanded
                  })}
                >
                  {
                    hasExpanded ? (
                      <CustomImage
                        key={`image_${i}`}
                        className="h-full w-auto"
                        image={image}
                        sizes={{
                          sm: "100vw",
                          md: "70vw",
                          lg: "70vw"
                        }}
                      />
                    ) : (
                      <CustomImage 
                        key={`thumbnail_image_${i}`}
                        className="h-full w-auto"
                        image={image} 
                        maxWidth={600}
                      />
                    )
                  }
                  
                </div>
              )
            })
          }
        </motion.div>
      </div>
      
      <div className="hidden md:block transition-opacity group-hover/menu:opacity-100 opacity-0">
        <GalleryNav
          handleArrowClick={handleArrowClick}
          hasExpanded={hasExpanded}
          setHasExpanded={handleClick}
        />
      </div>
    </div>
  )
}

export default ImageGallery