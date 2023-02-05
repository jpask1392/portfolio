import cn from "classnames";
import { modulePadding } from '@/utils/modulePadding'
import { renderOptions } from '@/utils/constants'
import type { SbBlokData } from "@storyblok/react"
import { render, NODE_PARAGRAPH } from "storyblok-rich-text-react-renderer";
import { H1, H2, H3, H4 } from '@/components/ui/Typography';
import { JSXElementConstructor, useRef } from 'react';
import { storyblokEditable } from "@storyblok/react";

interface Props {
  className?: string
  elClassName?: string
  tag?: Variant
  align?: 'left' | 'center' | 'right'
  color?: 'primary' | 'white' | 'black' | 'secondary'
  size?: 'h1' | 'h2' | 'h3' | 'h4' | string
  text?: string
  mobile_text?: string | any
  disableAnimation?: boolean
  padding?: any
}

interface Blok extends SbBlokData, Props {}

interface HeaderProps extends Props {
  children?: any
  blok?: Blok
}

type Variant = 'h1' | 'h2' | 'h3' | 'h4';

const Header: React.FC<HeaderProps> = (props) => {
  const {
    className,
    elClassName,
    tag = 'h2',
    align = '',
    text,
    mobile_text,
    color = 'inherit',
    size = 'h2',
    padding,
    children
  } = props.blok || props;

  const componentsMap: {
    [P in Variant]: React.ComponentType<any> | string
  } = {
    'h1': H1,
    'h2': H2,
    'h3': H3,
    'h4': H4
  };

  const Component:
    | JSXElementConstructor<any>
    | React.ReactElement<any>
    | React.ComponentType<any>
    | string = componentsMap![tag!];

  const componentRef = useRef<null | HTMLDivElement>(null);

  const nodeResolver = (child: any) => {
    return Array.isArray(child) 
    ? <>
        {
          child.map((el, i) => {
            if (typeof el === 'string') {
              return (
                <span key={i} className="overflow-hidden pb-2 -mb-2">
                  <span className="animate inline-block" dangerouslySetInnerHTML={{__html: el}} />
                </span>
              )
            } else {
              return <span key={i}>{el}</span>;
            }
          })
        }
      </>
    : <>{child}</>
  }

  return (
    <div 
      ref={componentRef}
      {...(props.blok && storyblokEditable(props.blok))}
      className={cn(className, "ui-header relative", [size], {
        [`text-${align}`] : align,
        [`text-${color}`] : color,
        [modulePadding(padding)] : padding,
      })}
    >
      <Component className={cn(size, elClassName)}>
        <>
          {
            mobile_text && 'content' in mobile_text.content[0] ? (
              <span className="lg:hidden">
                { render(mobile_text, {
                  ...renderOptions,
                  nodeResolvers: { [NODE_PARAGRAPH]: nodeResolver }
                }) }
              </span>
            ) : null
          }
            
          <span className={cn({
            "hidden lg:block" : mobile_text && 'content' in mobile_text.content[0]
          })}>
            { text ? render(text, { ...renderOptions, nodeResolvers: { [NODE_PARAGRAPH]: nodeResolver }}) : null }
          </span>
        </>
      </Component>
    </div>
  );
};

export default Header;
