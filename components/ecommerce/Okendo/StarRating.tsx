import { useEffect, useRef } from "react";
import type { Product } from "@/types/shopify/product";

interface Props {
  product: Product
}

const ReviewsWidget: React.FC<Props> = ({
  product
}) => {
  const widgetContainer = useRef(null);

  const initialiseReviewsWidget = () => {
    window.okeWidgetApi.initWidget(widgetContainer.current);
  }

  useEffect(() => {
    if (window.okeWidgetApi) {
      initialiseReviewsWidget();
    }
    else {
      window.addEventListener('oke-script-loaded', initialiseReviewsWidget);
    }
  }, []);

  return (
    <div ref={widgetContainer} data-oke-star-rating data-oke-reviews-product-id={`shopify-${product.id}`}></div>
  );
}

export default ReviewsWidget;
