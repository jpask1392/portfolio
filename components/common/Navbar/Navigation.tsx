import { useScrollContext } from "@/components/context/scroll";
import Link from 'next/link';
import Logo, { LogoSmall } from "@/components/ui/Logo";
import cn from "classnames";
import NavigationLink from './NavigationLink';
import { useEffect, useState } from "react";
import type { SbBlokData } from "@storyblok/react"
import { useGlobalContext } from "@/components/context/globalContext";

import { storyblokEditable } from "@storyblok/react";
import type { storyBlokLink, storyBlokImage } from '@/types/storyBlok';
import { useRouter } from "next/router";

interface Blok extends SbBlokData {
  className?: string
  navigationList: any
}

interface NavProps {
  children: any
  blok: Blok
}

const Navigation: React.FC<NavProps> = (props) => {
  const {
    className,
    navigationList,
  } = props.blok || props;

  const [ active, setActive ] = useState(false);
  const router = useRouter();
  const { scroll } = useScrollContext();
  
  return (
    <>
      <header
        id="primary-header"
        {...storyblokEditable(props.blok)}
        className={cn(className, "navigation-bar", {
          "active" : active
        })}
      > 
        <div className="w-full lg:hidden p-1">
          <div className="text-white bg-red rounded-md p-1">
            <nav 
              className="" 
              role="navigation"
            > 
              <ul className="flex flex-wrap">
                {
                  navigationList.map((link: any, i: number) => {
                    return (
                      <li key={i} className="w-full mb-1 last-of-type:mb-0">
                        <div className="border-white border rounded-md text-center relative h-[44px]">
                          <NavigationLink 
                            nav_link={link}
                            // className="h-[44px]"
                          />
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            </nav>
          </div>
        </div>

        <div className="h-[var(--nav-height)] flex w-full">
          <div className="py-1 pl-1 flex w-1/2 lg:min-w-[155px]">
            <div className=" bg-[#000] flex items-center justify-center rounded-md px-8 w-full">
              <Link href="/" onClick={(e) => {
                if (router.asPath === '/') {
                  e.preventDefault();
                  scroll.scrollTo(0)
                }
              }}>
                <LogoSmall className="max-w-[70px] w-full" />
              </Link>
            </div>
          </div>

          <div className="p-1 flex w-1/2 lg:hidden">
            <div className="text-white bg-red rounded-md w-full flex p-1">
              <button 
                className="border-white border uppercase text-sm w-full rounded-md"
                onClick={() => setActive(!active)}
              >
                <span>
                  {active ? "Close" : "Menu"}
                </span>
              </button>
            </div>
          </div>

          <nav 
            className="py-1 px-1 shrink-0 hidden lg:flex" 
            role="navigation"
          > 
            <ul className="h-full flex bg-red rounded-md text-white py-1 px-0.5">
              {
                navigationList.map((link: any, i: number) => {
                  return (
                    <li key={i} className="flex-1 min-w-[7.25rem] text-sm px-0.5">
                      <div className="border-white border rounded-md h-full text-center relative">
                        <NavigationLink 
                          nav_link={link}
                        />
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navigation;
