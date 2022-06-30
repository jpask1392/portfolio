/**
 * Special endpoint to collect a group of collections
 * from Shopify. Uses a Shopify navigation menu to collect
 * the information needed for the list.
 */
import PostTile from "@/components/modules/PressTile/PressTile";
import { useSmoothScrollContext } from "@/components/context/smoothScrollContext";
import Column from "@/components/ui/Column";
import Header from "@/components/ui/Header";
import HeroImage from "@/components/modules/HeroImage";
import getGlobalData from "@/utils/getGlobalData";
import Layout from "@/components/templates/Layout";
import Container from "@/components/ui/Container";
import cn from 'classnames';
import type { Story } from '@/types/storyBlok';
import { useEffect, useState, useRef } from "react";
import useToast from "@/components/hooks/useToast";

// make sure this only loads backend
import { getCollectionByHandle } from "@/shopify/operations";

export default function Collection({
  global,
  preview,
} : {
  preview: boolean,
  global: Story | undefined
}) {
  const [ posts, setPosts ] = useState([
    {
      title: "INC",
      sub: "sub",
      excerpt: "excerpt",
      link: "link"
    }
  ]);
  const [ loading, setLoading ] = useState(false);
  const [ toasts, addToast ] = useToast();
  const [ currentFilters, setCurrentFilters ]  = useState({filters: [], sortKey: {key: "COLLECTION_DEFAULT", reverse: false}});
  const didMountRef = useRef(false);
  const { scroll } : { scroll: any } = useSmoothScrollContext();

  // use initial filter from static props to maintain max price
  // const initialPriceFilters = initalCollection.filters.find((el: any) => el.label === 'Price');

  // runs if childs state changes
  // const handleDataChange = (filters: any) => {
  //   setCurrentFilters(filters);
  // }

  // useEffect(() => {
  //   if (didMountRef.current) {
  //     (async () => {
  //       setLoading(true);
  
  //       try {
  //         // send query to API
  //         const res = await fetch(`/api/catalog/collections`, {
  //           method: "POST",
  //           headers: {
  //             "content-type" : "application/json"
  //           },
  //           body: JSON.stringify({
  //             handle: initalCollection.handle,
  //             filters: currentFilters.filters,
  //             sortKey: currentFilters.sortKey.key,
  //             reverse: currentFilters.sortKey.reverse,
  //           })
  //         });
    
  //         const collection = await res.json();
    
  //         if (collection) setCollection(collection);
  //         scroll && scroll.update();
  //       } catch (err) {
  //         addToast({
  //           message: "Something went wrong",
  //           style: "error"
  //         })
  //       }
    
  //       setLoading(false)
  //     })()
  //   }

  //   didMountRef.current = true;
  // }, [currentFilters])

  // useEffect(() => {
  //   // initial collection changes on page re-route
  //   setCollection(initalCollection)
  // }, [initalCollection])

  return (
    <Layout global={global} preview={preview}>
      {/* <HeroImage 
        image={{}}
        style="narrow"
        overlay
        TopBlockComponent={() => (
          <Column
            hAlignContent="center"
          >
            <Header tag="h1" size="h1" color="primary">
              Press Coverage
            </Header>
          </Column>
        )}
      /> */}

      <div className="relative">
        <aside className="hidden xl:block xl:w-[16rem] 2xl:w-[15%] bg-primary absolute inset-y-0 left-0 px-10 py-16 z-10 top-0">
          <div className="h-full overflow-auto">
            Filters
            {/* {
              collection.filters ? (
                <ProductFilters 
                  collection={collection}
                  onDataChange={handleDataChange}
                  initialPriceFilters={initialPriceFilters}
                />
              ) : null
            } */}
          </div>
        </aside>

        <Container 
          clearMargin={['top', 'bottom']} 
          maxWidth="2xl" 
        >
          <div 
            className={cn("xl:ml-[16rem] 2xl:max-w-[calc(100% - 16rem)] 2xl:ml-[15%] 2xl:max-w-[calc(100% - 15%)] transition-opacity py-14 xl:py-24", {
              "opacity-20" : loading
            })}
          >
            <div className={cn("grid gap-x-8 md:gap-x-14 xl:gap-x-28 gap-y-12 md:gap-y-20 grid-cols-2 md:grid-cols-3")}>
              {
                posts ? (
                  posts.map((post: any, i: number) => 
                    <PostTile key={post.id} post={post}/>
                  )
                ) : (
                  <div>No Posts Found</div>
                )
              }
            </div> 
          </div>
        </Container>
      </div>
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
  // let handle = params.handle || "";

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
    // const collection = await getCollectionByHandle(handle);

    return {
      props: {
        preview,
        global: global ? global.data.story : false,
        // initalCollection: collection || { filters: [], products: [] }
      },
      revalidate: 3600, // revalidate every hour
    };

  } catch (error) {
    throw new Error(error.message); // stop the build
  }
}
