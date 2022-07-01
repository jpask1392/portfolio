// https://www.storyblok.com/tp/next-js-react-guide

import getGlobalData from "@/utils/getGlobalData";
import { NextSeo } from "next-seo";
import Layout from "@/components/templates/Layout";
import DynamicComponent from "@/components/helpers/DynamicComponent";

import Storyblok, { useStoryblok } from "../utils/storyblok";

import type { Story } from '@/types/storyBlok';

export default function Page({
  story,
  global,
  preview,
} : {
  story: Story | any,
  preview: boolean,
  global: Story | undefined
}) {
  // use the preview variable to enable the bridge only in preview mode
  // const enableBridge = preview;
  const enableBridge = true; // load the storyblok bridge everywhere
  story = useStoryblok(story, enableBridge);

  const seo = ('seo' in story?.content) && story?.content.seo[0]; // only one seo blok

  return (
    <Layout 
      global={global} 
      editMode={story?.slug === 'global-template'}
      preview={preview}
    >
      {/* 
        This is a top level DynamicComponent and will usually be "Page".
        It can be used for other content types coming from Storyblok too.
      */}
      <DynamicComponent 
        blok={story?.content || {}}
      />

      <NextSeo
        title={seo?.title || story.name}
        description={seo?.description || ''}
        // noindex={true | false}
      />
    </Layout>
  );
}

/**
 * Function is run on every page generated from
 * getStaticPaths() and pages directory. 
 * 
 * See here: https://nextjs.org/docs/basic-features/data-fetching/get-static-props
 */
export async function getStaticProps({
  locale,
  params,
  preview = false,
} : {
  locale: string
  params: any
  preview: boolean,
}) {
  let slug = params.slug ? params.slug.join("/") : "home";

  let sbParams: any = {
    version: preview ? "draft" : "published",
    resolve_relations: [
      // "featured-posts.posts",
    ],
    language: locale,
  };

  if (preview) {
    sbParams.version = "draft";
    sbParams.cv = Date.now();
  }

  try {
    // gets a single story's data from StoryBlok
    let { data } = await Storyblok.get(`cdn/stories/${slug}`, sbParams);
    // get global layout information for header, footer etc
    const global = await getGlobalData(sbParams);

    return {
      props: {
        story: data ? data.story : false,
        preview,
        global: global ? global.data.story : false,
      },
      revalidate: 3600, // revalidate every hour
    };

  } catch (error) {
    throw new Error(error.message); // stop the build
  }
}


/**
 * Function generates an array of URL's to pass 
 * through to getStaticProps(). 
 * 
 * See here: https://nextjs.org/docs/basic-features/data-fetching/get-static-paths
 */
export async function getStaticPaths({ locales } : { locales: any }) {
  let { data } = await Storyblok.get("cdn/links/");

  let paths: any[] = [];
  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder) {
      return;
    }

    // get array for slug because of catch all
    const slug = data.links[linkKey].slug;
    let splittedSlug = slug.split("/");
    if (slug === "home") splittedSlug = false;

    // remove 'product' paths - duplicates are not allowed    
    if (
      splittedSlug[0] === "product"
      || splittedSlug[0] === "settings"
    ) return;

    paths.push({ params: { slug: splittedSlug } });
  });

  return {
    paths: paths,
    fallback: false,
  };
};