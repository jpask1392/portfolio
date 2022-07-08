/**
 * Special endpoint to collect a group of collections
 * from Shopify. Uses a Shopify navigation menu to collect
 * the information needed for the list.
 */
import CollectionTemplate from "@/components/templates/Collection/Collection";
import { useRouter } from "next/router";
import getGlobalData from "@/utils/getGlobalData";
import Layout from "@/components/templates/Layout";

import type { Story } from '@/types/storyBlok';
import { useEffect, useState, useRef } from "react";
import useToast from "@/components/hooks/useToast";

// make sure this only loads backend
import { 
  getCollectionByHandle,
  getResourcePaths
} from "@/shopify/operations";

export default function Collection({
  preview,
  initalCollection,
} : {
  preview: boolean,
  initalCollection: any
}) {
  return (
    <Layout preview={preview}>
      <CollectionTemplate 
        initalCollection={initalCollection}
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
    const collection = await getCollectionByHandle(handle, {
      productFilters: [{"price":{"min":0,"max":1000000}}]
    });

    return {
      props: {
        preview,
        global: global ? global.data.story : false,
        story: {
          ...collection,
          slug: collection?.handle
        },
        initalCollection: collection || { filters: [], products: [] }
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
  let paths: any[] = await getResourcePaths('collections') || [];

  return {
    paths: paths,
    fallback: true,
  };
};