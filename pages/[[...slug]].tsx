/**
 * NOTES:
 * 
 * This endpoint renders all pages from Storyblok. 
 * 
 * Pages not requiring any information from Storyblok's editor 
 * will be loaded through different files and use the globalContext
 * for collecting global information.
 * 
 */

// @see: https://www.storyblok.com/tp/add-a-headless-cms-to-next-js-in-5-minutes

import { NextSeo } from "next-seo";
import Layout from "@/components/templates/Layout";
import type { StoryData } from "@storyblok/react";
// import { getPlaiceholder } from "plaiceholder";

import { 
  getStoryblokApi, 
  StoryblokComponent,
  useStoryblokState,
 } from "@storyblok/react"

export default function Page({
  story,
  template,
} : {
  story: StoryData,
  template: StoryData,
}) {
  // connect to storyblok
  story = useStoryblokState(story, {
    resolveRelations: ["teamPlane.members"],
  });

  // get seo blok
  const seo = story && ('seo' in story.content) && story?.content.seo[0]; // only one seo blok

  return (
    <Layout story={story}>
      <StoryblokComponent blok={story.content} />

      <NextSeo
        title={seo?.title || story.name}
        description={seo?.description || ''}
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
    resolve_relations: [],
    language: locale,
  };

  if (preview) {
    sbParams.version = "draft";
    sbParams.cv = Date.now();
  }

  // gets a single story's data from StoryBlok
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
  // let { data: config } = await storyblokApi.get('cdn/stories/config', sbParams); // page/template
  // let { data: settings } = await storyblokApi.get('cdn/stories/settings', sbParams); // global settings

  return {
    props: {
      story: data ? data.story : false,
      // config: config ? config.story : false,
      // settings: settings ? settings.story : false,
      // template: template ? template.story : false,
      preview,
    },
    revalidate: 3600, // revalidate every hour
  };
}


/**
 * Function generates an array of URL's to pass 
 * through to getStaticProps(). 
 * 
 * See here: https://nextjs.org/docs/basic-features/data-fetching/get-static-paths
 */
export async function getStaticPaths({ locales } : { locales: any }) {
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get("cdn/links/");
 
  let paths: any = [];
  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder) {
      return;
    }
 
    const slug = data.links[linkKey].slug;
    let splittedSlug = slug.split("/");
    if (slug === "home") splittedSlug = false;
 
    paths.push({ params: { slug: splittedSlug } });
  });

  return {
    paths: paths,
    fallback: false,
  };
};