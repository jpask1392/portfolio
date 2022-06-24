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

// TODO: Make sure this is not visible when the page loads
// Current showing a little flash of the mega menu.

const MegaMenu: React.FC<Props> = ({ 
  className,
  item,
  visible = false,
  style
}) => {
  // visible = true
  const tl = useRef<any>(null);
  const megaMenuRef = useRef<any>(null);
  // const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    
    if (megaMenuRef.current) {
      tl.current = gsap.timeline({
        paused: true
      });

      tl.current.to(megaMenuRef.current, {
        autoAlpha: 1
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
      className={cn(className, "invisible mega-menu absolute top-full inset-x-0 text-primary w-screen left-1/2 -translate-x-1/2", {
        "bg-red-100" : style === "large",
        "bg-secondary" : style === "narrow",
      })}
      ref={megaMenuRef}
    >
      <div className={cn({
        "px-5 max-w-screen-2xl mx-auto" : style === "narrow",
        "px-5 py-14 max-w-screen-xl mx-auto" : style === "large"
      })}>
        <div className="py-10">
          {
            item && (
              <ul className={cn({
                "flex flex-nowrap space-x-10 overflow-auto justify-between" : style === "narrow",
                "grid grid-cols-3 gap-6" : style === "large"
              })}>
                {
                  item.subItems.map((subItem, i) => {
                    return (
                      <li 
                        key={i} 
                        className="opacity-100 flex-shrink-0 link"
                      >
                        <NavigationLink 
                          nav_link={subItem}
                          withMegaMenuStyle={style}
                        />
                        {/* <Link href={"/" + subItem.link.cached_url}>
                          <a className="text-base uppercase">
                            {subItem.name}
                          </a>
                        </Link> */}
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
