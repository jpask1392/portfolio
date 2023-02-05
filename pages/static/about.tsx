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

      <section className="container section section--spacing-lg !mb-0" data-scroll-section>
        <div className="w-5/12">
          <h3 className="h3 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. 
          </h3>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor</p>
        </div>
      </section>

      <section className="section section--spacing-md px-10" data-scroll-section> 
        <header className="flex -mx-10 border-y border-white">
          <div className="w-5/12 px-10"><h3 className="h3">Project</h3></div>
          <div className="w-7/12 px-10"><h3 className="h3">Highlights</h3></div>
        </header>
        <ul className="">
          <li className="py-3 border-b">
            <article className="flex -mx-10">
              <div className="w-5/12 px-10">
                <h2 className="h1">strangershq</h2>

                <p className="mt-20">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor</p>
              </div>
              <div className="w-7/12 px-10">
                <ul className="">
                  <li className="h2 text-outlined">nextjs</li>
                  <li className="h2 text-outlined">storyblok</li>
                  <li className="h2 text-outlined">web3</li>
                  <li className="h2 text-outlined">design</li>
                </ul>
              </div>
            </article>
          </li>
        </ul>
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
