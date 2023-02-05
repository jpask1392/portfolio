import { NextSeo } from "next-seo";
import Layout from "@/components/templates/Layout";

import type { Story } from '@/types/storyBlok';
import { 
  getStoryblokApi, 
  StoryblokComponent,
  useStoryblokState,
} from "@storyblok/react";

export default function Page({
  story,
  preview
} : {
  story: Story | any,
  preview: boolean,
}) {
  story = useStoryblokState(story);

  const seo = ('seo' in story?.content) && story?.content.seo[0]; // only one seo blok

  return (
    <Layout id={story.slug}>
      {/* Page/Product component etc */}
      <StoryblokComponent blok={story?.content} />

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
    resolve_relations: [ "page.template" ],
    language: locale,
  };

  if (preview) {
    sbParams.version = "draft";
    sbParams.cv = Date.now();
  }

  // gets data stored in storyblok
  const storyblokApi = getStoryblokApi();

  // get current page
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

  // get global settings
  let { data: globals } = await storyblokApi.get('cdn/stories/globals', sbParams);

  // get page template
  // let templateSlug = "templates/primary"; // default 
  // if (data && data.story.content.template) templateSlug = data.story.content.template.full_slug;
  // let { data: template } = await storyblokApi.get(`cdn/stories/${templateSlug}`, sbParams);

  return {
    props: {
      preview,
      story: data ? data.story : false,
      globals: globals ? globals.story.content : false,
      // template: template ? template.story : false,
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
    if ( splittedSlug[0] === "settings" ) return;

    paths.push({ params: { slug: splittedSlug } });
  });

  return {
    paths: paths,
    fallback: false,
  };
};