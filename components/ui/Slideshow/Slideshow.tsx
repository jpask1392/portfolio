import SlideArrow from "./SlideArrow";
import { StoryblokComponent } from "@storyblok/react"
import cn from "classnames";
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions, Navigation, A11y, Pagination, EffectFade } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { useRef } from "react";
import { ReactNode, Component } from 'react';
import type { SbBlokData } from "@storyblok/react"

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
  slides?: any
  thumbs?: any
  modules?: any[]
  navigationStyle?: "inset"
  onResize?: any
  showPagination?: boolean
  showNavigation?: boolean
  navigationLocation?: string | "bottom" | "sides"
  centeredSlides?: boolean
}

interface Blok extends SbBlokData, Props {}

interface SlideshowProps extends Props {
  children: any
  blok?: Blok
}

const Slideshow: React.FC<SlideshowProps> = (props) => {
  const { 
    effect = 'fade',
    onResize,
    showSlides = {
      sm: 1,
      lg: 1,
      xl: 1
    },
    children,
    slides,
    className,
    spaceBetween = 0,
    modules = [],
    thumbs,
    showPagination = false,
    showNavigation = true,
    navigationLocation = "bottom",
    centeredSlides = false
  } = props.blok || props;

  const paginationContainerRef = useRef(null);

  const handleRefConnection = (swiper: any) => {
    const { 
      pagination = false, 
    } = swiper.params;

    if (typeof pagination === 'object' && showPagination) {
      pagination.el = paginationContainerRef.current;
      pagination.clickable = true;

      // swiper.pagination.init();
      swiper.pagination.update();
    }
  }

  const style = {
    ["--slides-per-view-base" as any]: showSlides.sm,
    ["--slides-per-view-lg" as any]: showSlides.lg,
    ["--slides-per-view-xl" as any]: showSlides.xl,
    ["--slides-spaceBetween" as any]: (spaceBetween > 30 ? 22 : spaceBetween) + "px",
  } as React.CSSProperties;

  const swiperProps = {
    threshold: 10,
    modules: [ Navigation, A11y, Pagination, ...modules ],
    draggable: true,
    onSwiper: handleRefConnection,
    onBreakpoint: handleRefConnection,
    onResize: onResize,
    loop: centeredSlides,
    centeredSlides: centeredSlides,
    thumbs: thumbs,
    noSwiping: true,
    noSwipingClass: 'swiper-slide',
    breakpoints: {
      320: {
        slidesPerView: showSlides.sm,
        spaceBetween: spaceBetween > 30 ? 22 : spaceBetween,
      },
      840: {
        slidesPerView: showSlides.lg,
        spaceBetween: spaceBetween === 90 ? 50 : spaceBetween,
      },
      1440: {
        slidesPerView: showSlides.xl,
        spaceBetween: spaceBetween,
      }
    }
  }

  return (
    <div
      className={cn(className, "ui-slideshow w-full")}
      style={style}
    >
      
      <Swiper 
        {...swiperProps}
        slidesPerView="auto"
      >
        {
          children ? children?.flat().map((child: any, i: number) => {
            if (!child) return;

            return (
              <SwiperSlide key={child.key}>
                {
                  ('blok' in child.props)
                    ? <StoryblokComponent blok={child.props.blok} />
                    : child
                }
              </SwiperSlide>
            )
          }) : null
        }

        {
          !children && slides ? slides.map((blok: SbBlokData, i: number) => {
            return (
              <SwiperSlide key={i} className={cn({
                "lg:px-20" : navigationLocation === "sides"
              })}>
                <StoryblokComponent blok={blok} />
              </SwiperSlide>
            )
          }): null
        }

        {
          showNavigation ? (
            <div className={cn("text-center flex ", {
              "mt-12 lg:mt-0 justify-center lg:justify-between lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:w-full z-10" : navigationLocation === "sides",
              "justify-center mt-12" : navigationLocation !== "sides"
            })}>
              <SlideArrow direction="previous" className="mr-8"/>
              <SlideArrow direction="next" />
            </div>
          ) : null
        }
     </Swiper>
    </div>
  )
};

export default Slideshow;
