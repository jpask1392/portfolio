/**
 * Special endpoint to collect a group of collections
 * from Shopify. Uses a Shopify navigation menu to collect
 * the information needed for the list.
 */

 import CollectionSubheader from "@/components/modules/CollectionSubheader";
 import getGlobalData from "@/utils/getGlobalData";
 import Layout from "@/components/templates/Layout";
 import Container from "@/components/ui/Container";
 import Breadcrumbs from "@/components/ui/Breadcrumbs";
 import DynamicIcon from "@/components/icons/DynamicIcon";
 import ProductFilters from "@/components/ecommerce/ProductFilters";
 import { SortButton } from "@/components/ecommerce/ProductFilters";
 import ProductTile from "@/components/ecommerce/ProductTile";
 import HeroCollection from "@/components/modules/HeroCollection";
 import cn from 'classnames';
 import { GetStaticPaths } from 'next';
 
 
 import type { Story } from '@/types/storyBlok';
 import { useEffect, useState, useRef } from "react";
 import useToast from "@/components/hooks/useToast";
 
 // make sure this only loads backend
 import { getCollectionByHandle } from "@/shopify/operations";
 
 export default function Collection({
   global,
   preview,
   initalCollection,
 } : {
   preview: boolean,
   global: Story | undefined
   initalCollection: any
 }) {
   /**
    * Can set a default state of collection from 
    * statically built pages. 
    * 
    * Note that if filters get updated within Shopify, 
    * we will need to trigger a rebuild by either re-publishing
    * a collection/product or manually triggering it in Vercel.
    * 
    */
   const [ collection, setCollection ] = useState(initalCollection);
   const [ loading, setLoading ] = useState(false);
   const [ toasts, addToast ] = useToast();
   const [ sortKey, setSortKey ] = useState({key: "COLLECTION_DEFAULT", reverse: false});
   const [ currentFilters, setCurrentFilters ]  = useState([]);
   const didMountRef = useRef(false);
 
   // use initial filter from static props to maintain max price
   const initialPriceFilters = initalCollection.filters.find((el: any) => el.label === 'Price');
 
   // runs if childs state changes
   const handleDataChange = (filters: any) => {
     setCurrentFilters(filters);
   }
 
   useEffect(() => {
     if (didMountRef.current) {
       (async () => {
         setLoading(true);
   
         try {
           // send query to API
           const res = await fetch(`/api/catalog/collections`, {
             method: "POST",
             headers: {
               "content-type" : "application/json"
             },
             body: JSON.stringify({
               handle: initalCollection.handle,
               filters: currentFilters,
               sortKey: sortKey.key,
               reverse: sortKey.reverse,
             })
           });
     
           const collection = await res.json();
     
           if (collection) setCollection(collection);
         } catch (err) {
           addToast({
             message: "Something went wrong",
             style: "error"
           })
         }
     
         setLoading(false)
       })()
     }
 
     didMountRef.current = true;
   }, [currentFilters, sortKey])
 
   useEffect(() => {
     // initial collection changes on page re-route
     setCollection(initalCollection)
   }, [initalCollection])
 
   return (
     <Layout global={global} preview={preview}>
       <Container>
         <div className="flex flex-wrap -mx-5 items-start">
           <div className={cn("lg:w-4/12 xl:w-3/12 hidden lg:block w-full px-5")}>
             {
               collection.filters ? (
                 <ProductFilters 
                   collection={collection}
                   onDataChange={handleDataChange}
                   initialPriceFilters={initialPriceFilters}
                 />
               ) : null
             }

            <SortButton 
              setSortKey={setSortKey}
              sortKey={sortKey}
            />
           </div>
 
           <div className={cn("px-5 mx-auto w-full lg:w-8/12 xl:w-9/12")}>
             <div className="relative">
               <div className="flex justify-end space-x-10 text-sm mb-10 m:mb-0 md:absolute top-0 right-0 z-10">
                 
               </div>
             </div>
             <div className={cn("grid gap-6 lg:gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3")}>
               {
                 collection?.products?.map((product: any, i: number) => 
                   <ProductTile key={product.id} product={product}/>
                 )
               }
             </div>
           </div>
         </div>
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
     const collection = await getCollectionByHandle(handle);
 
     return {
       props: {
         preview,
         global: global ? global.data.story : false,
         initalCollection: collection || {filters: [], products: []}
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
         collections(first: 250) {
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
   const collectionUrls = data
     .collections
     .edges
     .map(({ node }: {node: any}) => node.handle);
 
   collectionUrls.forEach((pathSlug: string) => {
     pathSlug && paths.push({ params: { handle: pathSlug } });
   });
 
   return {
     paths: paths,
     fallback: false,
   };
 };