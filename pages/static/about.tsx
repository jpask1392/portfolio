import DynamicIcon from "@/components/icons/DynamicIcon";
import Link from "next/link";
import IndexBody from "@/components/modules/IndexBody";
import Layout from "@/components/templates/Layout";
import StarRating from "@/components/ui/StarRating";

export default function Page() {
  return (
    <Layout background="black">
      <div className="absolute top-12 right-12 z-50">
        <Link href="/static">
          <DynamicIcon type="close" className="w-5 text-accent" />
        </Link>
      </div>

      <section data-scroll-section className="container section section--spacing-lg">
        <div className="w-5/12">
          <h3 className="h3 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. 
          </h3>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor</p>
        </div>
      </section>
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
  return {
    props: {
      preview,
    },
    revalidate: 3600, // revalidate every hour
  };
}
