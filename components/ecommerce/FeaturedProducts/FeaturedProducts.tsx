import cn from 'classnames';
import ProductTile from '@/components/ecommerce/ProductTile';
import Slideshow from '@/components/ui/Slideshow';
import { useEffect, useState } from 'react';

interface Props {
  className?: string
  collectionHandle?: string
  productID?: string
}

const FeaturedProducts: React.FC<Props> = ({ 
  className,
  collectionHandle,
  productID,
 }) => {
  const [products, setProducts] = useState([null, null, null, null]);

  useEffect(() => {
    (async () => {
      /**
       * Get collection from Shopify API
       * 
       * - TODO: Stop re-running after tab container changes
       */
      if (collectionHandle && !productID) {
        const res = await fetch(`/api/catalog/collections?handle=${encodeURIComponent(collectionHandle)}`);
        const collection = await res.json();

        setProducts(collection?.products || []);
      }

      /**
       * Get product recommendations from Shopify
       */
      if (collectionHandle === 'recommendations' && productID) {
        const res = await fetch(`/api/catalog/products?recommendationProductID=${encodeURIComponent(productID)}`);
        const products = await res.json();
        setProducts(products);
      }
    })();
  }, [productID, collectionHandle])

  return (
    <div className={cn(className, "w-full")}>
      <Slideshow
        spaceBetween={90}
        showSlides={{
          sm: 2,
          lg: 3,
          xl: 3,
        }} 
      >
        {
          products.map((product: any, i: number) => 
            <ProductTile 
              product={product} 
              key={i}
              animate
              index={i}
            />
          )
        }
      </Slideshow>
    </div>
  )
}

export default FeaturedProducts;
