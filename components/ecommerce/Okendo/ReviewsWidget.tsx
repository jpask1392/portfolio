import { useEffect, useRef } from "react";
import type { Product } from "@/types/shopify/product";
import { useSmoothScrollContext } from "@/components/context/smoothScrollContext";

interface Props {
  product: Product
}

declare global {
  interface Window {
    okeWidgetApi: any;
  }
}

const ReviewsWidget: React.FC<Props> = ({
  product
}) => {
  const { scroll } : { scroll: any } = useSmoothScrollContext();
  const widgetContainer = useRef(null);

  const updateScroll = () => {
    console.log('click')
    scroll.update();
  }

  const initialiseReviewsWidget = () => {
    window.okeWidgetApi.initWidget(widgetContainer.current);
    
    updateScroll();
  }

  useEffect(() => {
    if (window.okeWidgetApi) {
      initialiseReviewsWidget();
    } else {
      // window.addEventListener('oke-script-loaded', initialiseReviewsWidget);
    }

    // document.getElementsByClassName('oke-showMore-button')[0].addEventListener('click', updateScroll);
  }, []);

  return (
    <>
      <div 
        ref={widgetContainer} 
        data-oke-widget 
        data-oke-reviews-product-id={`shopify-${product.id}`}
        dangerouslySetInnerHTML={{
          __html: product.ReviewsWidgetSnippet?.value
        }}
      ></div>
      {/* 
        TODO: Get hese settings someshow from shopify 
      */}
      <div dangerouslySetInnerHTML={{
        __html: '<script type="application/json" id="oke-reviews-settings">{"subscriberId":"dbd1007f-ea68-4930-b54d-91fe00ce9ae8","locale":"en","widgetSettings":{"global":{"hideOkendoBranding":true,"stars":{"backgroundColor":"#E5E5E5","foregroundColor":"#FFCF2A"}},"homepageCarousel":{"defaultSort":"rating desc","scrollBehaviour":"slide","slidesPerPage":{"large":3,"medium":2},"style":{"arrows":{"color":"#676986","size":{"value":24,"unit":"px"},"enabled":true},"avatar":{"backgroundColor":"#E5E5EB","placeholderTextColor":"#2C3E50","size":{"value":48,"unit":"px"},"enabled":true},"border":{"color":"#E5E5EB","width":{"value":1,"unit":"px"}},"highlightColor":"#0E7A82","layout":{"name":"default","reviewDetailsPosition":"below","showProductName":false,"showAttributeBars":false},"media":{"size":{"value":80,"unit":"px"},"imageGap":{"value":4,"unit":"px"},"enabled":true},"productImageSize":{"value":48,"unit":"px"},"showDates":true,"spaceAbove":{"value":20,"unit":"px"},"spaceBelow":{"value":20,"unit":"px"},"stars":{"height":{"value":18,"unit":"px"},"globalOverrideSettings":{"backgroundColor":"#E5E5E5","foregroundColor":"#FFCF2A"}},"text":{"primaryColor":"#2C3E50","fontSizeRegular":{"value":14,"unit":"px"},"fontSizeSmall":{"value":12,"unit":"px"},"secondaryColor":"#676986"}},"totalSlides":12,"truncation":{"bodyMaxLines":4,"enabled":true,"truncateAll":false}},"mediaCarousel":{"minimumImages":1,"linkText":"Read More","stars":{"backgroundColor":"#E5E5E5","foregroundColor":"#FFCF2A","height":{"value":12,"unit":"px"}},"autoPlay":false,"slideSize":"medium","arrowPosition":"outside"},"mediaGrid":{"showMoreArrow":{"arrowColor":"#676986","enabled":true,"backgroundColor":"#f4f4f6"},"infiniteScroll":false,"gridStyleDesktop":{"layout":"default-desktop"},"gridStyleMobile":{"layout":"default-mobile"},"linkText":"Read More","stars":{"backgroundColor":"#E5E5E5","foregroundColor":"#FFCF2A","height":{"value":12,"unit":"px"}},"gapSize":{"value":10,"unit":"px"}},"questions":{"initialPageSize":6,"loadMorePageSize":6},"reviewsBadge":{"layout":"large","colorScheme":"dark"},"reviewsTab":{"enabled":false},"reviewsWidget":{"header":{"columnDistribution":"space-between","verticalAlignment":"top","blocks":[{"columnWidth":"one-third","modules":[{"name":"rating-average","layout":"one-line"},{"name":"rating-breakdown","backgroundColor":"#F4F4F6","shadingColor":"#000000","stretchMode":"contain"}],"textAlignment":"left"},{"columnWidth":"one-third","modules":[{"name":"recommended"},{"name":"attributes","layout":"stacked","stretchMode":"stretch"}],"textAlignment":"left"},{"columnWidth":"one-third","modules":[{"name":"media-grid","imageGap":{"value":4,"unit":"px"},"scaleToFill":true,"rows":3,"columns":5}],"textAlignment":"left"}]},"reviews":{"list":{"layout":{"name":"default","showAttributeBars":true,"borderStyle":"full","collapseReviewerDetails":false},"initialPageSize":5,"media":{"layout":"featured","size":{"value":200,"unit":"px"}},"truncation":{"bodyMaxLines":4,"truncateAll":false,"enabled":true},"loadMorePageSize":5},"controls":{"filterMode":"closed","defaultSort":"has_media desc","writeReviewButtonEnabled":true}},"showWhenEmpty":true,"style":{"attributeBar":{"style":"default","backgroundColor":"#D3D4DD","shadingColor":"#000000","markerColor":"#000000"},"avatar":{"backgroundColor":"#E5E5EB","placeholderTextColor":"#000000","size":{"value":48,"unit":"px"},"enabled":true},"border":{"color":"#DEDEDE","width":{"value":1,"unit":"px"}},"button":{"backgroundColorActive":"#3F3F3F","borderColorHover":"#3F3F3F","backgroundColor":"#000000","borderColor":"#000000","backgroundColorHover":"#3F3F3F","textColorHover":"#FFFFFF","borderRadius":{"value":0,"unit":"px"},"borderWidth":{"value":0,"unit":"px"},"borderColorActive":"#3F3F3F","textColorActive":"#FFFFFF","textColor":"#FFFFFF"},"filters":{"backgroundColorActive":"#000000","backgroundColor":"#FFFFFF","borderColor":"#DBDDE4","borderRadius":{"value":100,"unit":"px"},"borderColorActive":"#000000","textColorActive":"#FFFFFF","textColor":"#000000"},"highlightColor":"#000000","productImageSize":{"value":48,"unit":"px"},"shadingColor":"#F7F7F8","showDates":true,"spaceAbove":{"value":20,"unit":"px"},"spaceBelow":{"value":30,"unit":"px"},"stars":{"height":{"value":18,"unit":"px"},"globalOverrideSettings":{"backgroundColor":"#E5E5E5","foregroundColor":"#000000"}},"text":{"primaryColor":"#000000","fontSizeRegular":{"value":16,"unit":"px"},"fontSizeLarge":{"value":16,"unit":"px"},"fontSizeSmall":{"value":16,"unit":"px"},"secondaryColor":"#000000"}},"tabs":{"reviews":true,"questions":true}},"starRatings":{"clickBehavior":"scroll-to-widget","hideWhenEmpty":true,"showWhenEmpty":false,"style":{"globalOverrideSettings":{"backgroundColor":"#E5E5E5","foregroundColor":"#000000"},"spaceAbove":{"value":0,"unit":"px"},"text":{"content":"review-count","style":"number-and-text","brackets":false},"height":{"value":18,"unit":"px"},"spaceBelow":{"value":8,"unit":"px"}}}},"features":{"recorderPlusEnabled":true,"attributeFiltersEnabled":true}}</script>'
      }}/>
    </>
  );
}

export default ReviewsWidget;
