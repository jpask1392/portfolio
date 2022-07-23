import Script from "next/script";
import HeadScripts from "../common/HeadScripts";
import { useGlobalContext } from "../context/globalContext";
import Head from "@/components/common/Head";
import Navigation from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Announcement from "@/components/common/Announcement";
import { sbEditable } from "@storyblok/storyblok-editable";
import { useStoryblok } from "../../utils/storyblok";
import { useUIContext } from "@/components/context/uiContext";
import cn from 'classnames';
import { ReactNode, Component, useEffect } from 'react';
import type { Story, Stories } from '@/types/storyBlok';
import Toasts from "@/components/ui/Toasts";
import useToast from "@/components/hooks/useToast";

// import and register gsap with plugins
import { gsap } from 'gsap';
import CustomEase from "gsap/dist/CustomEase";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);

interface Props {
  children: ReactNode | Component | any
  global?: Story | undefined
  editMode?: boolean
  preview?: boolean
}

const Layout: React.FC<Props> = ({ 
  children,
  editMode,
  preview,
}) => {
  const [ toasts, addToast ] = useToast();
  const { UI, setUI } = useUIContext();

  /**
   * "story" is equivalent to page data,
   * so it should return fields like 'handle', 'id' etc
   */
  let { 
    global,
    story = {}
  } = useGlobalContext();

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
      {/* <HeadScripts /> */}

      <Script 
        src="https://d3hw6dc1ow8pp2.cloudfront.net/reviews-widget-plus/js/okendo-reviews.js"
        strategy="afterInteractive"
      />

      <div className={cn(`slug-${story?.slug || 'default'} relative right-0 transition-all duration-700`, {
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

        <Navigation {...navProps} />

        <div data-scroll-section>
          <main className={cn("flex items-start", {
            "debug-screens" : process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
          })}>
            <div className="main-wrapper overflow-hidden">
              {/* 
                children will be pulled from storyblok 
              */}
              {children}
            </div>
          </main>

          <Footer {...footerProps} />
        </div>
      </div>

      <Toasts />
    </>
  )
};

export default Layout;
