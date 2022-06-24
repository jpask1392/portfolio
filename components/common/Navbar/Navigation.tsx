import CustomImage from "@/components/ui/Image";
import Logo from "@/components/ui/Logo";
import cn from "classnames";
import DynamicIcon from "@/components/icons/DynamicIcon";
import SearchBar from "@/components/common/Navbar/SearchBar";
import CountBubble from './CountBubble';
import NavigationLink from './NavigationLink';
import MobileMenu from './MobileMenu';
import { Squash as Hamburger } from 'hamburger-react'
import Link from 'next/link'
import { useState } from "react";
import { useUIContext } from "@/components/context/uiContext";

import { SbEditableContent } from "@/types/storyBlok";
import type { storyBlokLink, storyBlokImage } from '@/types/storyBlok';

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
  
  return (
    <header
      // data-scroll-sticky
      // data-scroll-target="[data-scroll-container]"
      id="primary-header"
      className={cn(className, [
        "bg-primary",
        "h-20 xl:h-12",
        // "border-b border-tertiary",
        "z-20",
        "sticky",
        "top-0",
      ])}
    >
      <nav 
        className="h-full px-8 max-w-screen-2xl mx-auto flex justify-end relative" 
        role="navigation"
      >

        <div className="xl:hidden absolute top-full left-0 pointer-events-none">
          <MobileMenu 
            menu={navigationList} 
            active={active}
          /> 
        </div>

        {/* mobile Menu */}
        <button
          aria-label="Navigation Menu"
          onClick={() => setActive(!active)}
          className="xl:hidden h-full bg-primary aspect-square flex items-center flex-1"
        >
          <Hamburger size={25}/>
        </button>

        {/* Logo */}
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <div className="text-secondary">
            <Link href="/">
              <a aria-label="Company logo">
                <Logo className="fill-current h-10" />
              </a>
            </Link>
          </div>
        </div>

        {/* Flexs size */}
        <div className="h-full flex-1 hidden xl:block">
          <ul className="h-full flex text-secondary">
          {
            navigationList.map((link: any, i: number) => {
              return (
                <li key={i} className="mx-5 h-full first:ml-0">
                  <NavigationLink 
                    nav_link={link} 
                    topLevel
                    // hasMegaMenu={true} 
                  />
                </li>
              )
            })
          }
          </ul>
        </div>

        {/*  Action items  */}
        <div className="flex items-center">
          {
            actionItems?.includes('search') ? (
              <div className="px-4">
                <SearchBar />
              </div>
            ) : null
          }
          {
            actionItems?.includes('cart') ? (
              <button className="px-4 relative" onClick={() => setUI({
                ...UI,
                cartActive: !UI.cartActive,
              })}>
                <DynamicIcon type="cart" className="h-7" />
                <span className="absolute -top-2 right-2">
                  <CountBubble />
                </span>
              </button>
            ) : null
          }
          {
            actionItems?.includes('account') ? (
              <div className="px-4">
                <Link href={'/account'}>
                  <a aria-label="Account Page Icon">
                    <DynamicIcon type="account" />
                  </a>
                </Link>
              </div>
            ) : null
          }
        </div>

        {/* CTA */}
        <Link href={'/' + ctaLink?.cached_url}>
          <a 
            aria-label={ctaText}
            className="font-medium text-base md:text-4xl h-full hidden xl:flex items-center pl-8 xl:pl-14 uppercase font-header text-secondary"
          >
            {ctaText}
          </a>
        </Link>
      </nav>
    </header>
  );
};

export default Navigation;
