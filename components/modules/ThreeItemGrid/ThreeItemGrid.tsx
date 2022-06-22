import { ReactNode, Component, useRef, useEffect, useState } from 'react';

import useDevice from '@/components/hooks/useDevice';
import CustomImage from '@/components/ui/Image';
import Header from '@/components/ui/Header';

import cn from 'classnames';
import RichText from '@/components/ui/RichText';
import ButtonGroup from '@/components/ui/ButtonGroup';
import Button from '@/components/ui/Button';
import Column from '@/components/ui/Column';
import type { storyBlokImage, storyBlokLink } from '@/types/storyBlok'
// import { Swiper, SwiperSlide } from 'swiper/react';
import Swiper from 'swiper';


interface Props {
  className?: string
  children?: ReactNode | Component | any
  itemOneImage?: storyBlokImage
  itemOneHeader?: string
  itemOneText?: string
  itemTwoImage?: storyBlokImage
  itemTwoHeader?: string
  itemTwoText?: string
  itemThreeImage?: storyBlokImage
  itemThreeHeader?: string
  itemThreeText?: string
  buttonText?: string
  buttonLink?: storyBlokLink
}

const ThreeItemGrid: React.FC<Props> = ({ 
  className,
  itemOneImage,
  itemOneHeader,
  itemOneText,
  itemTwoImage,
  itemTwoHeader,
  itemTwoText,
  itemThreeImage,
  itemThreeHeader,
  itemThreeText,
  buttonText,
  buttonLink,
}) => {
  const swiperRef = useRef<any>(null);
  const [swiper, setSwiper] = useState<any>(null);
  const device = useDevice();

  useEffect(() => {
    if (device === "mobile") {
      const swiperInstance = new Swiper(swiperRef.current, {
        speed: 400,
        spaceBetween: 100,
      });

      setSwiper(swiperInstance);
    } else {
      swiper?.destroy(false, true);
      setSwiper(null);
    }
  }, [device])

  useEffect(() => {
    console.log(swiper)
  }, [swiper])

  return (
    <div>
      <div className={cn(className, 'flex md:block w-full overflow-scroll')}>
        <div className="swiper" ref={swiperRef}>
          <div className={cn({"swiper-wrapper": device === 'mobile'})}>
          <div className="swiper-slide">
            {/* item one */}
            <div className="grid-item-1 w-full flex flex-wrap md:flex-nowrap md:space-x-6 2xl:space-x-28 flex-shrink-0">
              <div className="w-full md:w-6/12">
                <div className="aspect-[100/80] md:aspect-[75/100] lg:aspect-square 2xl:aspect-[100/63] bg-gray-200">
                  <CustomImage 
                    image={itemOneImage} 
                    layout="fill" 
                    objectFit="cover"
                  />
                </div>
              </div>

              <div className="mt-6 md:m-0 md:w-6/12">
                <Header color="black" tag="h3">
                  {itemOneHeader}
                </Header>
                <RichText 
                  text={itemOneText} 
                  animationDelay={0}
                />
              </div>
            </div>
          </div>

          <div className="swiper-slide">
            {/* item two */}
            <div className="grid-item-2 w-full flex flex-wrap md:w-1/2 md:pr-3 2xl:pr-14 md:mt-6 2xl:mt-28 md:float-left flex-shrink-0">
              <div className="w-full 2xl:w-1/2 2xl:order-2">
                <div className="aspect-[100/80] md:aspect-[88/100] lg:aspect-[100/78] 2xl:aspect-[67/100] bg-gray-200">
                  <CustomImage 
                    image={itemTwoImage} 
                    layout="fill" 
                    objectFit="cover"
                  />
                </div>
              </div>

              <div className="w-full 2xl:w-1/2 mt-6 md:mt-16 2xl:mt-0 2xl:pr-12">
                <Header color="black" tag="h3">
                  {itemTwoHeader}
                </Header>
                <RichText 
                  text={itemTwoText} 
                  animationDelay={0}
                />
                {
                  buttonText && (
                    <Column 
                      className="hidden 2xl:block"
                      padTop="md"
                    >
                      <ButtonGroup>
                        <Button 
                          text={buttonText} 
                          onDark={false} 
                        />
                      </ButtonGroup>
                    </Column>
                  )
                }
              </div>
            </div>
          </div>

          <div className="swiper-slide">
            {/* item three */}
            <div className="grid-item-3 w-full flex flex-wrap md:w-1/2 md:pl-3 2xl:pl-14 mt-0 md:-mt-28 lg:-mt-[18%] 2xl:-mt-[10%] md:float-right flex-shrink-0">
              <div className="w-full">
                <div className="aspect-[100/80] md:aspect-[65/100] lg:aspect-[83/100] 2xl:aspect-[100/83] bg-gray-200">
                  <CustomImage 
                    image={itemThreeImage} 
                    layout="fill" 
                    objectFit="cover"
                  />
                </div>
              </div>

              <div className="w-full mt-6 md:mt-16">
                <Header color="black" tag="h3">
                  {itemThreeHeader}
                </Header>
                <RichText 
                  text={itemThreeText} 
                  animationDelay={0}
                />
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      
      {
        buttonText && (
          <Column 
            padTop="md"
            className="xl:hidden"
          >
            <ButtonGroup align="center">
              <Button 
                text={buttonText} 
                onDark={false} 
              />
            </ButtonGroup>
          </Column>
        )
      }
    </div>
  )
}

export default ThreeItemGrid;
