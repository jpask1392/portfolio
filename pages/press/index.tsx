/**
 * Special endpoint to collect a group of press posts
 * from Shopify. Uses a Shopify navigation menu to collect
 * the information needed for the list.
 */
import { getArticlesByBlogHandle } from "@/shopify/operations";
import Column from "@/components/ui/Column";
import Header from "@/components/ui/Header";
import HeroImage from "@/components/modules/HeroImage";
import ArticleTile from "@/components/modules/ArticleTile/ArticleTile";
import getGlobalData from "@/utils/getGlobalData";
import image from 'dummyData/image.json';
import Layout from "@/components/templates/Layout";
import Container from "@/components/ui/Container";
import cn from 'classnames';
import { useEffect, useState, useRef } from "react";

export default function Press({
  preview,
  blog,
} : {
  preview: boolean,
  blog: any
}) {
  /**
   * articles will update via filters
   */
  const [ articles, setArticles ] = useState(blog.articles);
  const [ loading, setLoading ] = useState(false);

  return (
    <Layout preview={preview}>
      <HeroImage 
        image={image}
        style="narrow"
        overlay
        TopBlockComponent={() => (
          <Column
            hAlignContent="center"
            vAlignContent="center"
          >
            <Header tag="h1" size="h1" color="primary">
              {blog.title}
            </Header>
          </Column>
        )}
      />
      <Container 
        clearMargin={['top', 'bottom']} 
        maxWidth="2xl" 
      >
        <div 
          className={cn("xl:ml-[16rem] 2xl:max-w-[calc(100% - 16rem)] 2xl:ml-[15%] 2xl:max-w-[calc(100% - 15%)] transition-opacity py-14 xl:py-24", {
            "opacity-20" : loading
          })}
        >
          <div className="grid gap-x-8 md:gap-x-14 xl:gap-x-28 gap-y-12 md:gap-y-20 grid-cols-2 md:grid-cols-3">
            {
              articles ? (
                articles.map((article: any, i: number) => 
                  <ArticleTile 
                    key={article.id}
                    article={article}
                    index={i}
                    className={cn(i % 2 === 0 ? "bg-primary text-secondary" : "bg-secondary text-primary")}
                  />
                )
              ) : (
                <div>No Posts Found</div>
              )
            }
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
    const blog = await getArticlesByBlogHandle('press');

    return {
      props: {
        preview,
        global: global ? global.data.story : false,
        blog: blog || {},
      },
      revalidate: 3600, // revalidate every hour
    };

  } catch (error) {
    throw new Error(error.message); // stop the build
  }
}
