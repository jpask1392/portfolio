import Button from "@/components/ui/Button";
import CustomImage from "@/components/ui/Image";
import Logo from "@/components/ui/Logo";
import cn from "classnames";
import DynamicIcon from "@/components/icons/DynamicIcon";
import SearchBar from "@/components/common/Navbar/SearchBar";
import NavigationLink from './NavigationLink';
import MobileMenu from './MobileMenu';
import { Squash as Hamburger } from 'hamburger-react'
import Link from 'next/link'
import { useEffect, useState } from "react";
import { useUIContext } from "@/components/context/uiContext";

import { SbEditableContent } from "@/types/storyBlok";
import type { storyBlokLink, storyBlokImage } from '@/types/storyBlok';
import { useRouter } from "next/router";

interface NavProps {
  className?: string
  navigationList: any
  actionItems?: string[]
  logo: storyBlokImage
  logoLink: storyBlokLink
  ctaText?: string
  ctaLink: storyBlokLink
  sbEditable : SbEditableContent
}

const Navigation: React.FC<NavProps> = ({  
  className,
  navigationList,
  actionItems,
  logo,
  logoLink,
  ctaText,
  ctaLink,
  sbEditable,
}) => {
  const [ active, setActive ] = useState(false);
  const { UI, setUI } = useUIContext();
  const router = useRouter();

  useEffect(() => {
    setActive(false);
  }, [router.asPath])
  
  return (
    <header
      id="primary-header"
      className={cn(className, [
        "z-20",
        "absolute",
        "top-0",
        "w-full"
      ])}
    >
      <nav 
        className="h-full px-5 py-5 mt-10 container  mx-auto flex justify-end relative items-center" 
        role="navigation"
      >

        {/* Logo */}
        <div className="">
          <div className="text-secondary">
            <Link href="/">
              <a aria-label="Company logo">
                <Logo className="fill-current h-10" />
              </a>
            </Link>
          </div>
        </div>

        <div className="md:hidden absolute top-full left-0 pointer-events-none w-full">
          <MobileMenu 
            menu={navigationList} 
            active={active}
          /> 
        </div>

        {/* mobile Menu */}
        <button
          aria-label="Navigation Menu"
          className="md:hidden h-full bg-primary aspect-square flex items-center flex-1"
        >
          <Hamburger 
            size={30} 
            rounded
            color="#72605B"
            distance="sm"
            onToggle={toggled => {
              setActive(toggled)
            }}
          />
        </button>

        {/* Flexs size */}
        <div className="h-full flex-1 hidden md:block">
          <ul className="h-full flex justify-end">
          {
            navigationList.map((link: any, i: number) => {
              return (
                <li key={i} className="mx-5 h-full first:ml-0 last:mr-0">
                  <NavigationLink 
                    nav_link={link} 
                    topLevel
                  />
                </li>
              )
            })
          }
          </ul>
        </div>

        {/*  Action items  */}
        <div className="flex items-center text-secondary">
          {
            actionItems?.includes('search') ? (
              <div className="px-2 md:px-4">
                <SearchBar />
              </div>
            ) : null
          }
        </div>

        {/* CTA */}
        {
          ctaText ? (
            <Button
              className="ml-20"
              link={{ cached_url: ctaLink?.cached_url }}
              text={ctaText}
              icon={<DynamicIcon type="arrowNewPage" />}
            />
          ) : null
        }
      </nav>
    </header>
  );
};

export default Navigation;
