import { Price } from '@/components/ecommerce/Common';
import useCart from '@/components/hooks/useCart';
import DynamicIcon from '@/components/icons/DynamicIcon';

interface Props {
  cartItem: any
}

const CartDrawerItem: React.FC<Props> = ({ cartItem }) => {
  const [ cart, setCart ] = useCart();

  // remove item from list
  const handleRemove = async () => {
    const res = await fetch(`/api/checkout?action=remove`, {
      'method': 'POST',
      'body': JSON.stringify({
        checkoutId: cart?.id,
        formData: [ cartItem.id ],
      })
    });

    if (res.status === 500) {
      throw new Error("Error");
    }

    const checkout = await res.json();

    // update UI
    setCart(checkout)
  }

  if (!cart) return null;

  return (
    <div>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="text-base">
            {cartItem.title} <br/>
          </h4>
          <span className="block text-xs mt-1 text-fadedText">
            Variant: {cartItem.variant.title}
          </span>
        </div>

        <div className="pl-2">
          <Price 
            originalPrice={cartItem.variant.priceV2?.amount}
            salePrice={
              cartItem.discountAllocations.length > 0 
                ? cartItem.variant.priceV2?.amount - (cartItem.discountAllocations[0].allocatedAmount.amount / cartItem.quantity)
                : 0
            }
            stackItems={false}
            align="right"
            showDiscountPercentage={false}
            size="text-base"
          />
          <span className="block text-xs mt-1 text-right text-fadedText">Quantity: {cartItem.quantity}</span>
        </div>

        <button className="ml-2" onClick={handleRemove}>
          <DynamicIcon type="close" className="text-fadedText" />
        </button>
      </div>
    </div>
  )
}

export default CartDrawerItem;
