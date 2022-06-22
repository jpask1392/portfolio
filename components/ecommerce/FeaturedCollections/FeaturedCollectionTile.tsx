import CustomImage from '@/components/ui/Image';
import Button from "@/components/ui/Button";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import Link from 'next/link'

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
      <div className="aspect-square bg-gray3 text-white h-full flex items-end relative">
        {
          tileStyle === "primary" ? (
            <div className="pb-24 pl-24 w-full relative z-10">
              <div className="animate-up">
                <h3 className={`font-bold relative z-10 ${collection ? 'h3' : ''}`}>
                  {collection?.title || <Skeleton count={2} />}
                </h3>
                <p className="uppercase">
                  THE KOLINSKY BRUSh KIT & SINGLE BRUSHES
                </p>
              </div>
              <div className="animate-btn">
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
          <div className="p-4 text-center w-full relative z-10">
            <Link href={'collection/' + collection?.handle}>
              <a className="font-header font-xl uppercase underline text-secondary">
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
