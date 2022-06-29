import Slideshow from "@/components/ui/Slideshow";
import CustomImage from "@/components/ui/Image";
import InfoPill from '@/components/ui/InfoPill';
import cn from "classnames";
import type { storyBlokImage } from "@/types/storyBlok";
import type { Product } from "@/types/shopify";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useEffect, useState } from "react";

const ProductMain = ({ product } : { product: Product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="relative flex -mx-7 lg:-mx-10">
      <div className="w-1/3 px-7 lg:px-10">
        <div className="h-full">
          <Swiper
            className="h-full"
            modules={[Thumbs]}
            watchSlidesProgress
            onSwiper={setThumbsSwiper}
            slidesPerView={2}
            direction="vertical"
            spaceBetween={30}
            breakpoints={{
              768: {
                slidesPerView: 3,
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
      </div>

      <div className="w-2/3 px-7 lg:px-10">
        <Slideshow spaceBetween={0} className="overflow-hidden">
          {
            product.images.map((image: storyBlokImage, i: number) => {
              return (
                <div 
                  key={`${product.id}_${i}`}
                  className="relative aspect-square lg:aspect-[12/16]"
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

        {/* <Swiper
          modules={[ Navigation, A11y, Thumbs ]}
          thumbs={{ swiper: thumbsSwiper }}
          draggable={true}
        >
            {
              product.images.map((image: storyBlokImage, i: number) => {
                return (
                  <SwiperSlide key={`${product.id}_${i}`} className="bg-gray3">
                    <div className="relative aspect-square lg:aspect-[12/16]">
                      <CustomImage 
                        image={image}
                        objectFit="cover"
                        layout="fill"
                      />
                    </div>
                  </SwiperSlide>
                )
              })
            }
        </Swiper> */}
      </div>
    </div> 
  )
}

export default ProductMain;
