import useCart from '@/components/hooks/useCart';
import Button from '@/components/ui/Button';

interface Props {
  buttonText: string
  className?: string
  onDark?: boolean
  variants: {
    variantId: string,
    quantity: number,
  }[],
}

const ProductMain: React.FC<Props> = ({
  variants,
  buttonText,
  className,
  onDark
}) => {

  const {
    addVariantsToCart,
  } = useCart();

  return (
    <Button
      onDark={onDark}
      className={className}
      text={buttonText}
      ajaxClick={() => addVariantsToCart(variants)}
      maxWidth={false}
    />
  )
}

export default ProductMain;
