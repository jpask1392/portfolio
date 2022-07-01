/**
 * Special endpoint to collect product from Shopify
 * Should also allow customization from within Storyblok
 */

import ProductTemplate from "@/components/templates/Product";
import ProductGiftCardsTemplate from "@/components/templates/ProductGiftCards";

import getGlobalData from "@/utils/getGlobalData";
import Layout from "@/components/templates/Layout";
import Storyblok, { useStoryblok } from "@/utils/storyblok";
import { NextSeo } from "next-seo";

import type { Story } from '@/types/storyBlok';

// make sure this only loads server side
import { getProductByHandle } from "@/shopify/operations";
 
 export default function Product({
   global,
   preview,
   product,
   story,
 } : {
   preview: boolean,
   global: Story | undefined
   product: any
   story: Story | any
 }) {
  // use the preview variable to enable the bridge only in preview mode
  const enableBridge = preview && story;
  // const enableBridge = true; // load the storyblok bridge everywhere
  story = useStoryblok(story, enableBridge);

  // To be passed in to all templates
  const templateDefaultProps = {
    product: product,
    story: story,
  }

  // Base the object on products productType.
  const productTemplateMap: any = {
    "Gift Cards" : <ProductGiftCardsTemplate {...templateDefaultProps} />
  }
   
  return (
    <Layout global={global} preview={preview}>

      {
        product.productType in productTemplateMap ? (
          productTemplateMap[product.productType]
        ) : (
          <ProductTemplate 
            product={product}
            story={story}
          />
        )
      }
      
      <NextSeo
        title={product.seo.title}
        description={product.seo.description}
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

  let productDataSB: any = false;

  try {
    // gets a single story's data from StoryBlok
    productDataSB = await Storyblok.get(`cdn/stories/product/${handle}`, sbParams);
  } catch (err) {
    // console.log('product not found in Storyblok')
  }
  

  try {
    // get global layout information for header, footer etc
    const global = await getGlobalData(sbParams);
    const product = await getProductByHandle(handle);

    return {
      props: {
        preview,
        global: global ? global.data.story : false,
        product: product,
        story: productDataSB?.data ? productDataSB.data.story : false,
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
  const res = await fetch('https://valentino-beauty-development.myshopify.com/api/2022-01/graphql.json', {
    'method': 'POST',
    'headers': {
      'X-Shopify-Storefront-Access-Token': '2702b535ff14624f836147118cb2f315',
      'Content-Type': 'application/graphql',
    },
    'body': `
      {
        products(first: 250) {
          edges {
            node {
              handle
            }
          }
        }
      }
    `
  });
 
  const { data } = await res.json();
 
  // normalize the data
  const productURLs = data
    .products
    .edges
    .map(({ node }: {node: any}) => node.handle);
 
  productURLs.forEach((pathSlug: string) => {
    pathSlug && paths.push({ params: { handle: pathSlug } });
  });
 
  return {
    paths: paths,
    fallback: false,
  };
};