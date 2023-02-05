import Image from 'next/image';
import Placeholder from '@/public/images/placeholder.png';
import IndexBody from "@/components/modules/IndexBody";
import Layout from "@/components/templates/Layout";
import StarRating from "@/components/ui/StarRating";

export default function Page() {
  const testimonials = [
    {
      rating: 5,
      name: "passion nfts",
      title: "CEO of Collective Strangers",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue."
    },
    {
      rating: 5,
      name: "passion nfts",
      title: "CEO of Collective Strangers",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue."
    },
    {
      rating: 5,
      name: "passion nfts",
      title: "CEO of Collective Strangers",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue."
    }
  ];

  const socials = [
    {
      name: "Github",
      icon: "github",
      username: "@jamiepask"
    },
    {
      name: "Github",
      icon: "github",
      username: "@jamiepask"
    },
    {
      name: "Github",
      icon: "github",
      username: "@jamiepask"
    }
  ]

  return (
    <Layout>
      <div className="absolute inset-x-2.5 top-0 z-0" data-scroll-sticky data-scroll-target="main-scroll-wrapper">
        <div className="h-screen flex items-end">
          <div className="w-4/12 ml-auto mr-[8.333%] px-5">
            <Image src={Placeholder} alt="me" priority />
          </div>
        </div>
      </div>

      <section className="mx-[8.3333%] px-5 pt-28 relative z-10" data-scroll-section>
        <ul className="flex -mx-2.5">
        {
          testimonials.map(({
            rating,
            name,
            title,
            body
          }, i) => {
            return (
              <li className="w-1/2 flex-shrink-0 px-2.5" key={i}>
                <article className="py-5 px-6 shadow-xl rounded-lg bg-background">
                  <header className="mb-6">
                    <span className="flex items-center">
                      <h3 className="mr-10 h3">{ name }</h3>
                      <StarRating count={rating} />
                    </span>
                    <h5>{ title }</h5>
                  </header>
                  <p className="opacity-40">{ body }</p>
                </article>
              </li>
            )
          })
        }
        </ul>
      </section>

      <section className="px-5 section section--spacing-lg !mb-0 text-background" data-scroll-section>
        <IndexBody />
      </section>

      <section className="px-5 section section--spacing-sm mb-28" data-scroll-section>
        <ul className="ml-[8.333%] flex space-x-5 w-7/12">
          {
            socials.map(({
              name,
              icon,
              username
            }, i) => {
              return (
                <li key={i} className="flex-1 border-t border-black pt-3">
                  <div>
                    <h3 className="h3">{name}</h3>
                  </div>
                </li>
              )
            })
          }
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
