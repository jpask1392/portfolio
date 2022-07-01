import useCart from '@/components/hooks/useCart';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import useToast from "@/components/hooks/useToast";
import cn from 'classnames';
import type { Product } from '@/types/shopify';
import { useUIContext } from "@/components/context/uiContext";

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
  const [ toasts, addToast ] = useToast();
  const { UI, setUI } = useUIContext();
  const [ cart, setCart ] = useCart();

  const handleAddToCart = async () => {
    try {
      const res = await fetch(`/api/checkout?action=add`, {
        'method': 'POST',
        'body': JSON.stringify({
          checkoutId: cart?.id,
          formData: variants,
        })
      });

      // check for a successful response before continuing
      if (res.status !== 200) {
        // get the response message
        const errorResponse = await res.json();
        throw new Error(errorResponse.message[0].message);
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

    } catch (err) {
      console.error(err);

      addToast({
        message: "Could not add product.",
        style: "error"
      });
    }
  }

  return (
    <Button
      onDark={onDark}
      className={className}
      text={buttonText}
      ajaxClick={handleAddToCart}
    />
  )
}

export default ProductMain;
