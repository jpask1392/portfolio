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
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ 
  nav_link, 
  className,
  topLevel = false,
  hasMegaMenu = false
}) => {
  const {
    name,
    link,
    subItems,
  } = nav_link;

  const { cached_url } = link;

  const router = useRouter();
  const [ hoverLink, setHoverLink ] = useState<boolean>(false);

  const handleOnMouseOver = () => topLevel && setHoverLink(true);
  const handleOnMouseLeave = () => topLevel && setHoverLink(false);

  const navLinkClasses = cn("text-base w-full", {
    "text-secondary active" : router.asPath === cached_url,
    "uppercase lg:capitalize font-bold lg:font-medium tracking-wide" : topLevel,
    "flex" : subItems.length
  })

  return (
    <span
      className={cn(className, "flex flex-wrap items-center h-full", {
        "py-4 has-effect" : topLevel,
        "border-b lg:border-transparent" : hoverLink && topLevel,
        "border-b border-white lg:border-transparent" : !hoverLink && topLevel,
      })}
      onMouseOver={handleOnMouseOver}
      onMouseLeave={handleOnMouseLeave}
    >
      <StoryBlokLink
        classes={navLinkClasses}
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
          topLevel && (
            <span 
              className="h-1 w-0 bg-primary block absolute left-0 -bottom-2 nav-link-effect"
            />
          )
        }
      </StoryBlokLink>

      {
        subItems.length && hasMegaMenu ? (
          <MegaMenu item={nav_link} visible={hoverLink} />
        ) : null
      }

      {
        subItems.length && !hasMegaMenu ? (
          <ul className="w-full pl-6 mt-4">
            {
              subItems.map((item, i) => {
                return (
                  <li className="py-1.5" key={i}>
                    <NavigationLink nav_link={item} />
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
