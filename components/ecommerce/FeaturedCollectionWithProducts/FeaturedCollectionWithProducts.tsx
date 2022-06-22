import CustomImage from '@/components/ui/Image/Image';
import RichText from '@/components/ui/RichText';
import cn from 'classnames';
import useSWR from 'swr';
import { useEffect, useRef, useState } from 'react';
import ProductTile from '@/components/ecommerce/ProductTile';
import Slideshow from '@/components/ui/Slideshow';

interface Props {
  className?: string
  collectionHandle: string
  title?: string
}

const FeaturedCollectionWithProducts: React.FC<Props> = ({ 
  className,
  collectionHandle,
  title
}) => {
  const [ collection, setCollection ] = useState<any>({ products: [] });
  const containerRef = useRef(null);

  /**
   * Using an SWR (stale-while-revalidate) hook here 
   * because the data shouldn't be changing too much
   * 
   * See https://swr.vercel.app/docs/getting-started for more info
   */
  const { data, error } = useSWR(`/api/catalog/collections?handle=${encodeURIComponent(collectionHandle)}`, async (url) => {
    const res = await fetch(url);
    return await res.json();
  });

  useEffect(() => {
    // render the loaded collection
    if (data) setCollection(data);
  }, [data])

  useEffect(() => {
    console.log(error)
  }, [error])

  return (
    <div className={cn(className, "overflow-hidden")} ref={containerRef}>
      <div className="flex -mx-8">
        <div className="w-5/12 px-8">
          {
            collection ? 
              <CustomImage 
                image={collection.image}
                objectFit="cover"
                layout="fill"
              /> 
            : null
          }
        </div>
        <div className="w-7/12 px-8">
          <RichText 
            text={title}
            className="mt-4 mb-3"
          />

          <Slideshow
            showSlides={{
              sm: 1,
              lg: 2,
              xl: 2,
            }} 
            spaceBetween={90}
          >
            {
              collection.products.map((product: any, i: number) => 
                <ProductTile 
                  product={product} 
                  key={i}
                  animate
                />
              )
            }
          </Slideshow>
        </div>
      </div>
    </div>
  )
}

export default FeaturedCollectionWithProducts;
