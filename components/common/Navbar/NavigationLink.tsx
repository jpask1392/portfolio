import DynamicIcon from "@/components/icons/DynamicIcon";
import type { navLink } from "@/types/navigation";
import { useRouter } from 'next/router';
import { useState } from "react";
import NextLink from 'next/link';
import StoryBlokLink from "@/components/helpers/StoryBlokLink";

import MegaMenu from "@/components/common/MegaMenu";
import cn from 'classnames';

interface NavigationLinkProps {
  className?: string
  nav_link: navLink
  topLevel?: boolean
  hasMegaMenu?: boolean
  withMegaMenuStyle?: string
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ 
  nav_link, 
  className,
  topLevel = false,
  withMegaMenuStyle,
}) => {
  const {
    name,
    link,
    subItems,
    megaMenuStyle,
    hasMegaMenu
  } = nav_link;

  const { cached_url } = link;

  const router = useRouter();
  const [ hoverLink, setHoverLink ] = useState<boolean>(false);

  const handleOnMouseOver = () => setHoverLink(true);
  const handleOnMouseLeave = () => setHoverLink(false);

  const navLinkClasses = cn("", {
    "text-secondary active" : router.asPath === cached_url,
    "font-header uppercase font-bold text-base md:text-4xl" : topLevel,
    "flex items-center" : subItems.length,
    "py-4 md:py-7 px-8 xl:p-0 border-b border-secondaryLight xl:border-none" : subItems.length || topLevel && !subItems.length,
    "text-secondary": topLevel || withMegaMenuStyle === "large",
    "uppercase text-base" : withMegaMenuStyle,
    "text-base md:text-4xl w-full" : !withMegaMenuStyle,
    "text-white" : withMegaMenuStyle === "narrow",
  })

  return (
    <span
      className={cn(className, "flex flex-wrap items-center h-full")}
      onMouseOver={handleOnMouseOver}
      onMouseLeave={handleOnMouseLeave}
    >
      <StoryBlokLink
        className={navLinkClasses}
        sbLink={link}
      >
        <span className="flex-1">{name}</span>

        {
          subItems.length ? (
            <span className="lg:hidden pl-5">
              <DynamicIcon 
                className="md:hidden h-3"
                type="togglePlusMinus"
                open={true}
              />
              </span>
          ) : null
        }

        {
          topLevel && subItems.length ? (
            <DynamicIcon 
              type="chevronDown"
              className="ml-2"
            />
          ) : null
        }
      </StoryBlokLink>

      {
        subItems.length && hasMegaMenu ? (
          <MegaMenu 
            item={nav_link} 
            visible={hoverLink} 
            style={megaMenuStyle}
          />
        ) : null
      }

      {
        subItems.length && !hasMegaMenu ? (
          <ul className="w-full">
            {
              subItems.map((item, i) => {
                return (
                  <li className={cn("", navLinkClasses)} key={i}>
                    <NavigationLink 
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

export default NavigationLink;
