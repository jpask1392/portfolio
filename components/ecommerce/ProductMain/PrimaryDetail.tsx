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
    <div className="flex">
      <h1 className="h3">{product.title}</h1>

      <div className="flex-1 text-right">
        <Price
          align="right"
          size="h3"
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
    </div>
  )
}

export default PrimaryDetail;
