/**
 * Special endpoint to collect product from Shopify
 * Should also allow customization from within Storyblok
 */

import getGlobalData from "@/utils/getGlobalData";
import Layout from "@/components/templates/Layout";
import DynamicComponent from "@/components/helpers/DynamicComponent";
import Storyblok, { useStoryblok } from "@/utils/storyblok";
import Container from "@/components/ui/Container";
import ProductMain from "@/components/ecommerce/ProductMain";
import FeaturedProducts from "@/components/ecommerce/FeaturedProducts";
import Column from "@/components/ui/Column";
import Header from "@/components/ui/Header";
import { SbEditableContent } from "@/types/storyBlok";
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
   
  return (
    <Layout global={global} preview={preview}>
      <Container spacing="sm">
        <ProductMain 
          product={product} 
        >
          {
            story?.content?.additionalDesc.map((blok: SbEditableContent) => (
              <DynamicComponent 
                blok={blok} 
                key={blok._uid} 
              />
            ))
          }
        </ProductMain>
      </Container>

        {
          story && (
            <DynamicComponent 
              blok={story?.content || {}}
            />
          )
        }

      <Container>
        <Column>
          <Header>
            You Might Also Like
          </Header>
        </Column>

        <Column extendToEdge={true} padTop="sm">
          <FeaturedProducts
            collectionHandle="recommendations" 
            productID={product.id}
          />
        </Column>
      </Container>

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
  const res = await fetch('https://jamiepask-devstore.myshopify.com/api/2022-01/graphql.json', {
    'method': 'POST',
    'headers': {
      'X-Shopify-Storefront-Access-Token': 'f091cd29f52368a7d7be3af5d049e774',
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