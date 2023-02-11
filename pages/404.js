import Layout from "@/components/templates/Layout";
// import DynamicComponent from "@/components/helpers/DynamicComponent";
import Container from "@/components/ui/Container";

export default function Page404() {
  return null;
  
  let content = <h1>Not found</h1>;

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
    // let sbParams = {
    //   version: preview ? "draft" : "published", // or "published"
    //   resolve_relations: [
    //     "featured-posts.posts",
    //   ],
    //   language: locale,
    // };
  
    // if (preview) {
    //   sbParams.version = "draft";
    //   sbParams.cv = Date.now();
    // }

    // get global layout information for header, footer etc
    // let global = await Storyblok.get(`cdn/stories/templates/global-template`, sbParams);

    return {
      props: {},
    };

  } catch (error) {
    throw new Error(error.message); // stop the build
  }
}
