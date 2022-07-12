import { Price } from '@/components/ecommerce/Common';
import { Input } from '@/components/ui/Inputs';
import DynamicIcon from '@/components/icons/DynamicIcon';
import Button from '@/components/ui/Button';
import ButtonGroup from '@/components/ui/ButtonGroup';
import Header from '@/components/ui/Header';
import useCart from '@/components/hooks/useCart';
import { ReactNode, Component, useEffect, useState } from 'react';
import cn from 'classnames';
import { useUIContext } from "@/components/context/uiContext";
import useToast from "@/components/hooks/useToast";
import CartDrawerItem from './CartDrawerItem';

interface Props {
  children?: ReactNode | Component | any
}

const CartDrawer: React.FC<Props> = () => {
  const { 
    cart, 
    setCart 
  } = useCart();

  const [ toasts, addToast ] = useToast();
  const { UI, setUI } = useUIContext();

  // useEffect(() => {
  //   console.log("cart:", cart);
  // }, [cart])

  const handleRemoveDiscount = async () => {
    try {
      const res = await fetch(`/api/checkout?action=removeDiscount`, {
        'method': 'POST',
        'body': JSON.stringify({
          checkoutId: cart?.id,
        })
      });

      if (res.status === 500) {
        throw new Error("Error");
      }

      const checkout = await res.json();
      
      // update UI
      setCart(checkout)

      addToast({
        message: "Discount Removed",
        title: "Success",
        style: "info"
      });

    } catch(err) {
      addToast({
        message: "Something went wrong",
        style: "error"
      });
    }
  }

  return (
    <div className={cn([
      "fixed",
      "w-full",
      "max-w-cart",
      "h-screen",
      "bg-primary",
      "z-50",
      "inset-y-0",
      "transition-all",
      "duration-700",
      "right-0",
      "border-l border-l-gray2",
    ], {
      "-right-cart" : !UI.cartActive
    })}>
      <div className="flex flex-col h-full">
        <div className="mb-8 flex justify-between px-16 pt-10">
          <Header size="h3">Cart</Header>

          <button 
            id="close-cart-drawer-trigger"
            aria-label="Close Cart Drawer"
            onClick={() => setUI({...UI, cartActive: false})}
          >
            <span className="border rounded-full border-fadedText block p-2">
              <DynamicIcon type="close" className="text-fadedText" />
            </span>
          </button>
        </div>

        <div className="px-16 overflow-auto">
        {
          cart?.lineItems.length > 0 ? (
            <ul>
              {
                cart?.lineItems.map((cartItem: any, i: number) => (
                    <li className="mb-6" key={cartItem.id}>
                      <CartDrawerItem cartItem={cartItem} />
                    </li>
                  )
                )
              }
            </ul>
          ) : (
            <p>Your cart is currently empty.</p>
          )
        }
        </div>
        

        <div className="mt-auto border-t border-gray2 py-10">
          <div className="pb-10 border-b border-gray2 px-16 mb-10">
            <div className="flex justify-between items-center">
              <span className="mr-8">Totals:</span>
              <div>
                <Price 
                  originalPrice={cart?.subtotalPrice || 0}
                />
              </div>
            </div>

            {
              cart?.discounts.length ? (
                <div className="mt-10">
                  Discounts Applied:

                  {
                    cart.discounts.map((discount: any, i: number) => {
                      return (
                        <span 
                          className="ml-4 border border-primary rounded-md px-5 py-2 inline-flex items-center" 
                          key={i}
                        >
                          <span className="uppercase">
                            {discount.node.code}
                          </span>
                          <button className="ml-2" onClick={handleRemoveDiscount}>
                            <DynamicIcon type="close" className="text-fadedText" />
                          </button>
                        </span>
                      )
                    })
                  }
                </div>
              ) : null
            }
          </div>
          
          <ButtonGroup className='px-10 space-y-4 space-x-0'>
            {/* <Button text="Apply Discount ('TEST')" ajaxClick={async (e) => {
                try {
                  const res = await fetch(`/api/checkout?action=applyDiscount`, {
                    'method': 'POST',
                    'body': JSON.stringify({
                      checkoutId: cart.id,
                      discountCode: "test",
                    })
                  });

                  if (res.status === 500) {
                    throw new Error("Error");
                  }

                  const checkout = await res.json();
                  

                  // update UI
                  setCart(checkout)

                  addToast({
                    message: "Discount Added",
                    style: "success"
                  });

                } catch(err) {
                  addToast({
                    message: "Something went wrong",
                    style: "error"
                  });
                }

              }} 
            /> */}
            <Button 
              text="Checkout"
              link={{url: cart?.url}}
              disabled={!cart?.url}
              onDark
              maxWidth={false}
            />
          </ButtonGroup>
        </div>
      </div>
    </div>
  )
}

export default CartDrawer;
