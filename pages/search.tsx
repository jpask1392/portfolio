import Header from "@/components/ui/Header";
import SearchSkeleton from "@/components/templates/Search/SearchSkeleton";
import getGlobalData from "@/utils/getGlobalData";
import { useRouter } from "next/router";
import SearchTemplate from "@/components/templates/Search";
import Layout from "@/components/templates/Layout";
import { useEffect } from "react";
import Container from "@/components/ui/Container";
 
export default function Checkout() {
  const router = useRouter();

  useEffect(() => {
    console.log(router);
  }, [router])

  return (
    <Layout>
      <Container>
        <Header align="center">
          Search
        </Header>

        <SearchSkeleton />

        <SearchTemplate 
          // results={[]}
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
  let sbParams: any = {
    version: preview ? "draft" : "published",
    language: locale,
  };

  if (preview) {
    sbParams.version = "draft";
    sbParams.cv = Date.now();
  }

  try {
    // get global layout information for header, footer etc
    const global = await getGlobalData(sbParams);

    return {
      props: {
        preview,
        global: global ? global.data.story : false,
      },
      revalidate: 3600, // revalidate every hour
    };

  } catch (error) {
    throw new Error(error.message); // stop the build
  }
}