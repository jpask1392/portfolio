import { SbEditableContent } from "@/types/storyBlok";

import { ReactNode, Component } from 'react';

import cn from 'classnames';

interface Props {
  className?: string
  children?: ReactNode[] | Component[] | any[] | ReactNode | Component | any
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
  sbEditable?: SbEditableContent
}

const Column: React.FC<Props> = ({ 
  children,
  className,
  vAlignContent = 'top',
  hAlignContent,
  extendToEdge,
  maxWidths,
  padTop,
  sbEditable,
}) => {
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
      {...sbEditable}
      role="presentation"
      style={style}
    >
      {children}
    </div>
  )
}

export default Column;
