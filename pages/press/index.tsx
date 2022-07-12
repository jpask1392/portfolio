/**
 * Special endpoint to collect a group of press posts
 * from Shopify. Uses a Shopify navigation menu to collect
 * the information needed for the list.
 */
import SideFilterLayout from '@/components/templates/SideFilterLayout'
import { getArticlesByBlogHandle } from "@/shopify/operations";
import Column from "@/components/ui/Column";
import Header from "@/components/ui/Header";
import HeroImage from "@/components/modules/HeroImage";
import ArticleTile from "@/components/modules/ArticleTile/ArticleTile";
import getGlobalData from "@/utils/getGlobalData";
import Layout from "@/components/templates/Layout";
import Container from "@/components/ui/Container";
import cn from 'classnames';
import { useEffect, useState, useRef } from "react";
import Masonry from 'react-masonry-css'


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
        image={false}
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

      <SideFilterLayout 
        Filters={() => {
          return (
            <div>Filters</div>
          )
        }}

        Content={() => (
          <>
            <Masonry
              breakpointCols={3}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {
                articles ? (
                  articles.map((article: any, i: number) => 
                    <ArticleTile 
                      key={article.id}
                      article={article}
                      index={i}
                    />
                  )
                ) : (
                  <div>No Posts Found</div>
                )
              }
            </Masonry>
          </>
        )}
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
