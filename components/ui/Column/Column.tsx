import type { SbBlokData } from "@storyblok/react"
import { storyblokEditable } from "@storyblok/react";
import cn from 'classnames';
import ChildrenOrBloks from '@/components/helpers/ChildrenOrBloks';

interface Blok extends SbBlokData {
  className?: string
  vAlignContent?: 'top' | 'center' | 'bottom'
  hAlignContent?: 'left' | 'center' | 'right'
  extendToEdge?: boolean
  padTop?: 'lg' | 'md' | 'sm' | undefined
  maxWidths?: {
    base?: string 
    md?: string
    lg?: string
    xl?: string
    xxl?: string
  }
}

interface Props {
  children: any
  blok: Blok
}

const Column: React.FC<Props> = (props) => {
  const {
    children,
    className,
    vAlignContent = 'top',
    hAlignContent,
    extendToEdge,
    maxWidths,
    padTop,
  } = props.blok || props;

  const colClassNames = cn(className, 'column flex flex-col', {
    "justify-start" : vAlignContent == 'top',
    "justify-center" : vAlignContent == 'center',
    "justify-end" : vAlignContent == 'bottom',
    "extend-to-edge" : extendToEdge,
    "pt-12 md:pt-24": padTop === 'lg',
    "pt-7 md:pt-16": padTop === 'md',
    "pt-8": padTop === 'sm',
    "items-center" : hAlignContent === "center",
    "items-end" : hAlignContent === "right",
    "items-start" : hAlignContent === "left"
  })

  const style = {
    ["--max-width-base" as any]: maxWidths?.base,
    ["--max-width-md" as any]: maxWidths?.md,
    ["--max-width-lg" as any]: maxWidths?.lg,
    ["--max-width-xl" as any]: maxWidths?.xl,
    ["--max-width-xxl" as any]: maxWidths?.xxl,
  } as React.CSSProperties;

  return (
    <div 
      className={colClassNames}
      {...(props.blok && storyblokEditable(props.blok))}
      role="presentation"
      style={style}
    >
      <ChildrenOrBloks 
        children={children}
        bloks={props.blok?.content}
      />
    </div>
  )
}

export default Column;
