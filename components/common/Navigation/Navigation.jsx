import { useRouter } from "next/router";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import MobileMenuIcon from "/public/images/MobileMenu.svg";
import { useState } from "react";
import Logo2x from "/public/images/logo-2x.png";
import Link from "next/link";
import Socials from "@/components/common/Socials";
import cn from 'classnames'
import { CustomConnectButton } from "@/components/CustomConnectButton";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

const Navigation = ({
  links = false,
  cta = false,
  showSocials = false,
  headerText,
  border = false,
}) => {
  const router = useRouter();
  const [ toggleMobileMenu, setToggleMobileMenu ] = useState(false);

  const openMobileMenu = () => {
    document.querySelector("body").classList.add("overflow-hidden");
    setToggleMobileMenu(true);
  };

  const closeMobileMenu = () => {
    document.querySelector("body").classList.remove("overflow-hidden");
    setToggleMobileMenu(false);
  };

  return (
    <header className={cn("fixed z-20 w-full bg-white", {
      "border-b border-blue" : border
    })}>
      <nav className="container mx-auto nav-shadow md:nav-shadow top-0 flex w-full items-center justify-between bg-white py-6 md:z-10 md:bg-transparent">
          <Link legacyBehavior={true} href="/">
            <a>
              <div className="md:hidden">
                <Image
                  src={Logo2x}
                  alt="Collective Strangers Logo"
                  width={74}
                  height={27}
                />
              </div>
              <div className="hidden md:inline">
                <Image
                  src={Logo2x}
                  alt="Collective Strangers Logo"
                  width={150*0.85}
                  height={56*0.85}
                />
              </div>
            </a>
          </Link>
          

          {
            headerText ? (
              <div className="font-body hidden md:block">
                <p>{headerText}</p>
              </div>
            ) : null
          }

          <div className={cn("hidden", {
            "font-body md:flex w-2/3 text-lg md:justify-end" : (links || cta),
          })}>
            {
              links ? (
                <ul className="flex md:items-center">
                  {
                    links.map(({
                      title,
                      anchor,
                      link
                    }, index) => (
                      <li className="ml-8 lg:ml-16 text-right" key={index}>
                        <Link legacyBehavior={true} href={link + (anchor ? `#${anchor}` : "")} >
                          <a className="before:invisible before:ml-0 before:block before:h-0 before:overflow-hidden before:font-semibold after:text-[0px] hover:font-semibold">
                            {title}
                          </a>
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              ) : null
            }
            
            {
              cta ? (
                <CustomConnectButton toast={toast} />
              ) : null
            }
          </div>

          {
            links ? (
              <button
                onClick={() => openMobileMenu()}
                type="button"
                className="flex md:hidden"
                id="hambuger-menu"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span className="sr-only">Open user menu</span>
                <Image
                  className="h-8 w-8"
                  src={MobileMenuIcon}
                  alt="Mobile Hamburger Menu Icon"
                />
              </button>
            ) : null
          }

          { showSocials ? <Socials /> : null }
      </nav>

      { 
        toggleMobileMenu ? (
          <MobileMenu 
            closeMobileMenu={closeMobileMenu}
            links={links}
          /> ) : null
      }
    </header>
  );
}

export default Navigation;
