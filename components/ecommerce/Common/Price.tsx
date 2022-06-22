import cn from "classnames";
import { formatMoney } from '@/utils/formatMoney';

interface Props {
  originalPrice: number
  salePrice?: number
  showSalePrice?: boolean
  stackItems?: boolean
  showDiscountPercentage?: boolean
  align?: 'left' | 'center' | 'right'
  size?: 'subtitle' | 'text-base'
}

const Price: React.FC<Props> = ({
  originalPrice,
  salePrice,
  showSalePrice,
  showDiscountPercentage = true,
  stackItems = false,
  align = "left",
  size,
}) => {

  const calcDiscountPercentage = (full: number, discount: number) => {
    return ((1 - (discount / full)) * 100).toFixed(0);
  }

  return (
    <div className={cn("flex", {
      'flex-col' : stackItems,
      'justify-center' : align === "center",
      'justify-end' : align === "right",
      'items-center' : align === "center" && stackItems,
      'items-end' : align === "right" && stackItems,
      'leading-none' : size === "text-base"
    })}>
      {
        salePrice ? (
          <p className={cn([[size]], "font-bold text-fadedText", {
            'mr-1 md:mr-3' : !stackItems
          })}>
            <del>{formatMoney(originalPrice)}</del>
          </p>
        ) : null
      }

      <p className={cn([[size]])}>
        {
          (salePrice && salePrice < originalPrice)
            ? formatMoney(salePrice)
            : formatMoney(originalPrice)
        }
      </p>

      {
        salePrice && showDiscountPercentage ? (
          <p className={cn(`text-tiny ${size}`, "text-primary font-bold", {
            "ml-2 md:ml-8" : !stackItems
          })}>
            {calcDiscountPercentage(originalPrice, salePrice)}% off
          </p>
        ) : null
      }
    </div>
  )
}

export default Price;
