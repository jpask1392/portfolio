import { useScrollContext } from "@/components/context/scroll";
import ChildrenOrBloks from '@/components/helpers/ChildrenOrBloks';
import BackgroundMedia from './BackgroundMedia';
import cn from 'classnames';
import type { storyBlokImage } from '@/types/storyBlok';
import { storyblokEditable } from "@storyblok/react";
import type { SbBlokData } from "@storyblok/react"
import { SbEditableContent } from "@/types/storyBlok";
import useIsomorphicLayoutEffect from '@/components/hooks/useIsomorphicLayoutEffect';
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
    spacing = "md",
    clearPadding = [],
    clearMargin = [],
    sectionId,
    children = "",
    borders = []
  } = props.blok || props;

  let Component: React.ComponentType<React.HTMLAttributes<HTMLDivElement>> =
    el as any;

  const containerRef = useRef<any>(null);

  return (
    <Component
      id={sectionId}
      data-scroll-section
      {...(props.blok && storyblokEditable(props.blok))}
      className={cn(className, `section section--spacing-${spacing}`, {
        [`has-bg bg-${backgroundColor}`] : backgroundColor,
        [`text-${textColor}`] : textColor,
        '!pt-0': clearPadding.includes('top'),
        '!pb-0': clearPadding.includes('bottom'),
        '!mt-0': clearMargin.includes('top'),
        '!mb-0': clearMargin.includes('bottom'),
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

      <div className={cn({
        "px-10 lg:px-0 lg:mx-[8.33333%]" : contained,
        "px-10" : !contained,
      })}>
        <ChildrenOrBloks 
          bloks={props.blok?.content}
        >{children}</ChildrenOrBloks>
      </div>
    </Component>
  )
}

export default Container;
