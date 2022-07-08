import useIsomorphicLayoutEffect from "@/components/hooks/useIsomorphicLayoutEffect";
import CustomImage from "@/components/ui/Image";
import { SbEditableContent } from "@/types/storyBlok";
import NextImage from 'next/image';
import cn from "classnames";
import type { storyBlokImage } from '@/types/storyBlok';
import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from 'gsap';
import { useSmoothScrollContext } from "@/components/context/smoothScrollContext";

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
  animate?: boolean
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
  animate,
  sbEditable,
  children,
  alignOverlayContent,
}) => {
  const tl = useRef<any>(null);
  const containerRef = useRef<null | HTMLDivElement>(null);
  const imageContainerRef = useRef<null | HTMLDivElement>(null);
  const { scroll } = useSmoothScrollContext();

  useIsomorphicLayoutEffect(() => {
    if (scroll && animate) {
      tl.current = gsap.timeline({
        scrollTrigger: {
          trigger: imageContainerRef.current,
          scrub: 1,
          markers: false,
          scroller: "[data-scroll-container]",
        }
      });

      tl.current.fromTo(imageContainerRef.current, {
        scale: 1.2,
      }, {
        scale: 1,
      })

      return () => {
        tl.current.scrollTrigger?.kill();
        tl.current.kill();
      }
    }
  }, [scroll]);

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
            <div className={`z-10 flex justify-${align} h-full overflow-hidden`} ref={containerRef}>
              <div className="relative inset-0 w-full h-full" ref={imageContainerRef}>
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
                  } 
                */}
              </div>

              {
                children ? (
                  <div className={cn("absolute p-10 lg:p-20 xl:p-24 text-primary", {
                    "bottom-0 right-0 text-right" : alignOverlayContent === "bottom-right",
                    "bottom-0 left-0" : alignOverlayContent === "bottom-left",
                    "top-0 right-0 text-right" : alignOverlayContent === "top-right",
                    "top-0 left-0" : alignOverlayContent === "top-left",
                  })}>
                    {children}
                  </div>
                ) : null
              }
            </div>
          </>
        )
      }
    </div>
  );
};

export default ImageModule;
