import cn from 'classnames';
import ProductTile from '@/components/ecommerce/ProductTile';
import Slideshow from '@/components/ui/Slideshow';
import { useEffect, useState } from 'react';
import useSWR from 'swr'

interface Props {
  className?: string
  collectionHandle?: string
  productID?: string
  onDark?: boolean
  showSlides?: {
    sm: number,
    lg: number,
    xl: number,
  }
}

const FeaturedProducts: React.FC<Props> = ({ 
  className,
  collectionHandle,
  productID,
  onDark,
  showSlides = {
    sm: 2,
    lg: 3,
    xl: 3,
  }
 }) => {
  const [products, setProducts] = useState([null, null, null, null]);

  let url = `/api/catalog/collections?handle=${encodeURIComponent(collectionHandle || "")}`;
  if (collectionHandle === 'recommendations' && productID) {
    url = `/api/catalog/products?recommendationProductID=${encodeURIComponent(productID)}`;
  }

  const { data, error } = useSWR(url, async (url) => {
    const res = await fetch(url);
    return await res.json();
  }); 

  useEffect(() => {
    if (!data) return;
    // render the loaded collections
    if ('products' in data) setProducts(data.products);
    if (!('products' in data)) setProducts(data);
  }, [data])

  return (
    <div className={cn(className, "w-full")}>
      <Slideshow
        spaceBetween={90}
        showSlides={showSlides} 
      >
        {
          products.map((product: any, i: number) => 
            <ProductTile 
              product={product} 
              key={i}
              animate
              index={i}
              onDark={onDark}
            />
          )
        }
      </Slideshow>
    </div>
  )
}

export default FeaturedProducts;
