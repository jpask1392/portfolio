/**
 * Special endpoint to collect a group of collections
 * from Shopify. Uses a Shopify navigation menu to collect
 * the information needed for the list.
 */

import getGlobalData from "@/utils/getGlobalData";
import Layout from "@/components/templates/Layout";
import Storyblok from "@/utils/storyblok";
import Container from "@/components/ui/Container";
import CollectionsGrid from "@/components/ecommerce/CollectionsGrid";
import type { Story } from '@/types/storyBlok';

 // make sure this only loads backend
 import { getCollectionsByQuery } from "@/shopify/operations";

export default function Collections({
  global,
  preview,
  collections = [],
} : {
  preview: boolean,
  global: Story | undefined
  collections: any[]
}) {
  
  return (
    <Layout global={global} preview={preview}>
      <Container spacing="sm">
        <CollectionsGrid
          collections={collections}
        />
      </Container>
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
  let handle = params.handle || "";

  let sbParams: any = {
    version: preview ? "draft" : "published", // or "published"
    language: locale,
  };

  if (preview) {
    sbParams.version = "draft";
    sbParams.cv = Date.now();
  }

  try {
    // get global layout information for header, footer etc
    const global = await getGlobalData(sbParams);

    /**
     * Shopify API does not offer any way to filter collections other than: 
     * - collection_type
     * - title
     * - updated_at
     * 
     * It also does not allow us to search for menus which is the usual way to 
     * do this sort of thing. A workaround is to add a prefix in the title
     * and remove it from the frontend display. I opted for the format {filter}*{collectionName}.
     */

    // normalize the data
    const collections = await getCollectionsByQuery(`title:${handle}*`);

    return {
      props: {
        preview,
        global: global ? global.data.story : false,
        collections: collections
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
  let paths: any[] = [];

  // get a list of the slugs
  const res = await fetch('https://jamiepask-devstore.myshopify.com/api/2022-01/graphql.json', {
    'method': 'POST',
    'headers': {
      'X-Shopify-Storefront-Access-Token': 'f091cd29f52368a7d7be3af5d049e774',
      'Content-Type': 'application/graphql',
    },
    'body': `
      {
        collections(first: 250) {
          edges {
            node {
              title
            }
          }
        }
      }
    `
  });

  const { data } = await res.json();

  // normalize the data
  const collectionUrls = data
    .collections
    .edges
    .map(({ node }: {node: any}) => {
      if (node.title.split('*').length === 1) {
        return false;
      } else {
        return node.title.split('*')[0]
      }
    });

  const uniq = [...new Set(collectionUrls)];

  uniq.forEach((pathSlug) => {
    pathSlug && paths.push({ params: { handle: pathSlug } });
  });

  return {
    paths: paths,
    fallback: false,
  };
};