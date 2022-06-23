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
}) => {
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

  const dataBlurURL = () => {
    if (image.filename.includes('storyblok')) {
      return `${image.filename}/m/10x10`;
    }

    if (image.filename.includes('shopify')) {
      return image.thumbnail_url;
    }

    return '/';
  }

  if (!image.filename) return null;

  return (
    <div className={className}>
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
    </div>
  );
};

export default CustomImage;
