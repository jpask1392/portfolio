import Gallery from '@/components/ecommerce/ProductMain/Gallery'
import PrimaryDetail from '@/components/ecommerce/ProductMain/PrimaryDetail';
import AddToCartButton from '@/components/ecommerce/AddToCartButton';
import cn from 'classnames'
import { VariantSelector } from "@/components/ecommerce/Common";
import { useState, useEffect } from "react";
import HeroImage from "@/components/modules/HeroImage";
import DynamicComponent from "@/components/helpers/DynamicComponent";
import Container from "@/components/ui/Container";
import ProductMain from "@/components/ecommerce/ProductMain";
import Column from "@/components/ui/Column";
import Header from "@/components/ui/Header";
import { SbEditableContent } from "@/types/storyBlok";

interface Props {
  product: any
  story: any
}

const ProductGiftCardsTemplate: React.FC<Props> = ({ 
  product,
  story
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
    <>
      <HeroImage 
        image={product.collectionHeader}
        style="narrow"
        overlay
        TopBlockComponent={() => (
          <Column
            hAlignContent="right"
          >
            <Header tag="h1" size="h1" color="primary">
              Gift Cards
            </Header>

            {
            product.subHeader ? (
              <Header tag="h2" size="p" color="primary">
                {product.subHeader.value}
              </Header>
              ) : null 
            }
          </Column>
        )}
      />

      <Container spacing="sm" maxWidth="xl">
        <div className="flex flex-wrap -mx-3 xl:-mx-28">
          <div className="w-6/12 px-3 xl:px-28">
            { product.images.length ? <Gallery product={product} /> : null }
          </div>

          <div className="w-6/12 px-3 xl:px-28 mt-2 ld:mt-0">
            <div className="">
              <Header 
                tag="h2" 
                size="h3" 
                color="secondary"
              >{product.title}</Header>

              {/* Product Description - Full */}
              <div className="product-description mt-7">
                <div className="p" dangerouslySetInnerHTML={{
                  __html: selectedVariant.description || product.descriptionHtml
                }} />
              </div>

              <div className={cn({
                "mt-4" : product.variants.length > 1
              })}>
                <VariantSelector 
                  product={product}
                  onVariantChange={setSelectedVariant}
                  displaySelected
                />
              </div>

              <div className="mt-7">
                <div className="flex space-x-4 md:space-x-8 mt-4">
                  <AddToCartButton 
                    buttonText="Add to cart"
                    className="flex-1 !max-w-none"
                    variants={[
                      {
                        variantId: selectedVariant.id,
                        quantity: 1,
                      }
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {
        story && (
          <DynamicComponent 
            blok={story?.content || {}}
          />
        )
      }
    </>
  )
};

export default ProductGiftCardsTemplate;
