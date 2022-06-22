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
  const [ menuImage, setMenuImage ] = useState<undefined | storyBlokImage>();

  const handleLinkHover = (menuItem: navLink) => {
    if (menuItem.image) {
      setMenuImage(menuItem.image);
    }
  }

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
      className={cn(className, "mega-menu absolute top-full bg-black mt-px inset-x-0")}
      ref={megaMenuRef}
    >
      <div className="flex">
        <div className="flex-1 p-16">
          {
            item && (
              <div className="inline-block">
                <h4 className="caption mb-8">
                  {item.name}
                </h4>
                <ul className={cn({
                  "lg:columns-2 gap-0" : item.subItems.length > 5
                })}>
                  {
                    item.subItems.map((subItem, i) => {
                      return (
                        <li 
                          key={i} 
                          className="mb-5 link leading-none opacity-0"
                          onMouseOver={() => handleLinkHover(subItem)}
                        >
                          <Link href={"/" + subItem.link.cached_url}>
                            <a>
                              <span className="text-lg border-b border-gray2 relative">
                                {subItem.name}

                                <span className="animate bg-primary absolute left-0 -bottom-px w-0 h-px transition-all" />
                              </span>
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

        <div className="w-1/3">
          <div className="h-full aspect-square xl:aspect-[4/3] bg-gray-800">
            <CustomImage 
              image={menuImage} 
              layout="fill" 
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MegaMenu;
