import Header from "@/components/ui/Header";
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

  const [ active, setActive ] = useState<boolean>(false);

  const handleClick = (e: any) => {
    if (subItems.length) {
      e.preventDefault();

      setActive(true);
    }
  }

  return (
    <span
      className={cn(className, "flex flex-wrap items-center h-full")}
    >
      <StoryBlokLink
        className={"border-b border-red w-full"}
        sbLink={link}
      >
        <span 
          className="flex-1 h3 flex items-center py-4 md:py-7 px-8"
          onClick={handleClick}
        >
          <span className="flex-1">
            {name}
          </span>

          {
            subItems.length ? (
              <span className="bg-red rounded-full text-white p-1">
                <DynamicIcon 
                  className="w-4 h-4 -rotate-90"
                  type="chevronDown"
                />
                </span>
            ) : null
          }
        </span>
      </StoryBlokLink>

      {
        subItems.length ? (
          <div className={cn("w-full absolute inset-y-0 transition-all overflow-auto z-20", {
            "-left-full" : !active,
            "left-0" : active
          })}>
            <div className="px-8 py-4 border-b border-red">
              <a
                href="#" 
                onClick={(e) => { e.preventDefault(); setActive(false) }}
                className="h3 flex items-center"
              >
                <span className="bg-red rounded-full text-white p-1 mr-4">
                  <DynamicIcon 
                    className="w-4 h-4 rotate-90"
                    type="chevronDown"
                  />
                </span>
                Back
              </a>
            </div>
            <div className="px-8 py-4 border-b border-red">
              <Header>{name}</Header>
            </div>
            <ul>
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
          </div>
        ) : null
      }
    </span>
  ) 
}

export default MobileNavigationLink;
