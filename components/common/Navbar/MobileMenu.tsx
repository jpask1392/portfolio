import cn from "classnames";
import useVisibleWindowHeight from '@/components/hooks/useVisibleWindowHeight';
import Button from '@/components/ui/Button';
import NavigationLink from './NavigationLink';
import type { navLink } from '@/types/navigation';

interface Props {
  menu: navLink[]
}

const MobileMenu: React.FC<Props> = ({
  menu
}) => {
  // hook takes into account change in announcement bar.
  const visibleWindowHeight = useVisibleWindowHeight();

  return (
    <div 
      className="bg-primary w-full border-b-4" 
      style={{ height: visibleWindowHeight + "px" }}
    >
      <div className="px-6 md:px-16 pt-10 flex flex-wrap pb-8">
        <div className={cn([
          "w-full",
          "md:w-1/3 md:pr-8",
          "order-1 md:order-none",
          "mt-6",
          "md:mt-0",
          "text-center",
          "md:text-left"
        ])}>
          <Button 
            text="My Account"
            buttonStyle="on-primary"
            onDark={false}
          />
        </div>
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
