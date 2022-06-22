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
      id="primary-header"
      className={cn(className, [
        "bg-primary",
        "h-16 xl:h-28",
        "border-b border-gray2",
        "z-20",
        "sticky",
        "top-0",
      ])}
    >
      <nav 
        className="h-full lg:px-4 max-w-screen-2xl mx-auto flex justify-end relative" 
        role="navigation"
      >

        <div className="lg:hidden absolute top-full w-full inset-x-0 mt-px">
          { active && <MobileMenu menu={navigationList} /> }
        </div>

        {/* Logo - visible mobile only */}
        <div className="lg:hidden flex-1 pl-5 flex items-center">
          <div className="text-white">
            <Link href="/">
              <a aria-label="Company logo">
                <Logo className="fill-current h-3" />
              </a>
            </Link>
          </div>
        </div>

        {/* Flexs size */}
        <div className="h-full flex-1 hidden lg:block">
          <ul className="h-full flex">
          {
            navigationList.map((link: any, i: number) => {
              return (
                <li key={i} className="mx-5 m-px h-full">
                  <NavigationLink nav_link={link} topLevel={true} hasMegaMenu={true} />
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
                <DynamicIcon type="cart" />
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
            className="font-medium text-base h-full hidden md:flex items-center px-8 xl:px-14 ml-4 xl:ml-14"
          >
            {ctaText}
          </a>
        </Link>

        {/* mobile Menu */}
        <button
          aria-label="Navigation Menu"
          onClick={() => setActive(!active)}
          className="lg:hidden h-full bg-primary aspect-square ml-4 md:ml-0 flex items-center justify-center"
        >
          <Hamburger size={16}/>
        </button>
      </nav>
    </header>
  );
};

export default Navigation;
