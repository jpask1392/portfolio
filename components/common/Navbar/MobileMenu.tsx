import cn from "classnames";
import useVisibleWindowHeight from '@/components/hooks/useVisibleWindowHeight';
import Button from '@/components/ui/Button';
import MobileNavigationLink from './MobileNavigationLink';
import type { navLink } from '@/types/navigation';
import { useEffect } from "react";
import { useSmoothScrollContext } from "@/components/context/smoothScrollContext";

interface Props {
  menu: navLink[]
  active: boolean
}

const MobileMenu: React.FC<Props> = ({
  menu,
  active,
}) => {
  // hook takes into account change in announcement bar.
  const visibleWindowHeight = useVisibleWindowHeight();

  const { scroll } : { scroll: any } = useSmoothScrollContext();

  useEffect(() => {
    if (active) {
      // disable scroll
      scroll?.stop();
    }

    if (!active) {
      scroll?.start();
    }
  }, [scroll, active])

  return (
    <div 
      className={cn("bg-primary w-full max-w-[275px] md:max-w-[520px] border-b-4 transition-all pointer-events-auto", {
        "translate-x-0" : active,
        "-translate-x-full" : !active
      })}
      style={{ height: visibleWindowHeight + "px" }}
    >
      <ul className="w-full h-full">
        {
          menu.map((link, i) => {
            return (
              <li key={i}>
                <MobileNavigationLink 
                  nav_link={link}
                />
              </li>
            )
          })
        }
      </ul>
    </div> 
  )
}

export default MobileMenu;
