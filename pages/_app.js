// import "tailwindcss/tailwind.css";
import "../styles/app.css";
import { DefaultLayout } from '../components/context/contextLayout';
import { storyblokInit, apiPlugin } from "@storyblok/react";
import Script from 'next/script';
import { useRouter } from 'next/router';
import { pageview } from '@/utils/gtag';
import { useEffect } from "react";
import { AnimatePresence } from 'framer-motion'


// templates
import Page from "@/components/templates/Page";
import Navigation from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";


// modules
import Placeholder from "@/components/ui/Placeholder";
import Container from "@/components/ui/Container";
import Column from "@/components/ui/Column";
import Grid from "@/components/ui/Grid";
import RichText from "@/components/ui/RichText";
import ButtonGroup from "@/components/ui/ButtonGroup";
import Button from "@/components/ui/Button";
import { ImageModule } from "@/components/ui/Image";
import Header from "@/components/ui/Header";
import Video from "@/components/ui/Video";
import Slideshow from "@/components/ui/Slideshow";
import Accordion from "@/components/ui/Accordion";
import Tabs from "@/components/ui/Tabs";
import Marquee from "@/components/ui/Marquee";
import Table from "@/components/ui/Table";
import { Input } from "@/components/ui/Inputs";
import CustomComponent from "@/components/modules/CustomComponent";

import Icon from '@/components/ui/Icon';

const components = {
  primaryHeader: Navigation,
  footer: Footer,
  placeholder: Placeholder,
  page: Page,
  container: Container,
  column: Column,
  grid: Grid,
  richText: RichText,
  buttonGroup: ButtonGroup,
  button: Button,
  header: Header,
  slideshow: Slideshow,
  accordion: Accordion,
  tabs: Tabs,
  marquee: Marquee,
  table: Table,
  image: ImageModule,
  video: Video,
};

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_SB_PREVIEW_ACCESS_TOKEN,
  apiOptions: { 
    resolve_relations: []
  },
  use: [apiPlugin],
  components
});


function MyApp({ Component, pageProps, router }) {
  // useEffect(() => {
  //   router.events.on('routeChangeComplete', pageview)
  //   return () => {
  //     router.events.off('routeChangeComplete', pageview)
  //   }
  // }, [router.events])

  const getLayout = Component.getLayout || (
    page => (
      <DefaultLayout
        key={router.asPath}
        pageProps={pageProps}
      >{page}</DefaultLayout>
    )
  )

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      {/* <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}
      />

      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GA_TRACKING_ID}');
          `,
        }}
      /> */}

      <AnimatePresence mode="popLayout" initial={false}>
        {
          getLayout(
            <Component 
              {...pageProps} 
            />
          )
        }
      </AnimatePresence>
    </>
  );
}

export default MyApp;
