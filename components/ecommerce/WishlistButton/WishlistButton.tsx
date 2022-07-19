import Script from 'next/script';
import cn from 'classnames';
// import useWishlist from "@/components/hooks/useWishlist";
import type { Product } from "@/types/shopify";
import DynamicIcon from "@/components/icons/DynamicIcon";
// import { useState } from "react";

interface Props {
  product: Product
}

const WishlistButton: React.FC<Props> = ({
  product 
}) => {
  // const [adding, setAdding] = useState(false);

  const handleAddToWishlist = async () => {
    try {
      const res = await fetch('https://prod-api.wishlist.plutocracy.io/api/wishlist/event/fd299e53-91fa-439e-afaa-05d9f97ad8bf', {
        method: 'POST',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          eventType: "wishlist/add",
          // wishlistId: "",
          // email: "someone@gmail.com",
          event: {
            id: "event-id",
            productObject: {
              productId: product.id,
              productHandle: product.handle,
              price: 10000,
            },
          },
        })
      });

      const data = await res.json();
      
      // response data contains wishlist ID
      // set as session storage if no account? 

    } catch (error) {
      console.log('something went wrong')
    } finally {
    }  
  }

  const handleGetWishlist = async () => {
    try {
      const res = await fetch('https://prod-api.wishlist.plutocracy.io/api/wishlist/id/fd299e53-91fa-439e-afaa-05d9f97ad8bf', {
        method: 'POST',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          "wishlistId": "c8dde1b6-7449-499d-b4a4-f0c137adf45d"
        })
      });

      const data = await res.json();

      console.log(data)
      
      // response data contains wishlist ID
      // set as session storage if no account? 

    } catch (error) {
      console.log('something went wrong')
    } finally {
    }  
  }

  return (
    <>
    <button onClick={handleAddToWishlist}>
      <DynamicIcon 
        type="heart" 
        className={cn("stroke-black fill-transparent", {

        })} />
    </button>

    <button onClick={handleGetWishlist}></button>
    <Script 
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
        // get the store ID from here and set it on the window object?
        
      `,
      }}
    />
    </>
  )
}

export default WishlistButton;
