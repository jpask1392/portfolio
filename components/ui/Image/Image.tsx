import useIsomorphicLayoutEffect from "@/components/hooks/useIsomorphicLayoutEffect";
import CustomImage from "@/components/ui/Image";
import { SbEditableContent } from "@/types/storyBlok";
import cn from "classnames";
import type { storyBlokImage } from '@/types/storyBlok';
import { useRef } from "react";
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
  animate?: boolean
  alignOverlayContent?: any
  sbEditable?: SbEditableContent
  children?: any
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

  useIsomorphicLayoutEffect(() => {
    if (animate) {
      tl.current = gsap.timeline({
        scrollTrigger: {
          trigger: imageContainerRef.current,
          scrub: 1,
          markers: false,
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
  }, []);

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
                    "!hidden" : imageTablet && imageTablet.id || imageMobile && imageMobile.id,
                    "lg:!block" : imageMobile && imageMobile.id,
                    "xl:!block" : imageTablet && imageTablet.id,
                  })}
                  image={image}
                  preload={preload}
                  layout={layout}
                  objectFit={objectFit}
                />

                {
                  imageTablet?.id ? (
                    <CustomImage
                      className={cn({
                        "!hidden lg:!block" : imageMobile && imageMobile.id,
                        "xl:!hidden" : imageMobile && !imageMobile.id,
                      })}
                      image={imageTablet}
                      preload={preload}
                      layout={layout}
                      objectFit={objectFit}
                    />
                  ) : null
                }

                {
                  imageMobile?.id ? (
                    <CustomImage
                      className={cn({
                        // "lg:!hidden" : imageTablet && imageTablet.id,
                        "lg:!hidden" : imageTablet && !imageTablet.id,
                      })}
                      image={imageMobile} 
                      preload={preload}
                      layout={layout}
                      objectFit={objectFit}
                    />
                  ) : null
                } 
               
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
