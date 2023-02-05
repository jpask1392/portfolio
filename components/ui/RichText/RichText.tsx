
import { modulePadding } from "@/utils/modulePadding";
import { render } from "storyblok-rich-text-react-renderer";
import { renderOptions } from "utils/constants";
import cn from "classnames";
import { useRef } from 'react';
import { storyblokEditable } from "@storyblok/react";
import type { SbBlokData } from "@storyblok/react"

import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useScrollContext } from "@/components/context/scroll";
import { gsap } from 'gsap';
import useIsomorphicLayoutEffect from "@/components/hooks/useIsomorphicLayoutEffect";

interface Props {
  align?: 'left' | 'center' | 'right'
  className?: string
  text?: string
  animationDelay?: number
  color?: string
  padding?: any
  disableAnimation?: boolean
}

interface Blok extends SbBlokData, Props {}

interface RichTextProps extends Props {
  children?: any
  blok?: Blok
}

const RichText: React.FC<RichTextProps> = (props) => {
  const {
    align = "left",
    text, 
    className,
    color,
    padding,
    disableAnimation,
  } = props.blok || props;

  const componentRef = useRef<null | HTMLDivElement>(null);
  const { scroll } = useScrollContext();
  // const tl = useRef(null);

  useIsomorphicLayoutEffect(() => {
    if (!scroll || disableAnimation) return;

    gsap.to(componentRef.current, {
      opacity: 1,
      scrollTrigger: {
        trigger: componentRef.current,
        markers: false,
        start: "top bottom-=20%",
        scroller: "[data-scroll-container]",
      }
    })
  }, [scroll])

  return (
    <div
      ref={componentRef}
      {...(props.blok && storyblokEditable(props.blok))}
      className={cn(className, "ui-richtext", { 
        [`text-${align}`] : align,
        [`text-${color}`] : color,
        [modulePadding(padding)] : padding,
        "self-start" : align === 'left',
        "opacity-0": !disableAnimation
      })}
    >  
      { text ? render(text, renderOptions) : null }
    </div>
  );
};

export default RichText;
