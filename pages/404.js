import Layout from "@/components/templates/Layout";
import DynamicComponent from "@/components/helpers/DynamicComponent";
import Container from "@/components/ui/Container";

import Storyblok, { useStoryblok } from "../utils/storyblok";

export default function Page404({ global, preview, locale }) {
  const enableBridge = true; // load the storyblok bridge everywhere
  // const enableBridge = preview; // load only inside preview mode
  const storyLoaded = useStoryblok(null, enableBridge, locale);

  let content = <h1>Not found</h1>;

  if (storyLoaded && storyLoaded.content)
    content = <DynamicComponent blok={storyLoaded.content} />;   

  return (
    <Layout>
      <Container>
        {content}
      </Container>
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
    let global = await Storyblok.get(`cdn/stories/templates/global-template`, sbParams);

    return {
      props: {
        preview,
        locale,
        locales,
        defaultLocale,
        global: global ? global.data.story : false,
      },
    };

  } catch (error) {
    throw new Error(error.message); // stop the build
  }
}
