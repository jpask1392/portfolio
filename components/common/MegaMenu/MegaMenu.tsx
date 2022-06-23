import { storyBlokImage } from '@/types/storyBlok';
import cn from 'classnames';
import CustomImage from "@/components/ui/Image";
import type { navLink } from "@/types/navigation";
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface Props {
  className?: string
  item?: navLink
  visible?: boolean
}

// TODO: Make sure this is not visible when the page loads
// Current showing a little flash of the mega menu.

const MegaMenu: React.FC<Props> = ({ 
  className,
  item,
  visible = false
}) => {
  const tl = useRef<any>(null);
  const megaMenuRef = useRef<any>(null);

  useEffect(() => {
    if (megaMenuRef.current) {
      tl.current = gsap.timeline({
        paused: true
      });

      tl.current.from(megaMenuRef.current, {
        autoAlpha: 0
      })

      tl.current.to('.link', {
        opacity: 1,
        stagger: 0.05
      }, "<")
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
      className={cn(className, "mega-menu absolute top-full bg-secondary inset-x-0 text-white w-screen left-1/2 -translate-x-1/2")}
      ref={megaMenuRef}
    >
      <div className="px-8 max-w-screen-2xl mx-auto">
        <div className="py-10">
          {
            item && (
              <div className="inline-block">
                <ul className="flex flex-nowrap space-x-10 overflow-auto">
                  {
                    item.subItems.map((subItem, i) => {
                      return (
                        <li 
                          key={i} 
                          className="opacity-0 flex-shrink-0 link"
                        >
                          <Link href={"/" + subItem.link.cached_url}>
                            <a className="text-base uppercase">
                              {subItem.name}
                            </a>
                          </Link>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            )
          }
        </div>

      
      </div>
    </div>
  )
}

export default MegaMenu;
