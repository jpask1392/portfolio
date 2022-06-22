import { ReactNode, Component } from 'react';

import CustomImage from '@/components/ui/Image';
import type { storyBlokImage } from '@/types/storyBlok';

import cn from 'classnames';

interface Props {
  className?: string
  children?: ReactNode | Component | any
  image1: storyBlokImage
  image2: storyBlokImage
  image3: storyBlokImage
  image4: storyBlokImage
}

const SplitTiledImage: React.FC<Props> = ({
  image1,
  image2,
  image3,
  image4,
}) => {
  const images = [
    {
      image: image1,
      aspectRatio: "73/100",
      marginTop: 0
    },
    {
      image: image2,
      aspectRatio: "80/100",
      marginTop: "53%" 
    },
    {
      image: image3,
      aspectRatio: "100/67",
      marginTop: "-41%" 
    },
    {
      image: image4,
      aspectRatio: "100/56",
      marginTop: 0
    }
  ]

  return (
    <div className={cn('relative', {

    })}>
      <div className="relative z-0 flex flex-wrap -mx-2">
        {
          images.map(({
            image,
            aspectRatio,
            marginTop
          }, index) => {
            return (
              <div className="w-1/2 p-1" key={index}>
                <div className={cn({
                  "aspect-[73/100]" : aspectRatio === "73/100",
                  "aspect-[80/100]" : aspectRatio === "80/100",
                  "aspect-[100/67]" : aspectRatio === "100/67",
                  "aspect-[100/56]" : aspectRatio === "100/56",
                  "mt-[-41%]" : marginTop === "-41%",
                  "mt-[53%]" : marginTop === "53%",
                })}>
                  <CustomImage
                    image={image} 
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default SplitTiledImage;
