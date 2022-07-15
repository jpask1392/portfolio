import useAccount from "@/components/hooks/useAccount";
import AccountTemplate, { AccountSkeleton } from "@/components/templates/Account";
import { useEffect, useState } from "react";
import Layout from "@/components/templates/Layout";
import getGlobalData from "@/utils/getGlobalData";

export default function Account() {
  const { account, handleAccountLogout } = useAccount();

  return (
    <Layout>
      {
        account 
          ? <AccountTemplate 
              account={account} 
              handleLogout={handleAccountLogout}
            />
          : <AccountSkeleton />
      }
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