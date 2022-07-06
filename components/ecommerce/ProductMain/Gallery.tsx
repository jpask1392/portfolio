// types
import type { storyBlokImage } from "@/types/storyBlok";
import type { Product } from "@/types/shopify";

// dependencies
import { useEffect, useState } from "react";
import Slideshow from "@/components/ui/Slideshow";
import CustomImage from "@/components/ui/Image";
// import cn from "classnames";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

const ProductMain = ({ product } : { product: Product }) => {
  const [ thumbsSwiper, setThumbsSwiper ] = useState<any>(null);

  return (
    <div className="relative flex -mx-7 lg:-mx-10">
      <div 
        className="w-1/3 px-7 lg:px-10 flex mb-[58px]"
        style={{ height: thumbsSwiper?.el.offsetHeight }}
      >
        <Swiper
          className="w-full h-full"
          modules={[ Thumbs ]}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
          slidesPerView={2}
          direction="vertical"
          spaceBetween={30}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1440: {
              slidesPerView: 4,
            }
          }}
        >
          {
            product.images.map((image: storyBlokImage, i: number) => {
              return (
                <SwiperSlide key={`${product.id}_${i}`}>
                  <CustomImage 
                    image={image}
                    objectFit="cover"
                    layout="fill"
                  />
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </div>

      <div className="w-2/3 px-7 lg:px-10">
        <Slideshow 
          spaceBetween={0} 
          className="overflow-hidden"
          modules={[ Thumbs ]}
          thumbs={{ swiper: thumbsSwiper }}
          navigationStyle="inset"
        >
          {
            product.images.map((image: storyBlokImage, i: number) => {
              return (
                <div 
                  key={`${product.id}_${i}`}
                  className="relative aspect-square xl:aspect-[12/16]"
                >
                  <CustomImage 
                    image={image}
                    objectFit="cover"
                    layout="fill"
                  />
                </div>
              )
            })
          }
        </Slideshow>
      </div>
    </div> 
  )
}

export default ProductMain;
