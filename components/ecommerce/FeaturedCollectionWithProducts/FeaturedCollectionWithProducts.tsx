import DynamicIcon from '@/components/icons/DynamicIcon';
import Button from '@/components/ui/Button';
import CustomImage from '@/components/ui/Image/Image';
import cn from 'classnames';
import useSWR from 'swr';
import { useEffect, useRef, useState } from 'react';
import ProductTile from '@/components/ecommerce/ProductTile';
import Slideshow from '@/components/ui/Slideshow';
import Header from '@/components/ui/Header';

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
  const [ collection, setCollection ] = useState<any>({ products: [null, null, null, null] });

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

  return (
    <div className={cn(className, "overflow-hidden")}>
      <div className="container xl:max-w-none xl:px-0 xl:w-auto flex xl:-mx-8">
        <div className="hidden xl:block w-5/12 px-5">
          {
            collection ?
              <div className="hidden xl:block h-full relative">
                <CustomImage 
                  image={collection.image}
                  // image={null}
                  objectFit="cover"
                  layout="fill"
                />
                <div className="absolute inset-x-0 bottom-12 z-10 px-16">
                  <Button 
                    text="Shop All Acrylic"
                    className="!max-w-none"
                  />
                </div>
              </div> 
            : null
          }
        </div>
        <div className="w-full xl:w-7/12 lg:px-5 group">
          <div className="flex items-center flex-wrap text-center xl:text-left mb-5">
            <Header 
              text={title}
              className="mt-5 lg:mb-3 w-full lg:w-auto"
              color="secondary"
            />
            <span className="hidden lg:inline-block ml-10">
              <DynamicIcon type="drops" className="w-16 text-secondaryLight"/>
            </span>
            <span className="lg:ml-10 text-base lg:text-xl lg:translate-x-10 lg:opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all w-full lg:w-auto text-secondary">
              ( WORTH THE HYPE )
            </span>
          </div>

          <Slideshow
            className="xl:pr-16"
            showSlides={{
              sm: 2,
              lg: 3,
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
