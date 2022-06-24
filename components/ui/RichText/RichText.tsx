import { SbEditableContent } from "@/types/storyBlok";
import useIsomorphicLayoutEffect from "@/components/hooks/useIsomorphicLayoutEffect";
import { render } from "storyblok-rich-text-react-renderer";
import { renderOptions } from "utils/constants";
import cn from "classnames";
import {useLayoutEffect, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import CustomEase from "gsap/dist/CustomEase";
import { useSmoothScrollContext } from "@/components/context/smoothScrollContext";

interface Props {
  align?: 'left' | 'center' | 'right'
  className?: string
  text?: string
  sbEditable?: SbEditableContent
  animationDelay?: number
}

const RichText: React.FC<Props> = ({ 
  align = "left",
  text, 
  className,
  children,
  sbEditable,
  animationDelay = 0.65
}) => {
  const { scroll } = useSmoothScrollContext();

  const componentRef = useRef<null | HTMLDivElement>(null);
  useIsomorphicLayoutEffect(() => {
    if (componentRef.current != null) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: componentRef.current,
          start: 'top bottom-=100',
          markers: false,
          scroller: "[data-scroll-container]",
        },
      });

      tl.fromTo(componentRef.current, { 
        opacity: 0,
      }, {
        opacity: 1,
        delay: animationDelay,
        stagger: 0.2,
        duration: 0.75,
        ease: CustomEase.create("custom", "0.5,0,0,1"),
        
      });
    }
  }, [componentRef, scroll])

  return (
    <div
      className={cn(className, "ui-richtext", { 
        [`text-${align}`] : align,
      })}
      ref={componentRef}
      {...sbEditable}
    >  
      { 
        text 
          ? render(text, renderOptions)
          : children
      }
    </div>
  );
};

export default RichText;
