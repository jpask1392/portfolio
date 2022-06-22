import CustomImage from '@/components/ui/Image';
import Button from "@/components/ui/Button";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import Link from 'next/link'

interface Props {
  collection: any
}

const FeaturedCollectionTile: React.FC<Props> = ({ 
  collection
}) => {
  return (
    <article className="featured-collection-tile">
      <div className="aspect-square md:aspect-video lg:aspect-[9/14] bg-gray3 text-white h-full flex items-center relative">
        <div className="p-4 text-center w-full relative z-10">
            <h3 className={`font-bold relative z-10 ${collection ? 'h3' : ''}`}>
              {collection?.title || <Skeleton count={2} />}
            </h3>
            <div className="animate-btn">
              <Button 
                text={`Shop Tools`} 
                link={{
                  cached_url: 'collection/' + collection?.handle
                }}
              />
            </div>
        </div>

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
    </article>
  )
}

export default FeaturedCollectionTile;
