import cn from 'classnames';
import CustomImage from '@/components/ui/Image';
import Button from "@/components/ui/Button";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import Link from 'next/link';

interface Props {
  collection: any,
  tileStyle?: "primary" | "secondary"
}

const FeaturedCollectionTile: React.FC<Props> = ({ 
  collection,
  tileStyle = 'primary'
}) => {
  return (
    <article className="featured-collection-tile">
      <div className={cn("text-primary h-full flex items-end relative", {
        "aspect-square": tileStyle === "primary",
        "aspect-[14/16]": tileStyle === "secondary"
      })}>
        {
          tileStyle === "primary" ? (
            <div className="p-10 md:p-12 xl:pb-24 xl:pl-24 w-full relative z-10">
              <div>
                <h3 className={`font-bold relative z-10 h2`}>
                  {collection?.title || <Skeleton count={2} />}
                </h3>
                <p className="uppercase font-medium">
                  {/* 
                    TODO: Move this text into a Shopify metadata field -
                      This is just a temporary solution for demo.
                  */}
                  {
                    collection?.title === "Tools" ? (
                      "CLIPPERS & NIPPERS & PUSHERS & MORE"
                    ) : (
                      "THE KOLINSKY BRUSh KIT & SINGLE BRUSHES"
                    )
                  }
                </p>
              </div>
              <div className="mt-5">
                <Button 
                  text="Gear Up"
                  link={{
                    cached_url: 'collection/' + collection?.handle
                  }}
                />
              </div>
          </div>
          ) : null
        }

        <div className="bg-image absolute inset-0 z-0 overflow-hidden">
          {
            collection && (
              <CustomImage 
                image={collection.image} 
                layout="fill" 
                objectFit="cover"
              />
            )
          }
        </div>
      </div>

      {
        tileStyle === "secondary" ? (
          <div className="p-2 md:p-4 pb-0 text-center w-full relative z-10">
            <Link href={'collection/' + collection?.handle}>
              <a className="font-header text-xs xl:text-xl uppercase underline text-secondary">
                {collection?.title || <Skeleton count={2} />}
              </a>
            </Link>
        </div>
        ) : null
      }
    </article>
  )
}

export default FeaturedCollectionTile;
