// https://nextjs.org/docs/api-reference/next/image

import NextImage from 'next/image';
import cn from "classnames";
import type { storyBlokImage } from '@/types/storyBlok';
import { useState } from 'react';

interface Props {
  image: storyBlokImage | undefined
  maxWidth?: number
  preload?: boolean
  className?: string
  fill?: boolean
  sizes?: {
    sm?: string
    md?: string
    lg?: string
  }
}

const CustomImage: React.FC<Props> = ({
  image,
  preload,
  className,
  sizes,
  maxWidth,
  fill = false,
}) => {
  const [ loading, setLoading ] = useState(true);

  // if image isn't supplied, return nothing.
  if (!image || !image?.filename) return null;

  let imageSourceCDN = "";
  if (image.filename.includes('storyblok')) imageSourceCDN = "storyblok";
  if (image.filename.includes('shopify')) imageSourceCDN = "shopify";

  const dimensions = {
    width: 0,
    height: 0,
    aspect: 0,
  }

  // TODO: set default if image is staticly imported
  // dimensions['width'] = 0;
  // dimensions['height'] = 0;

  if (imageSourceCDN === "shopify") {
    // these dimesions come through via the image object in Shopify
    dimensions['width'] = image.width || 0;
    dimensions['height'] = image.height || 0;
  }

  if (imageSourceCDN === "storyblok") {
    // storyblok solution
    dimensions['width'] = parseInt(image.filename?.split('/')[5].split('x')[0]);
    dimensions['height'] = parseInt(image.filename?.split('/')[5].split('x')[1]);
  }

  // set aspect ratio of image
  dimensions['aspect'] = dimensions['height'] /  dimensions['width'];

  // alter dimensions if maxWidth set
  if (maxWidth) {
    dimensions['width'] = maxWidth;
    dimensions['height'] = maxWidth * dimensions['aspect'];
  }

  /**
   * Data blur function to get the blurred 
   * image URL for loading
   * 
   * @returns 
   */
  const getPlaceholderUrl = () => {
    let placeholderUrl = ""
    if (imageSourceCDN === "storyblok") placeholderUrl = `${image.filename}/m/10x10`;
    if (imageSourceCDN === "shopify") placeholderUrl = `${image.filename}&width=10`;

    return placeholderUrl;
  }

  
  /**
   * Using a loader to prevent unnecessary 
   * requests to external CDN. Nextjs's image optimizer
   * collects the full size image and morphs them on 
   * their own server. Storyblok and Shopify already 
   * do this so is not necessary to do again. It also
   * causes bigger financial charges from Storyblok by
   * pulling in their full size images.
   * 
   * @param param0 
   * @returns 
   */
  const myLoader = ({ 
    src, 
    width,
  }: {
    src: string,
    width: number,
  }) => {
    let morphedSrc = src;
    let maxImageWidth = maxWidth ? maxWidth : width;

    // reduce quality and resize
    if (imageSourceCDN === "storyblok") morphedSrc = `${src}/m/${maxImageWidth}x0/filters:quality(75)`;
    if (imageSourceCDN === "shopify") morphedSrc = `${src}&width=${maxImageWidth}`;
    return `${morphedSrc}`
  }

  return (
    <>
      {
        loading ? (
          /**
           * nextjs 13 image placeholder doesn't accept
           * image urls anymore. It wants datablur base64 
           * encoded images, using Plaiceholder but is 
           * difficult to get these on the fly. This is a 
           * workaround to show a blurred image while loading 
           */ 
          <div
            className="inset-0"
            style={{
              // width: !fill ? dimensions.width : "100%",
              // height: !fill ? dimensions.height : "100%",
              backgroundImage: `url(${getPlaceholderUrl()})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: "cover",
              position: "absolute"
            }}
          />
        ) : null
      }

      <NextImage
        className={cn(className, { "object-cover" : fill })}
        src={image.filename}
        alt={image.alt || 'Image'}
        width={!fill ? dimensions.width : undefined}
        height={!fill ? dimensions.height : undefined}
        loader={myLoader}
        onLoad={() => setLoading(false)}
        // placeholder="empty"
        // blurDataURL={dataBlurURL()}
        priority={preload}
        fill={fill}
        sizes={sizes ? `
          (max-width: 768px) ${sizes.sm || '100vw'},
          (max-width: 1200px) ${sizes.md || '100vw'},
          ${sizes.lg || '100vw'}
        ` : undefined}
      />
    </>
  );
};

export default CustomImage;
