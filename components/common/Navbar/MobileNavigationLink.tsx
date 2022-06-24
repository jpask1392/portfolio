import Button from "@/components/ui/Button";
import DynamicIcon from "@/components/icons/DynamicIcon";
import type { navLink } from "@/types/navigation";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import StoryBlokLink from "@/components/helpers/StoryBlokLink";
import cn from 'classnames';

interface MobileNavigationLinkProps {
  className?: string
  nav_link: navLink
}

const MobileNavigationLink: React.FC<MobileNavigationLinkProps> = ({ 
  nav_link, 
  className,
}) => {
  const {
    name,
    link,
    subItems,
  } = nav_link;

  const router = useRouter();
  const [ active, setActive ] = useState<boolean>(false);

  const navLinkClasses = cn("py-4 md:py-7 px-8 xl:p-0 border-b border-secondaryLight xl:border-none w-full flex items-center");

  const handleClick = (e: any) => {
    if (subItems.length) {
      e.preventDefault();

      setActive(true);
    }
  }

  return (
    <span
      className={cn(className, "flex flex-wrap items-center h-full text-secondary")}
    >
      <StoryBlokLink
        className={navLinkClasses}
        sbLink={link}
      >
        <span 
          className="flex-1 font-header uppercase font-bold text-base md:text-4xl"
          onClick={handleClick}
        >
          {name}
        </span>

        {
          subItems.length ? (
            <span className="pl-5">
              <DynamicIcon 
                className="h-4"
                type="chevronRight"
              />
              </span>
          ) : null
        }
      </StoryBlokLink>

      {
        subItems.length ? (
          <ul className={cn("w-full absolute inset-y-0 bg-primary transition-all overflow-auto", {
            "-left-full" : !active,
            "left-0" : active
          })}>
            <div className="px-8 mb-4">
              <Button 
                text="Back"
                onDark
                className="w-full !max-w-none"
                onClick={() => { setActive(false) }}
              />
            </div>
            {
              subItems.map((item, i) => {
                return (
                  <li key={i}>
                    <MobileNavigationLink 
                      nav_link={item} 
                    />
                  </li>
                )
              })
            }
          </ul>
        ) : null
      }
    </span>
  ) 
}

export default MobileNavigationLink;
