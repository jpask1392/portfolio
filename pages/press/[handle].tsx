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
      <div className="relative">
        <aside className="hidden xl:block xl:w-[16rem] 2xl:w-[15%] bg-primary absolute inset-y-0 left-0 px-10 py-16 z-10 top-0">
          <div className="h-full overflow-auto">
            
          </div>
        </aside>

        <Container 
          clearMargin={['top', 'bottom']} 
          maxWidth="2xl" 
        >
          <div 
            className={cn("xl:ml-[16rem] 2xl:max-w-[calc(100% - 16rem)] 2xl:ml-[15%] 2xl:max-w-[calc(100% - 15%)] transition-opacity py-14 xl:py-24")}
          >
            <div className={cn("grid gap-x-8 md:gap-x-14 xl:gap-x-28 gap-y-12 md:gap-y-20 grid-cols-2 md:grid-cols-3")}>
              {article.title}
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
