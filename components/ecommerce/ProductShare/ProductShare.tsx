import DynamicIcon from '@/components/icons/DynamicIcon';
import type { Product } from '@/types/shopify';
import cn from 'classnames';

interface Props {
  product: Product
  className?: string
}

const ProductShare: React.FC<Props> = ({
  product,
  className
}) => {
  return (
    <ul className={cn(className, "flex space-x-3")}>
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
  )
}

export default ProductShare;
