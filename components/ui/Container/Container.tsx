import { useScrollContext } from "@/components/context/scroll";
import ChildrenOrBloks from '@/components/helpers/ChildrenOrBloks';
import BackgroundMedia from './BackgroundMedia';
import cn from 'classnames';
import type { storyBlokImage } from '@/types/storyBlok';
import { storyblokEditable } from "@storyblok/react";
import type { SbBlokData } from "@storyblok/react"
import { SbEditableContent } from "@/types/storyBlok";
import useIsomorphicLayoutEffect from '@/components/hooks/useIsomorphicLayoutEffect';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import { useUIContext } from "@/components/context/uiContext";

interface Props {
  sectionId?: string
  className?: string
  el?: string
  backgroundColor?:
    'black' 
    | 'white' 
    | 'transparent' 
    | 'gray'
  textColor?: string
  backgroundMedia?: storyBlokImage
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  contained?: boolean
  backgroundOverlay?: number
  spacing?: 'sm' | 'md' | 'lg'
  clearMargin?: string[]
  clearPadding?: string[]
  sbEditable?: SbEditableContent
  borders?: string[]
}

interface Blok extends SbBlokData, Props {}

interface ContainerProps extends Props {
  children: any
  blok?: Blok
}

const Container: React.FC<ContainerProps> = (props) => {
  const {
    className = "",
    el = 'section',
    backgroundColor = '',
    textColor = '',
    backgroundMedia,
    backgroundOverlay,
    maxWidth = '2xl',
    contained = true,
    spacing,
    clearPadding = [],
    sectionId,
    children = "",
    borders = []
  } = props.blok || props;

  let Component: React.ComponentType<React.HTMLAttributes<HTMLDivElement>> =
    el as any;

  const containerRef = useRef<any>(null);
  const tween = useRef<any>(null);
  const { UI, dispatch } = useUIContext();
  const { scroll } = useScrollContext();

  useIsomorphicLayoutEffect(() => {
    if (!scroll) return;

    tween.current = gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        markers: false,
        scroller: "[data-scroll-container]",
        onEnter: () => {
          if (containerRef.current?.id) 
            dispatch({type: "updateSection", payload: containerRef.current?.id});
        },
        onEnterBack: () => {
          if (containerRef.current?.id) 
            dispatch({type: "updateSection", payload: containerRef.current.id});
        }
      }
    })
  }, [scroll])

  return (
    <Component
      id={sectionId}
      {...(props.blok && storyblokEditable(props.blok))}
      className={cn(className, {
        [`has-bg bg-${backgroundColor}`] : backgroundColor,
        [`text-${textColor}`] : textColor,
        'border-t border-black': borders.includes('top'),
        'border-b border-black': borders.includes('bottom'),
      })}
    >
      { 
        backgroundMedia && backgroundMedia.id && (
          <BackgroundMedia
            image={backgroundMedia}
            bgColor={backgroundColor}
            backgroundOverlay={backgroundOverlay}
            priority
          />
        )
      }

      <div ref={containerRef} className={cn("section", {
        'container-bordered': el === 'section',
        'section--spacing-lg': spacing === 'lg',
        'section--spacing-sm': spacing === 'sm',
        '!pt-0': clearPadding.includes('top'),
        '!pb-0': clearPadding.includes('bottom'),
      })}>
        <div className={cn(`w-full max-w-screen-${maxWidth} mx-auto relative z-10`)}>
          <div className={cn({
            'container overflow-hidden lg:overflow-visible' : contained,
          })}>
            <ChildrenOrBloks 
              children={children}
              bloks={props.blok?.content}
            />
          </div>
        </div>
      </div>
    </Component>
  )
}

export default Container;
