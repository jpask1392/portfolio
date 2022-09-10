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
import { useEffect, useState, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import useIsomorphicLayoutEffect from '@/components/hooks/useIsomorphicLayoutEffect';

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
  const router = useRouter();
  const [ scrolled, setScrolled ] = useState(false);

  const navRef = useRef<any>(null)

  useIsomorphicLayoutEffect(() => {
    ScrollTrigger.create({
      trigger: navRef.current,
      markers: false,
      start: 'top+=100 top',
      onEnter: () => setScrolled(true),
      onEnterBack: () => setScrolled(false)
    })
  }, [])

  useEffect(() => {
    setActive(false);
  }, [router.asPath])
  
  return (
    <header
      ref={navRef}
      id="primary-header"
      className={cn("z-20 fixed top-0 w-full transition-all duration-500 border-transparent", {
        "pt-0 text-black border-b !border-black bg-white" : scrolled,
        "pt-10 text-white " : !scrolled
      })}
    >
      <nav 
        className="h-full px-12 py-5 mx-auto flex justify-end relative items-center max-w-screen-2xl" 
        role="navigation"
      >

        {/* Logo */}
        <Link href="/">
          <a aria-label="Company logo">
            <Logo className="fill-current h-10" />
          </a>
        </Link>
        

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
        <div className="flex items-center">
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
              className="ml-20 text-black"
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
