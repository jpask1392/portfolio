import { modulePadding } from "@/utils/modulePadding";
import { render } from "storyblok-rich-text-react-renderer";
import { renderOptions } from "utils/constants";
import cn from "classnames";
import { useRef } from 'react';
import { storyblokEditable } from "@storyblok/react";
import type { SbBlokData } from "@storyblok/react"

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
  } = props.blok || props;

  const componentRef = useRef<null | HTMLDivElement>(null);

  return (
    <div
      ref={componentRef}
      {...(props.blok && storyblokEditable(props.blok))}
      className={cn(className, "ui-richtext", { 
        [`text-${align}`] : align,
        [`text-${color}`] : color,
        [modulePadding(padding)] : padding,
        "self-start" : align === 'left',
      })}
    >  
      { text ? render(text, renderOptions) : null }
    </div>
  );
};

export default RichText;
