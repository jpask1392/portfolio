import { ScrollContextProvider } from '../context/scroll';
import { Toaster } from 'react-hot-toast';
import { StoryblokComponent } from "@storyblok/react";
import { useGlobalContext } from "../context/globalContext";
import Head from "@/components/common/Head";
import cn from 'classnames';
import { ReactNode, Component, useEffect } from 'react';

interface Props {
  children: ReactNode | Component | any
  preview?: boolean
  id?: string
}

const Layout: React.FC<Props> = ({ 
  children,
  id
}) => {
  let { 
    template,
    story = {},
    config
  } = useGlobalContext();

  /**
   * Enable editable content using the connected story information
   */
  // const isGlobalEditPage = story.full_slug === "config";
  // const header = isGlobalEditPage ? story.content.header[0] : config?.content.header[0]; // header data
  // const footer = isGlobalEditPage ? story.content.footer[0] : config?.content.footer[0]; // footer data

  return (
    <>
      <ScrollContextProvider>
        <Head seo={false} />

        <div 
          data-scroll-section
          style={{
            backgroundImage: `url(/images/noise.png)`
          }}
          className="absolute z-50 w-full h-full !pointer-events-none bg-[length:200px_200px]"
        />

        {children}

        <Toaster position="bottom-center" />
      </ScrollContextProvider>
    </>
  )
};

export default Layout;
