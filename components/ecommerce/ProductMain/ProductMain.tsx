import AddToCartButton from '@/components/ecommerce/AddToCartButton';
import { useEffect, useState } from 'react';
import { Quantity } from '@/components/ui/Inputs';
import { VariantSelector } from '@/components/ecommerce/Common';
import Gallery from './Gallery';
import PrimaryDetail from './PrimaryDetail';
import cn from 'classnames';
import type { Product } from '@/types/shopify';

interface Props {
  product: Product
}

const ProductMain: React.FC<Props> = ({
  product,
  children
}) => {
  const [ selectedVariant, setSelectedVariant ] = useState<any | boolean>(false);
  const [ formData, setFormData ] = useState<any | boolean>({
    variantId: null,
    quantity: 1,
  });

  useEffect(() => {
    setFormData((prevState: any) => ({...prevState, variantId: selectedVariant.id }))
  }, [selectedVariant])

  return (
    <div className="flex flex-wrap -mx-3 xl:-mx-10">
      <div className="w-full xl:w-7/12 px-3 xl:px-10">
        { product.images.length ? <Gallery product={product} /> : null }
      </div>

      <div className="w-full xl:w-5/12 px-3 xl:px-10 mt-2 ld:mt-0">
        <div className="">
          <PrimaryDetail 
            product={product}
            selectedVariant={selectedVariant}
          />

          <div className={cn({
            "mt-4" : product.variants.length > 1
          })}>
            <VariantSelector 
              product={product}
              onVariantChange={setSelectedVariant}
              displaySelected
            />
          </div>

          {/* Product Description - Full */}
          <div className="product-description mt-7">
            <div className="p" dangerouslySetInnerHTML={{
              __html: selectedVariant.description || product.descriptionHtml
            }} />

            <div className="mt-8">
              {/* Children is the additional content */}
              {children}
            </div>
          </div>

          <div className="mt-7">
            <div className="flex space-x-4 md:space-x-8 mt-4">
              <div className="">
                <Quantity 
                  onChange={(quantity) => setFormData({...formData, quantity: quantity})} 
                />
              </div>

              <AddToCartButton 
                buttonText="Add to cart"
                className="flex-1 !max-w-none"
                variants={[
                  {
                    variantId: selectedVariant.id,
                    quantity: formData.quantity,
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductMain;
