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

  let url: string | undefined;
  if (image && "filename" in image) url = image.filename;

  // if image isn't supplied, return nothing.
  if (!url || !image) return null;

  let imageSourceCDN = "";
  if (url.includes('storyblok')) imageSourceCDN = "storyblok";

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
    dimensions['width'] = parseInt(url.split('/')[5].split('x')[0]);
    dimensions['height'] = parseInt(url.split('/')[5].split('x')[1]);
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
    if (imageSourceCDN === "storyblok") placeholderUrl = `${url}/m/10x10`;

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
    return `${morphedSrc}`
  }

  const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

  const triplet = (e1: number, e2: number, e3: number) =>
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63)

  const rgbDataURL = (r: number, g: number, b: number) =>
    `data:image/gif;base64,R0lGODlhAQABAPAA${
      triplet(0, r, g) + triplet(b, 255, 255)
    }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`

  return (
    <>
      {/* {
        loading && !preload ? (
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
      } */}

      <NextImage
        className={cn(className, { "object-cover" : fill })}
        src={url}
        alt={'Image'}
        width={!fill ? dimensions.width : undefined}
        height={!fill ? dimensions.height : undefined}
        loader={myLoader}
        // onLoad={() => setLoading(false)}
        placeholder="blur"
        blurDataURL={rgbDataURL(245, 245, 245)}
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
