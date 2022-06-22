import Breadcrumbs from '@/components/ui/Breadcrumbs';
import useCart from '@/components/hooks/useCart';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import { Quantity } from '@/components/ui/Inputs';
import { VariantSelector } from '@/components/ecommerce/Common';
import Gallery from './Gallery';
import PrimaryDetail from './PrimaryDetail';
import useToast from "@/components/hooks/useToast";
import cn from 'classnames';
import type { Product } from '@/types/shopify';
import { useUIContext } from "@/components/context/uiContext";

interface Props {
  product: Product
}

const ProductMain: React.FC<Props> = ({
  product,
  children
}) => {
  const [ toasts, addToast ] = useToast();
  const { UI, setUI } = useUIContext();
  const [ cart, setCart ] = useCart();
  const [ selectedVariant, setSelectedVariant ] = useState<any | boolean>(false);
  const [ formData, setFormData ] = useState<any | boolean>({
    variantId: null,
    quantity: 1,
  });

  useEffect(() => {
    console.log(selectedVariant.description)
    setFormData((prevState: any) => ({...prevState, variantId: selectedVariant.id }))
  }, [selectedVariant])

  return (
    <div className="flex flex-wrap -mx-3 xl:-mx-5">
      {/* detail content - small devices only */}
      <div className="mb-10 lg:hidden px-3 w-full">
        <PrimaryDetail 
          product={product}
          selectedVariant={selectedVariant}
        />
      </div>

      <div className="w-full lg:w-6/12 xl:w-7/12 px-3 xl:px-5">
        { product.images.length ? <Gallery product={product} /> : null }
      </div>

      <div className="w-full lg:w-6/12 xl:w-5/12 px-3 xl:px-5 mt-20 md:mt-0">
        <div className="sticky top-36">
          <div className="hidden lg:block">
            <Breadcrumbs />
            <PrimaryDetail 
              product={product}
              selectedVariant={selectedVariant}
            />
          </div>

          <div className={cn({
            "mt-20 lg:mt-6 mb-12" : product.variants.length > 1
          })}>
            <VariantSelector 
              product={product}
              onVariantChange={setSelectedVariant}
            />
          </div>

          <div className="mt-16">
            <p className="caption w-full">Quantity</p>
            <div className="flex space-x-4 md:space-x-8 mt-4">
              <div className="w-8/12" style={{ maxWidth: 240 }}>
                <Quantity 
                  onChange={(quantity) => setFormData({...formData, quantity: quantity})} 
                />
              </div>
              <Button text="Add to cart" ajaxClick={async (e) => {
                try {
                  const res = await fetch(`/api/checkout?action=add`, {
                    'method': 'POST',
                    'body': JSON.stringify({
                      checkoutId: cart?.id,
                      formData: [ formData ],
                    })
                  });

                  if (res.status === 500) {
                    throw new Error("Error");
                  }

                  const checkout = await res.json();

                  setCart(checkout)

                  // add user feedback
                  addToast({
                    message: "Product Added To Cart",
                    style: "success"
                  });

                  // show cart drawer
                  setUI({
                    ...UI,
                    cartActive: true
                  })

                } catch(err) {
                  addToast({
                    message: "Something went wrong",
                    style: "error"
                  });
                }

              }}/>
            </div>
          </div>

          {/* Product Description - Full */}
          <div className="product-description">
            <div dangerouslySetInnerHTML={{
              __html: selectedVariant.description || product.descriptionHtml
            }} />

            <div className="mt-8">
              {/* Children is the additional content */}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductMain;
