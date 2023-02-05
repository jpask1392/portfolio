<<<<<<< HEAD
import { motion } from "framer-motion";
import PageProgress from '../common/PageProgress';
import { ScrollContextProvider } from '../context/scroll';
import Mouse from "@/components/ui/Mouse";
=======
import { Toaster } from 'react-hot-toast';
import { StoryblokComponent } from "@storyblok/react";
>>>>>>> refactor
import { useGlobalContext } from "../context/globalContext";
import Head from "@/components/common/Head";
import cn from 'classnames';
import { ReactNode, Component, useEffect } from 'react';
<<<<<<< HEAD
import toast, { Toaster } from 'react-hot-toast';
import { StoryblokComponent } from "@storyblok/react"
import type { StoryData } from "@storyblok/react"
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';

interface Props {
  children: ReactNode | Component | any
  story?: StoryData
}

const Layout: React.FC<Props> = ({ children, background = "background" }) => {
  const {
    preview,
    story: page,
    // config,
    // template,
=======

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
>>>>>>> refactor
  } = useGlobalContext();

  /**
   * Enable editable content using the connected story information
   */
  // const isGlobalEditPage = story.full_slug === "config";
<<<<<<< HEAD
  // const header = isGlobalEditPage ? story.content.header[0] : config.content.header[0]; // header data
  // const footer = isGlobalEditPage ? story.content.footer[0] : config.content.footer[0]; // footer data

  /**
   * Add preview toast
   */
  useEffect(() => {
    preview && (
      toast.success(
        <div className="text-sm">
          You are currently viewing a preview page.<br/>
          This view will display unpublished content. <br/>
          You can exit Preview Mode <a className="underline" href="/api/exit-preview">here.</a>
        </div>
      , {
        position: 'bottom-center',
        duration: 10000
      })
    )
  }, [preview])
=======
  // const header = isGlobalEditPage ? story.content.header[0] : config?.content.header[0]; // header data
  // const footer = isGlobalEditPage ? story.content.footer[0] : config?.content.footer[0]; // footer data
>>>>>>> refactor

  return (
    <>
      <Head seo={false} />

<<<<<<< HEAD
      <ScrollContextProvider>
        <div 
          data-scroll-id="main-scroll-wrapper"
          id={`page-${page?.slug || 'default'}`} 
          className={cn(" flex min-h-[100vh] w-full h-full", {
            [`bg-${background}`] : background,
            "text-white" : background === "black",
          })}
        >
          <div 
            style={{
              backgroundImage: `url(/images/noise.png)`
            }}
            className="absolute z-50 inset-0 pointer-events-none bg-[length:200px_200px]"
          />

          <PageProgress location="left" />
          <PageProgress location="right" />

          <main className={cn("flex-1 relative z-10", {
            "debug-screens" : process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
          })}>
            {children}
          </main>
        </ div>

        <Toaster />
        <Mouse />
      </ScrollContextProvider>
=======
      <main id={id} className={cn({
        "debug-screens" : process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
      })}>
        {children}
      </main>

      <Toaster position="bottom-center" />
>>>>>>> refactor
    </>
  )
};

export default Layout;
