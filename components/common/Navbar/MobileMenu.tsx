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
      className={cn("bg-primary w-full max-w-[520px] border-b-4 transition-all", {
        "translate-x-0" : active,
        "-translate-x-full" : !active
      })}
      style={{ height: visibleWindowHeight + "px" }}
    >
      <div className="px-6 md:px-16 pt-10 flex flex-wrap pb-8">
        
        <div className="w-full md:w-2/3 overflow-auto h-full">
          <ul>
            {
              menu.map((link, i) => {
                return (
                  <li key={i} className="h-full">
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
      </div>
    </div> 
  )
}

export default MobileMenu;
