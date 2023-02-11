import Layout from "@/components/templates/Layout";
import Container from "@/components/ui/Container";

export default function Page404({ global, preview, locale }) {
  const enableBridge = true; // load the storyblok bridge everywhere
  // const enableBridge = preview; // load only inside preview mode
  

  return (
    <Layout>
      
    </Layout>
  );
}

export async function getStaticProps({
  locale,
  locales,
  defaultLocale,
  preview = false,
}) {
  try {
    let sbParams = {
      version: preview ? "draft" : "published", // or "published"
      language: locale,
    };
  
    if (preview) {
      sbParams.version = "draft";
      sbParams.cv = Date.now();
    }

    // get global layout information for header, footer etc
    // let global = await Storyblok.get(`cdn/stories/templates/global-template`, sbParams);

    return {
      props: {
        preview,
        locale,
        locales,
        defaultLocale,
        // global: global ? global.data.story : false,
      },
    };

  } catch (error) {
    throw new Error(error.message); // stop the build
  }
}
