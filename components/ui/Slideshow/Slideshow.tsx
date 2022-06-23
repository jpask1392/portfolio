import { sbEditable } from "@storyblok/storyblok-editable";
import SlideArrow from "./SlideArrow";
import DynamicComponent from "@/components/helpers/DynamicComponent";
import { SbEditableContent } from "@/types/storyBlok";
import cn from "classnames";

import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions, Navigation, A11y, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { useRef } from "react";
import { ReactNode, Component } from 'react';

interface Props {
  className?: string
  effect?: SwiperOptions["effect"]
  showSlides?: {
    sm: number,
    lg: number,
    xl: number,
  }
  spaceBetween?: number
  children: ReactNode[] | Component[] | any[]
}

const Slideshow: React.FC<Props> = ({ 
  effect = 'slide',
  showSlides = {
    sm: 1,
    lg: 1,
    xl: 1
  },
  children,
  className,
  spaceBetween = 0
}) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const scrollBarRef = useRef(null);
  const paginationContainerRef = useRef(null);

  const navigationArrowClasses = cn([
    "bg-secondary",
    "rounded-full",
    "aspect-square",
    "pointer-events-auto",
    "transition-opacity",
    "duration-700",
    "focus:ring"
  ])

  const handleRefConnection = (swiper: any) => {
    console.log(children)
    const { 
      navigation = false, 
      pagination = false, 
    } = swiper.params;

    if (typeof navigation === 'object') {
      navigation.prevEl = navigationPrevRef.current;
      navigation.nextEl = navigationNextRef.current;

      swiper.navigation.init();
      swiper.navigation.update();
    }

    if (typeof pagination === 'object') {
      pagination.el = paginationContainerRef.current;
      pagination.clickable = true;

      // swiper.pagination.init();
      swiper.pagination.update();
    }
  }

  return (
    <div
      className={cn(className, "ui-slideshow w-full")}
    >
      
      <Swiper
        threshold={10}
        modules={[Navigation, A11y, Pagination]}
        draggable={true}
        enabled={children.length > 1}
        slidesPerView={showSlides.sm || 1}
        spaceBetween={spaceBetween > 30 ? 22 : spaceBetween}
        onSwiper={handleRefConnection}
        // onBeforeInit={handleRefConnection}
        onBreakpoint={handleRefConnection}
        breakpoints={{
          640: {
            slidesPerView: showSlides.sm,
            spaceBetween: spaceBetween,
          },
          1024: {
            slidesPerView: showSlides.lg,
            spaceBetween: spaceBetween,
          },
          1440: {
            slidesPerView: showSlides.xl,
            spaceBetween: spaceBetween,
          }
        }}
      >
        {
          children.flat().map((child, i) => {
            if (!child) return;
            return (
              <SwiperSlide key={child.key}>
                {
                  ('blok' in child.props)
                    ? <DynamicComponent blok={child.props.blok} />
                    : child
                }
              </SwiperSlide>
            )
          })
        }

        <div className="absolute top-1/2 inset-x-0 transform -translate-y-1/2 z-10 pointer-events-none hidden lg:flex justify-between">
          <button ref={navigationPrevRef} className={cn(navigationArrowClasses)}>
            <SlideArrow direction="previous" className="text-white" />
          </button>
          <button ref={navigationNextRef} className={cn(navigationArrowClasses)}>
            <SlideArrow direction="next" className="text-white" />
          </button>
        </div>

        <div className="container mt-12">
          <div ref={paginationContainerRef} className="pagination-container" />
        </div>
     </Swiper>
    </div>
  )
};

export default Slideshow;
