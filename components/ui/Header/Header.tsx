import { modulePadding } from '@/utils/modulePadding'
import { renderOptions } from '@/utils/constants'
import { SbEditableContent } from "@/types/storyBlok";
import Image from "next/image";

import useIsomorphicLayoutEffect from "@/components/hooks/useIsomorphicLayoutEffect";
import { render, NODE_PARAGRAPH } from "storyblok-rich-text-react-renderer";
import { H1, H2, H3, H4 } from '@/components/ui/Typography';
import cn from "classnames";
import { JSXElementConstructor, useRef } from 'react';

import { gsap } from 'gsap';
import CustomEase from "gsap/dist/CustomEase";

interface Props {
  className?: string
  tag?: Variant
  align?: 'left' | 'center' | 'right'
  color?: 'primary' | 'white' | 'black' | 'secondary'
  size?: 'h1' | 'h2' | 'h3' | 'h4' | string
  text?: string
  mobile_text?: string
  sbEditable?: SbEditableContent
  disableAnimation?: boolean
  decoration?: string | "squiggle"
  padding?: any
  children?: any
}

type Variant = 'h1' | 'h2' | 'h3' | 'h4';

const Header: React.FC<Props> = ({
  className,
  tag = 'h2',
  align = '',
  children,
  text,
  mobile_text,
  color = 'inherit',
  size = 'h2',
  sbEditable,
  disableAnimation = false,
  decoration,
  padding,
}) => {
  const tl = useRef<any>(null);
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

  useIsomorphicLayoutEffect(() => {
    // if (!disableAnimation) {
    //   tl.current = gsap.timeline({
    //     scrollTrigger: {
    //       trigger: componentRef.current,
    //       start: 'top bottom-=100',
    //       markers: false,
    //     },
    //   });

    //   let targets = gsap.utils.toArray(".animate", componentRef.current);
    //   if (targets.length) {
    //     tl.current.fromTo(targets, { 
    //       opacity: 0,
    //       yPercent: 100,
    //     }, {
    //       opacity: 1,
    //       yPercent: 0,
    //       stagger: 0.2,
    //       duration: 0.75,
    //       ease: CustomEase.create("custom", "0.5,0,0,1"),
          
    //     });
    //   }
    // }
  }, [])

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
      {...sbEditable}
      ref={componentRef}
      className={cn(className, "ui-header relative", [size], {
        [`text-${align}`] : align,
        [`text-${color}`] : color,
        [modulePadding(padding)] : padding,
      })}
    >
      <Component className={size}>
        <>
          {
            decoration === "squiggle" ? (
              <div className="absolute bottom-1/2 w-full left-1/3 ml-5">
                <Image 
                  src='/squiggle.png'
                  width={1036}
                  height={222}
                  className="absolute left-full"
                />
              </div>
            ) : null
          }
          {
            render(mobile_text) ? (
              <span className="lg:hidden">
                { render(mobile_text, {
                  ...renderOptions,
                  nodeResolvers: { [NODE_PARAGRAPH]: nodeResolver }
                }) }
              </span>
            ) : null
          }
            
          <span className={cn({
            "hidden lg:block" : render(mobile_text)
          })}>
            { 
              text 
                ? render(text, { ...renderOptions, nodeResolvers: { [NODE_PARAGRAPH]: nodeResolver }}) 
                : children 
            }
          </span>
        </>
      </Component>
    </div>
  );
};

export default Header;
