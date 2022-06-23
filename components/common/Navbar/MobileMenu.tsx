import cn from "classnames";
import useVisibleWindowHeight from '@/components/hooks/useVisibleWindowHeight';
import Button from '@/components/ui/Button';
import NavigationLink from './NavigationLink';
import type { navLink } from '@/types/navigation';

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

  return (
    <div 
      className={cn("bg-primary w-full max-w-[520px] border-b-4 transition-all pointer-events-auto", {
        "translate-x-0" : active,
        "-translate-x-full" : !active
      })}
      style={{ height: visibleWindowHeight + "px" }}
    >
      
        <ul className="w-full overflow-auto h-full">
          {
            menu.map((link, i) => {
              return (
                <li key={i}>
                  <NavigationLink 
                    nav_link={link}
                    topLevel={true}
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
