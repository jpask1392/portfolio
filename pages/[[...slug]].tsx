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
  story = useStoryblokState(story, {
    resolveRelations: [
      "reviewsCarousel.reviews",
      "projectsList.projects"
    ],
  });

  return (
    <Layout id={story.slug}>
      {/* Page/Product component etc */}
      <StoryblokComponent blok={story?.content} />
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
      "reviewsCarousel.reviews",
      "projectsList.projects"
    ],
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
 
    const slug = data.links[linkKey].slug;
    let splittedSlug = slug.split("/");
    if (slug === "home") splittedSlug = false;

    /**
     * Do not try and get static paths for these elements.
     * Product pages are generated differently.
     * Settings content types do not need paths.
     *
     */
     const ignoredPaths = [
      "project",
      "reviews",
      "settings",
      "global-template",
      "config",
      "login",
      "templates"
    ];

    if (ignoredPaths.some((item) => slug.includes(item))) return;
    paths.push({ params: { slug: splittedSlug } });
  });

  return {
    paths: paths,
    fallback: false,
  };
};