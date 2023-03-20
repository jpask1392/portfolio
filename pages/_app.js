import Script from "next/script";
import "../styles/app.css";
import "../public/fonts/fonts.css";
import { DefaultLayout } from '../components/context/contextLayout';
import { storyblokInit, apiPlugin } from "@storyblok/react";
import { AnimatePresence } from 'framer-motion';
import { pageview } from '@/utils/gtag';
import { useEffect } from "react";

// templates
import Page from "@/components/templates/Page";

// // ui
// import Placeholder from "@/components/ui/Placeholder";
import Container from "@/components/ui/Container";
import Column from "@/components/ui/Column";
import Grid from "@/components/ui/Grid";
import RichText from "@/components/ui/RichText";
import Button from "@/components/ui/Button";
import { ImageModule } from "@/components/ui/Image";
import Header from "@/components/ui/Header";
// import Slideshow from "@/components/ui/Slideshow";
// import Accordion from "@/components/ui/Accordion";
import Icon from '@/components/ui/Icon';
import Select from "@/components/modules/Form";

// modules
import Form from "@/components/modules/Form";
import CustomComponent from "@/components/modules/CustomComponent";
import ReviewsCarousel from "@/components/modules/ReviewsCarousel";
import IndexBody from "@/components/modules/IndexBody";
import AboutMe from "@/components/modules/AboutMe";
import ProjectsList from "@/components/modules/ProjectsList";

const components = {
  page: Page,
  container: Container,
  column: Column,
  header: Header,
  grid: Grid,
  richText: RichText,
  button: Button,
  image: ImageModule,
  form: Form,
  formInput: Select,
  icon: Icon,
  customComponent: CustomComponent,
  reviewsCarousel: ReviewsCarousel,
  indexBody: IndexBody,
  aboutMe: AboutMe,
  projectsList: ProjectsList,
};

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_SB_PREVIEW_ACCESS_TOKEN,
  apiOptions: {},
  use: [apiPlugin],
  components
});

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    router.events.on('routeChangeComplete', pageview)
    return () => {
      router.events.off('routeChangeComplete', pageview)
    }
  }, [router.events])

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
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
      />

      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
          `,
        }}
      /> 

      <div 
        style={{
          backgroundImage: `url(/images/noise.png)`
        }}
        className="fixed z-50 w-full h-full !pointer-events-none bg-[length:250px_250px] md:bg-[length:200px_200px]"
      />

      <AnimatePresence initial={false}>
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
