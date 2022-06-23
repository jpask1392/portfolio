import { SbEditableContent } from "@/types/storyBlok";
import NextImage from 'next/image';
import cn from "classnames";
import type { storyBlokImage } from '@/types/storyBlok';
import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from 'gsap';

interface Props {
  image: storyBlokImage | undefined
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

const CustomImage: React.FC<Props> = ({
  image,
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

  const dimensions = {
    width: 0,
    height: 0
  }

  if (image.width || image.height) {
    dimensions['width'] = image.width || 0;
    dimensions['height'] = image.height || 0;
  } else {
    // storyblok solution
    dimensions['width'] = parseInt(image.filename?.split('/')[5].split('x')[0]);
    dimensions['height'] = parseInt(image.filename?.split('/')[5].split('x')[1]);
  }

  const containerClasses = cn(className, [
    'relative ui-image',
    { 
      'mx-auto' : align === 'center',
      'ml-0' : align === 'start',
      'ml-auto' : align === 'end',
      'h-full' : layout === 'fill',
    }
  ]);

  const dataBlurURL = () => {
    if (image.filename.includes('storyblok')) {
      return `${image.filename}/m/10x10`;
    }

    if (image.filename.includes('shopify')) {
      return image.thumbnail_url;
    }

    return '/';
  }


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
              <NextImage
                src={image.filename}
                alt={image.alt || 'Image'}
                width={layout != 'fill' ? dimensions.width : undefined}
                height={layout != 'fill' ? dimensions.height : undefined}
                placeholder="blur"
                blurDataURL={dataBlurURL()}
                priority={preload}
                layout={layout}
                objectFit={objectFit}
              />

              {/* Overlay content */}
              <div className={cn("absolute p-20 xl:p-24", {
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

export default CustomImage;
