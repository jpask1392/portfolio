import useIsomorphicLayoutEffect from "@/components/hooks/useIsomorphicLayoutEffect";
import CustomImage from "@/components/ui/Image";
import cn from "classnames";
import type { storyBlokImage } from '@/types/storyBlok';
import { useRef } from "react";
import { storyblokEditable } from "@storyblok/react";
import type { SbBlokData } from "@storyblok/react"
import { SbEditableContent } from "@/types/storyBlok";

interface Props {
  children?: any
  preload?: boolean
  image: storyBlokImage | undefined
  imageTablet?: storyBlokImage | undefined
  imageMobile?: storyBlokImage | undefined
  maxWidth?: number
  align?: 'center' | 'start' | 'end'
  className?: string
  alignOverlayContent?: any
  aspectRatio?: number
  displayCaption?: boolean
  insetCaption?: boolean
  animate?: boolean
  sizes?: {
    sm?: string
    md?: string
    lg?: string
  }
}

interface Blok extends SbBlokData, Props {}

interface ImageProps extends Props {
  children?: any
  blok?: Blok
}

const ImageModule: React.FC<ImageProps> = ( props ) => {
  const {
    image,
    imageTablet,
    imageMobile,
    maxWidth,
    preload,
    className,
    sizes = {
      sm: "100vw",
      md: "100vw",
      lg: "100vw",
    },
    animate = false,
    aspectRatio = 0,
    displayCaption = false,
    insetCaption = false,
  } = props.blok || props;

  const mobileImageExists = imageMobile && imageMobile.id;
  const tabletImageExists = imageTablet && imageTablet.id;

  return (
    <div
      className={cn(className, "ui-image relative")}
      {...(props.blok && storyblokEditable(props.blok))}
    >
      {
        image?.filename && (
          <div 
            style={{ "--aspect-ratio": `${Math.floor((1 / aspectRatio) * 100)}%` } as React.CSSProperties}
            className={cn("relative w-full overflow-hidden", {
              "h-0 pb-[var(--aspect-ratio)]" : aspectRatio > 0
            })}
          >
            <CustomImage
              image={image}
              animate={animate}
              // tabletImage={tabletImageExists && imageTablet}
              // mobileImage={mobileImageExists && imageMobile}
              preload={preload}
              layout={aspectRatio ? "fill" : undefined}
              sizes={sizes}
            />
          </div>
        )
      }

      {
        displayCaption ? (
          <span className={cn("h4 py-1 border-y border-black inset-x-0 md:absolute top-full mt-2 block", {
            "mx-2" : insetCaption
          })}>{image?.title}</span>
        ) : null
      }

    </div>
  );
};

export default ImageModule;
