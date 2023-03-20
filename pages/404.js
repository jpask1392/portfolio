import Button from "@/components/ui/Button";
import Layout from "@/components/templates/Layout";
// import DynamicComponent from "@/components/helpers/DynamicComponent";
import Container from "@/components/ui/Container";

export default function Page404() {
  return (
    <Layout>
      <Container>
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
              <div className="mx-auto max-w-screen-sm text-center">
                <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">Something's missing.</p>
                <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                <a href="/" className="inline-flex bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</a>
              </div>   
          </div>
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
