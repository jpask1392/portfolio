import { SbEditableContent } from "@/types/storyBlok";

import useIsomorphicLayoutEffect from "@/components/hooks/useIsomorphicLayoutEffect";
import { render, NODE_PARAGRAPH } from "storyblok-rich-text-react-renderer";
import { H1, H2, H3, H4 } from '@/components/ui/Typography';
import cn from "classnames";
import { JSXElementConstructor, useEffect, useLayoutEffect, useRef } from 'react';

import { gsap } from 'gsap';
import CustomEase from "gsap/dist/CustomEase";

interface Props {
  className?: string
  tag?: Variant
  align?: 'left' | 'center' | 'right'
  color?: 'primary' | 'white' | 'black'
  size?: 'h1' | 'h2' | 'h3' | 'h4' | string
  text?: string
  mobile_text?: string
  sbEditable?: SbEditableContent
}

type Variant = 'h1' | 'h2' | 'h3' | 'h4';

const Header: React.FC<Props> = ({
  className,
  tag = 'h2',
  align = '',
  children,
  text,
  mobile_text,
  color = 'black',
  size,
  sbEditable,
}) => {
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
    if (componentRef.current != null) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: componentRef.current,
          start: 'top bottom-=100',
          markers: false,
        },
      });

      let targets = gsap.utils.toArray(".animate", componentRef.current);
      if (targets.length) {
        tl.fromTo(targets, { 
          opacity: 0,
          yPercent: 100,
        }, {
          opacity: 1,
          yPercent: 0,
          stagger: 0.2,
          duration: 0.75,
          ease: CustomEase.create("custom", "0.5,0,0,1"),
          
        });
      }
    }
  }, [componentRef])

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
      className={cn(className, "ui-header", {
        [`text-${align}`] : align,
        [`text-${color}`] : color,
      })} 
      {...sbEditable}
    >
      <Component className={size}>
        {
          mobile_text && text ? (
            <>
              <span className="lg:hidden">
                { render(mobile_text, { nodeResolvers: { [NODE_PARAGRAPH]: nodeResolver }}) }
              </span>
              <span className="hidden lg:block">
                { render(text, { nodeResolvers: { [NODE_PARAGRAPH]: nodeResolver }}) }
              </span>
            </> 
          ) : null
        }

        {
          !mobile_text && text ? (
            render(text, { nodeResolvers: { [NODE_PARAGRAPH]: nodeResolver } }) 
          ) : children
        }
      </Component>
    </div>
  );
};

export default Header;
