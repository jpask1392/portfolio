import CustomImage from "@/components/ui/Image";
import { SbEditableContent } from "@/types/storyBlok";
import cn from "classnames";
import type { storyBlokImage } from '@/types/storyBlok';
import { useEffect, useLayoutEffect, useRef } from "react";
import type { SbBlokData } from "@storyblok/react";

interface Props {
  className?: string
  image: storyBlokImage | undefined
  imageTablet?: storyBlokImage | undefined
  imageMobile?: storyBlokImage | undefined
  maxWidth?: number
  align?: 'center' | 'start' | 'end'
  fill?: boolean
  sbEditable?: SbEditableContent
  sizes?: {
    items: {
      name: string
      value: string
    }[]
  }
}

interface Blok extends SbBlokData, Props {}

interface ImageProps extends Props {
  children: any
  blok?: Blok
}

const ImageModule: React.FC<ImageProps> = (props) => {
  const {
    image,
    imageTablet,
    imageMobile,
    maxWidth,
    align = 'start',
    className,
    sizes: pluginSizes,
    fill
  } = props.blok || props;

  const containerRef = useRef<null | HTMLDivElement>(null);
  const imageContainerRef = useRef<null | HTMLDivElement>(null);
  const mobileImageExists = imageMobile && imageMobile.id;
  const tabletImageExists = imageTablet && imageTablet.id;

  let sizes: any = {};

  if (pluginSizes && pluginSizes.items) {
    pluginSizes.items.forEach(({ name, value }) => {
      sizes[name] = value;
    })
  }

  /**
   * TODO: replace with a standard image placeholder when an image doesnt exist
   * 
   */
  if (!image?.filename) return (
    <div className="bg-primary-300 aspect-video flex justify-center items-center text-primary-800">
      Image does not exist
    </div>
  )

  const containerClasses = cn(className, [
    'relative ui-image',
    { 
      'mx-auto' : align === 'center',
      'ml-0' : align === 'start',
      'ml-auto' : align === 'end',
      // 'h-full' : layout === 'fill',
    }
  ]);

  return (
    <div
      className={containerClasses}
      style={maxWidth ? { maxWidth: maxWidth + 'px' } : {}}
    >
      {
        image.filename && (
          <>
            <div className={`z-10 flex justify-${align} h-full overflow-hidden`} ref={containerRef}>
              <div className="relative inset-0 w-full h-full" ref={imageContainerRef}>
                <CustomImage
                  className={cn({
                    "!hidden" : mobileImageExists || tabletImageExists,
                    "lg:!block" : mobileImageExists && !tabletImageExists,
                    "xl:!block" : mobileImageExists && tabletImageExists,
                  })}
                  image={image}
                  fill={fill}
                  maxWidth={maxWidth}
                  sizes={sizes}
                />

                {
                  imageTablet?.id ? (
                    <CustomImage
                      className={cn("xl:!hidden", {
                        "!hidden" : mobileImageExists,
                        "lg:!block" : mobileImageExists,
                      })}
                      image={imageTablet}
                      sizes={sizes}
                    />
                  ) : null
                }

                {
                  imageMobile?.id ? (
                    <CustomImage
                      className={cn("xl:!hidden", {
                        "lg:!hidden" : tabletImageExists || !tabletImageExists,
                      })}
                      image={imageMobile} 
                      sizes={sizes}
                    />
                  ) : null
                } 
               
              </div>
            </div>
          </>
        )
      }
    </div>
  );
};

export default ImageModule;
