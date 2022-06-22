import { Price } from '@/components/ecommerce/Common';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import type { Product, Variant } from '@/types/shopify';

interface Props {
  product: Product
  selectedVariant: Variant
}

const PrimaryDetail: React.FC<Props> = ({
  product, 
  selectedVariant
}) => {
  return (
    <>
      {/* <Breadcrumbs /> */}
      <h2 className="md:mt-8 h3">{product.title}</h2>
      {
        product.subtitle ? (
          <h3 className="text-2xl mt-2.5 font-normal">
            {product.subtitle}
          </h3>
        ) : null
      }

      <div className="mt-16">
        <Price
          originalPrice={(
            selectedVariant.compare_at_price && 
            selectedVariant.compare_at_price > selectedVariant.price
          )
            ? selectedVariant.compare_at_price
            : selectedVariant.price
          }
          salePrice={(
            selectedVariant.compare_at_price && 
            selectedVariant.compare_at_price > selectedVariant.price
          )
            ? selectedVariant.price
            : selectedVariant.compare_at_price || 0
          }
        />
      </div>
    </>
  )
}

export default PrimaryDetail;
