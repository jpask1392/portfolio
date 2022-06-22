import Head from "@/components/common/Head";
import Navigation from "@/components/common/Navbar";
import SideNavigation from "@/components/common/SideNavigation";
import Footer from "@/components/common/Footer";
import Announcement from "@/components/common/Announcement";
import dummyCollections from 'dummyData/collections.json';
import { sbEditable } from "@storyblok/storyblok-editable";
import { useStoryblok } from "../../utils/storyblok";
import CartDrawer from "@/components/ecommerce/CartDrawer";
import { useUIContext } from "@/components/context/uiContext";
import cn from 'classnames';

// import and register gsap with plugins
import { gsap } from 'gsap';
import CustomEase from "gsap/dist/CustomEase";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);

import { ReactNode, Component, useEffect } from 'react';
import type { Story, Stories } from '@/types/storyBlok';

import Toasts from "@/components/ui/Toasts";
import useToast from "@/components/hooks/useToast";

// dummy data - remove when going live
import navigationList from 'dummyData/navigation.json';
import dummyFooter from 'dummyData/footerNavigation.json';

interface Props {
  children: ReactNode | Component | any
  global?: Story | undefined
  editMode?: boolean
  preview?: boolean
}

const Layout: React.FC<Props> = ({ 
  children, 
  global,
  editMode,
  preview,
}) => {
  const [ toasts, addToast ] = useToast();
  const { UI, setUI } = useUIContext();

  // use hook for live update connection in StoryBlok
  global = useStoryblok(global, editMode);

  let navProps: any = {};
  let footerProps: any = {};
  let sideNavigationProps: any = {};

  if (global?.content) {
    const { footer, header } = global.content;
    const settings: any = global.settings ? global.settings.content : null;
    // const { footer, header } = global.content;
    navProps = { ...header[0] };
    footerProps = { ...footer[0], socials: settings?.socials };
    sideNavigationProps = { collections: settings?.collectionNavigation };

    // add editable data here to be used in Storyblok:
    navProps.sbEditable = { ...sbEditable(header[0]) }
  } else {
    // use dummy data if not connected to Storyblok
    navProps = { navigationList : navigationList };
    footerProps = { 
      menuOne : dummyFooter[0],
      menuTwo : dummyFooter[1],
      menuThree : dummyFooter[2] 
    }
  }

  useEffect(() => {
    (preview && toasts.length === 0) && (
      addToast({
        title: "Preview Mode",
        message: `You are currently viewing a preview page. This view will display unpublished content. You can exit Preview Mode <a class="underline" href="/api/exit-preview">here.</a>`,
        style: "info"
      })
    )
  }, [preview])

  return (
    <>
      <Head seo={false} />
      <div className={cn("relative right-0 transition-all duration-700", {
        "right-cart" : UI.cartActive
      })}>
        
        {
          navProps.announcementDisplay ? (
            <Announcement 
              announcementLink={navProps.announcementLink}
              announcementText={navProps.announcementText}
              announcementTitle={navProps.announcementTitle}
            />
          ) : null
        }

        <main className="debug-screens flex items-start">
          <SideNavigation {...sideNavigationProps} />

          <div className="main-wrapper">
            <Navigation {...navProps} />

            {/* children will be pulled from storyblok */}
            {children}
          </div>

        </main>

        <Footer {...footerProps} />
        <CartDrawer />
      </div>

      <Toasts />
    </>
  )
};

export default Layout;
