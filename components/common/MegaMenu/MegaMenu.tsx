import { storyBlokImage } from '@/types/storyBlok';
import cn from 'classnames';
import CustomImage from "@/components/ui/Image";
import type { navLink } from "@/types/navigation";
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import NavigationLink from '../Navbar/NavigationLink';

interface Props {
  className?: string
  item?: navLink
  visible?: boolean
  style?: string
}

const MegaMenu: React.FC<Props> = ({ 
  className,
  item,
  visible = false,
  style
}) => {
  const tl = useRef<any>(null);
  const megaMenuRef = useRef<any>(null);

  useEffect(() => {
    if (megaMenuRef.current) {
      tl.current = gsap.timeline({
        paused: true
      });

      tl.current.to(megaMenuRef.current, {
        autoAlpha: 1,
        duration: 0.2,
      })

      /**
       * TODO: Use a ref here instead of css selector
       */
      // tl.current.to('.link', {
      //   opacity: 1,
      //   stagger: 0.05
      // }, "<")
    }

    return () => {
      tl.current.kill();
    };
  }, [])

  useEffect(() => {
    if (tl.current) {
      visible ? tl.current.play() : tl.current.reverse();
    }
  }, [visible])

  return (
    <div 
      className={cn(className, "invisible mega-menu absolute top-full inset-x-0 w-screen left-1/2 -translate-x-1/2 bg-[#EBEBFF] shadow-lg")}
      ref={megaMenuRef}
    >
      <div className={cn("px-5 max-w-screen-2xl mx-auto", {})}>
        <div className="py-10">
          {
            item && (
              <ul className={cn("overflow-auto flex flex-wrap justify-center space-x-20")}>
                {
                  item.subItems.map((subItem, index) => {
                    return (
                      <li
                        key={index} 
                        className={cn("link", {})}
                      >
                        <NavigationLink
                          nav_link={subItem}
                        />
                      </li>
                    )
                  })
                }
              </ul>
            )
          }
        </div>

      
      </div>
    </div>
  )
}

export default MegaMenu;
