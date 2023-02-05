import SlideArrow from "./SlideArrow";
// import DynamicComponent from "@/components/helpers/DynamicComponent";
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
  thumbs?: any
  modules?: any[]
  navigationStyle?: "inset"
  onResize?: any
  showPagination?: boolean
  showNavigation?: boolean
}

const Slideshow: React.FC<Props> = ({ 
  effect = 'slide',
  onResize,
  showSlides = {
    sm: 1,
    lg: 1,
    xl: 1
  },
  children,
  className,
  spaceBetween = 0,
  modules = [],
  thumbs,
  navigationStyle = "inset",
  showPagination = false,
  showNavigation = false,
}) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const paginationContainerRef = useRef(null);

  const navigationArrowClasses = cn([
    "aspect-square",
    "pointer-events-auto",
    "transition-opacity",
    "duration-700",
    "focus:ring"
  ]);

  const handleRefConnection = (swiper: any) => {
    const { 
      navigation = false, 
      pagination = false, 
    } = swiper.params;

    if (typeof navigation === 'object' && showNavigation) {
      navigation.prevEl = navigationPrevRef.current;
      navigation.nextEl = navigationNextRef.current;

      // swiper.navigation.init();
      swiper.navigation.update();
    }

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
    draggable: false,
    enabled: children.length > 1,
    slidesPerView: showSlides.sm || 1,
    spaceBetween: spaceBetween > 30 ? 22 : spaceBetween,
    onSwiper: handleRefConnection,
    onBreakpoint: handleRefConnection,
    onResize: onResize,
    thumbs: thumbs,
    noSwiping: true,
    noSwipingClass: 'swiper-slide',
    breakpoints: {
      768: {
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
      className={cn(className, "ui-slideshow w-full", [navigationStyle])}
      style={style}
    >
      
      <Swiper {...swiperProps}>
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

        {
          showNavigation ? (
            <div className="text-center mt-12">
              <button ref={navigationPrevRef} className={cn(navigationArrowClasses, "mr-8")}>
                <SlideArrow direction="previous"/>
              </button>
              <button ref={navigationNextRef} className={cn(navigationArrowClasses)}>
                <SlideArrow direction="next" />
              </button>
            </div>
          ) : null
        }

        {
          showPagination ? (
            <div className="container mt-8 md:mt-12">
              <div ref={paginationContainerRef} className="pagination-container" />
            </div>
          ) : null
        }
     </Swiper>
    </div>
  )
};

export default Slideshow;
