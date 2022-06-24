import CustomImage from '@/components/ui/Image';

import cn from 'classnames';
import Button from '@/components/ui/Button';


interface Props {
  className?: string
  collection: any
}

const FeaturedCollectionTile: React.FC<Props> = ({ 
  collection,
  className,
}) => {

  const moduleClassNames = cn(className, "relative h-full w-full", {
    // "md:col-span-2" : collection.colSpan === 2,
  });

  return (
    <article className={moduleClassNames}>
      <div className="bg-gray3 text-primary h-full flex items-end">
        <div className="absolute inset-0 z-0">
          <CustomImage image={collection.image} layout="fill" objectFit="cover"/>
        </div>
        <div className="p-8 xl:p-16 relative w-full">
          <h4 className="font-bold mb-8">
            {collection.title}
          </h4>
          <Button 
            link={{
              url: "",
              linktype: "story",
              cached_url: `collection/${collection.handle}`,
              email: ""
            }}
            text={`Shop Now`}
          />
        </div>
      </div>
    </article>
  )
}

export default FeaturedCollectionTile;
