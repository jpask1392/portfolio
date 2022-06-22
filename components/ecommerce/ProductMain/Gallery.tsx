import CustomImage from "@/components/ui/Image";
import InfoPill from '@/components/ui/InfoPill';
import cn from "classnames";
import type { storyBlokImage } from "@/types/storyBlok";
import type { Product } from "@/types/shopify";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useEffect, useState } from "react";

const ProductMain = ({ product } : { product: Product }) => {
  const [ media, setMedia ] = useState<string | null>(null);

  const handleResize = () => {
    const breakpoint = window.matchMedia( '(max-width:1024px)' );
    breakpoint.matches 
      ? setMedia('mobile')
      : setMedia('desktop')
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full relative">
      <div className="absolute top-4 left-4 z-20">
        <InfoPill name="Best Seller"/>
      </div>

      {
        /**
         * Preloading both images with css
         * selectors to prevent an increase in CLS.
         */
        !media && (
          <>
            <GalleryImages product={product} />
            <GallerySlider product={product} />
          </>
        )
      }

      { media === 'mobile' && <GallerySlider product={product} />}
      { media === 'desktop' && <GalleryImages product={product} />}
      
    </div> 
  )
}

const GalleryImages = ({ product } : { product: Product }) => {
  return (
    <div 
      className={cn("hidden lg:grid gap-2", {
        "grid-cols-1" : product.images.length === 1,
        "xl:grid-cols-2" : product.images.length > 1,
      })}
    >
        {
          product.images.map((image: storyBlokImage, i: number) => {
            return (
              <div key={i} className={cn("bg-gray3", {
                "xl:col-span-2" : i === 4,
              })}>
                <CustomImage image={image} />
              </div>
            )
          })
        }
    </div>
  )
}

const GallerySlider = ({ product } : { product: Product }) => {
  return (
    <Swiper
      className="lg:hidden"
      modules={[Navigation, A11y]}
      draggable={true}
    >
        {
          product.images.map((image: storyBlokImage, i: number) => {
            console.log(product)
            return (
              <SwiperSlide key={`${product.id}_${i}`} className="bg-gray3">
                <CustomImage image={image} />
              </SwiperSlide>
            )
          })
        }
    </Swiper>
  )
}

export default ProductMain;
