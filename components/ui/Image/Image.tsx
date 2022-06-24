import CustomImage from "@/components/ui/Image";
import { SbEditableContent } from "@/types/storyBlok";
import NextImage from 'next/image';
import cn from "classnames";
import type { storyBlokImage } from '@/types/storyBlok';
import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from 'gsap';

interface Props {
  image: storyBlokImage | undefined
  imageTablet?: storyBlokImage | undefined
  imageMobile?: storyBlokImage | undefined
  maxWidth?: number
  preload?: boolean
  align?: 'center' | 'start' | 'end'
  className?: string
  layout?: 'fill' | undefined
  objectFit?: 'contain' | 'cover' | undefined
  pin?: boolean
  alignOverlayContent?: any
  sbEditable?: SbEditableContent
}

const ImageModule: React.FC<Props> = ({
  image,
  imageTablet,
  imageMobile,
  maxWidth,
  align = 'start',
  preload,
  layout,
  objectFit,
  className,
  pin,
  sbEditable,
  children,
  alignOverlayContent,
}) => {
  const tl = useRef<any>(null);
  const containerRef = useRef<null | HTMLDivElement>(null);
  const canUseDOM = typeof window !== 'undefined';
  const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    if (pin && containerRef?.current) {
      tl.current = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: `top top+=${document.getElementById('primary-header')?.clientHeight}`,
          scrub: 1,
          pin: true,
          pinSpacing: false,
          markers: false,
        }
      });

      tl.current.fromTo(containerRef.current, {
        opacity: 0.6,
      }, {
        opacity: 1,
      })

      return () => {
        tl.current.scrollTrigger?.kill();
        tl.current.kill();
      }
    }
  }, [pin]);

  /**
   * TODO: replace with a standard image placeholder when an image doesnt exist
   * 
   */
  if (!image?.filename) return (
    <div className="bg-gray-300 aspect-video flex justify-center items-center text-gray-800">
      Image does not exist
    </div>
  )

  const containerClasses = cn(className, [
    'relative ui-image',
    { 
      'mx-auto' : align === 'center',
      'ml-0' : align === 'start',
      'ml-auto' : align === 'end',
      'h-full' : layout === 'fill',
    }
  ]);

  return (
    <div
      className={containerClasses}
      style={maxWidth ? { maxWidth: maxWidth + 'px' } : {}}
      {...sbEditable}
    >
      {
        image.filename && (
          <>
            <div className={`relative z-10 flex justify-${align} h-full`} ref={containerRef}>
              <CustomImage
                className={cn({
                  "!hidden" : imageMobile && imageMobile.id || imageTablet && imageTablet.id,
                  // "lg:block" : imageMobile && imageMobile.id,
                  "lg:!block" : imageTablet && imageTablet.id,
                })}
                image={image}
                preload={preload}
                layout={layout}
                objectFit={objectFit}
              />

              {
                imageTablet?.id ? (
                  <CustomImage
                    className={cn("md:!block lg:!hidden", {
                      "!hidden" : imageMobile && imageMobile.id,
                    })}
                    image={imageTablet}
                    preload={preload}
                    layout={layout}
                    objectFit={objectFit}
                  />
                ) : null
              }

            {/* 
              {
                imageMobile?.id ? (
                  <CustomImage
                    className={cn({
                      "xl:hidden" : imageTablet && imageTablet.id,
                      // ":hidden" : !imageTablet || imageTablet && !imageTablet.id,
                    })}
                    image={imageMobile} 
                    layout="fill" 
                    objectFit="cover" 
                    preload
                  />
                ) : null
              } */}

              {/* Overlay content */}
              <div className={cn("absolute p-10 lg:p-20 xl:p-24 text-primary uppercase", {
                "bottom-0 right-0 text-right" : alignOverlayContent === "bottom-right",
                "bottom-0 left-0" : alignOverlayContent === "bottom-left",
                "top-0 right-0 text-right" : alignOverlayContent === "top-right",
                "top-0 left-0" : alignOverlayContent === "top-left",
              })}>
                {children}
              </div>
            </div>
          </>
        )
      }
    </div>
  );
};

export default ImageModule;
