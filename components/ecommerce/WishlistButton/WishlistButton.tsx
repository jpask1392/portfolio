import useWishlist from "@/components/hooks/useWishlist";
import type { Product } from "@/types/shopify";
import DynamicIcon from "@/components/icons/DynamicIcon";
import { useState } from "react";

interface Props {
  product?: Product
}

const WishlistButton: React.FC<Props> = ({
  product 
}) => {
  const [adding, setAdding] = useState(false);
  const {
    handleCreateWishlist,
  } = useWishlist();

  return (
    <button>
      <DynamicIcon type="heart" className="fill-transparent stroke-black" />
    </button>
  )
}

export default WishlistButton;
