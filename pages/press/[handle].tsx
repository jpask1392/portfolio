import Header from "@/components/ui/Header";
import getGlobalData from "@/utils/getGlobalData";
import Layout from "@/components/templates/Layout";
import Container from "@/components/ui/Container";
import cn from 'classnames';

import { 
  getArticleByHandle,
  getResourcePaths 
} from "@/shopify/operations";

export default function Collection({
  preview,
  article,
} : {
  preview: boolean,
  article: any
}) {
  return (
    <Layout preview={preview}>
      <Container maxWidth="lg">
        <Header>{article.title}</Header>
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
    const article = await getArticleByHandle(handle, "press");

    return {
      props: {
        preview,
        global: global ? global.data.story : false,
        article: article || null,
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
  let paths: any[] = await getResourcePaths("articles") || [];

  return {
    paths: paths,
    fallback: false,
  };
};
