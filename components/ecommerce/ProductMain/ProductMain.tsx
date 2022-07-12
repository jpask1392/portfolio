import DetailsTab from './DetailsTab';
import Accordion from '@/components/ui/Accordion';
import AddToCartButton from '@/components/ecommerce/AddToCartButton';
import { useEffect, useState } from 'react';
import { Quantity } from '@/components/ui/Inputs';
import { VariantSelector } from '@/components/ecommerce/Common';
import Gallery from './Gallery';
import PrimaryDetail from './PrimaryDetail';
import cn from 'classnames';
import type { Product } from '@/types/shopify';
import { H4 } from "@/components/ui/Typography";
import DynamicIcon from '@/components/icons/DynamicIcon';

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

          {/* Meta information */}
          <div className="mt-9">
            {/* Details block */}
            <Accordion
              hideLines
              accordion_items={[
                {
                  _uid: "details",
                  header: "Details",
                  content: () => <DetailsTab data={product} />
                },
                {
                  _uid: "more-info",
                  header: "More Info",
                  content: "content"
                }
              ]}
            />

            <div className="pt-4 flex text-secondary items-center">
              <H4>Socials:</H4>
              <ul className="flex space-x-3 ml-6">
                <li>
                  <a 
                    target="_blank" 
                    href={`//www.facebook.com/sharer.php?u=https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/products/${product.handle}`}
                    role="button" 
                    title="Facebook share link" 
                    aria-label="Facebook share link"
                    rel="noreferrer"
                  >
                    <DynamicIcon type="facebook" className="w-6"/>
                  </a>
                </li>
                <li>
                  <a 
                    target="_blank" 
                    href={`//twitter.com/share?text=${encodeURIComponent(product.title)}&amp;url=https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/products/${product.handle}`}
                    role="button" 
                    title="Twitter share link" 
                    aria-label="Twitter share link"
                    rel="noreferrer"
                  >
                    <DynamicIcon type="twitter" className="w-6"/>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductMain;
