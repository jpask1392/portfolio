import { sbEditable } from "@storyblok/storyblok-editable";
import SlideArrow from "./SlideArrow";
import DynamicComponent from "@/components/helpers/DynamicComponent";
import { SbEditableContent } from "@/types/storyBlok";
import cn from "classnames";

import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions, Navigation, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
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
    md: 1,
    lg: 1
  },
  children,
  className,
  spaceBetween = 0
}) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const scrollBarRef = useRef(null);

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
    const { 
      navigation = false, 
      scrollbar = false, 
    } = swiper.params;

    if (typeof navigation === 'object') {
      navigation.prevEl = navigationPrevRef.current;
      navigation.nextEl = navigationNextRef.current;

      swiper.navigation.init();
      swiper.navigation.update();
    }

    if (typeof scrollbar === 'object') {
      scrollbar.el = scrollBarRef.current;
      scrollbar.draggable = true;

      swiper.scrollbar.init();
      swiper.scrollbar.updateSize();
    }
  }

  return (
    <div
      className={cn(className, "ui-slideshow w-full")}
    >
      <Swiper
        className="px-8"
        threshold={10}
        modules={[Navigation, A11y]}
        draggable={true}
        // scrollbar={{ draggable: false }}
        enabled={children.length > 1}
        slidesPerView={showSlides.sm || 1}
        spaceBetween={spaceBetween > 30 ? 22 : spaceBetween}
        onBeforeInit={handleRefConnection}
        onBreakpoint={handleRefConnection}
        breakpoints={{
          640: {
            slidesPerView: showSlides.sm,
            spaceBetween: spaceBetween,
          },
          1024: {
            slidesPerView: showSlides.lg
          },
          1440: {
            slidesPerView: showSlides.xl
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


        <div className="w-full absolute top-1/2 transform -translate-y-1/2 z-10 pointer-events-none hidden lg:flex justify-between">
          <button ref={navigationPrevRef} className={cn(navigationArrowClasses, "-translate-x-1/2")}>
            <SlideArrow direction="previous" className="text-black" />
          </button>
          <button ref={navigationNextRef} className={cn(navigationArrowClasses, "translate-x-1/2")}>
            <SlideArrow direction="next" className="text-black" />
          </button>
        </div>

        {/* <div className="container -ml-8 mt-10">
          <div ref={scrollBarRef} className="scrollbar" />
        </div> */}
     </Swiper>
    </div>
  )
};

export default Slideshow;
