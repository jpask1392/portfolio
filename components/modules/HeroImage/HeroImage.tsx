
import cn from 'classnames';
import Container from "@/components/ui/Container";
import { ReactNode, Component } from 'react';
import { useRef, useEffect } from 'react';
import CustomImage from '@/components/ui/Image';
import type { storyBlokImage } from '@/types/storyBlok';
import { gsap } from 'gsap';

interface Props {
  className?: string
  TopBlockComponent?: ReactNode | Component | any
  BottomBlockComponent?: ReactNode | Component | any
  image: storyBlokImage
  imageTablet?: storyBlokImage
  imageMobile?: storyBlokImage
  style?: "narrow" | "fullHeight"
  overlay?: boolean
}

const Hero: React.FC<Props> = ({ 
  className,
  TopBlockComponent,
  BottomBlockComponent,
  image,
  imageTablet,
  imageMobile,
  style = "fullHeight",
  overlay
 }) => {
  const headerRef = useRef<null | HTMLElement>(null);
  const contentRef = useRef<any>(null);

  useEffect(() => {
    const tl = gsap.timeline({});

    tl.fromTo(contentRef.current, { 
      opacity: 0,
      y: 100,
    }, {
      opacity: 1,
      y: 0,
      // stagger: 0.15,
      duration: 0.9,
      ease: "power4.out",
      delay: 0.4,
    });
  }, [])

  return (
    <section className="hero overflow-hidden ml-auto lg:-ml-16 xl:-ml-32" ref={headerRef}>
      <div className={cn("flex relative min-w-[100vw]", {
        "h-[90vh] xl:h-auto xl:aspect-video max-h-[90vh] items-end" : style === "fullHeight",
        "aspect-[9/4] md:aspect-[9/3] xl:aspect-[9/2] items-end xl:items-center pb-8" : style === "narrow"
      })}>

        {
          TopBlockComponent ? (
            <div 
              className={cn("w-full opacity-0 z-10", {
                "pb-28 md:pb-44 xl:pt-40" : style === "fullHeight"
              })}
              ref={contentRef}
            >
              <Container el="div">
                <div className="w-full h-full flex flex-col">
                  <div data-scroll data-scroll-speed="0">
                    <TopBlockComponent />
                  </div>
                </div>
              </Container>
            </div>
          ) : null
        }

        {/* Image Block */}
        <div className={cn([
          "absolute inset-0 py-0 z-0"
        ])}>
          <div 
            className="h-full w-screen relative" 
            data-scroll 
            data-scroll-speed="0"
          >
            {
              overlay ? (
                <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
              ) : null
            }

            {/* 
              TODO: Move this into a separate repsonsive image component and make resuable
            */}

            <CustomImage
              className={cn("h-full w-full", {
                "!hidden" : imageMobile && imageMobile.id || imageTablet && imageTablet.id,
                // "xl:!block" : imageMobile && imageMobile.id,
                "xl:!block" : imageTablet && imageTablet.id,
              })}
              image={image} 
              layout="fill" 
              preload
            />

            {
              imageTablet?.id ? (
                <CustomImage
                  className={cn("md:!block xl:!hidden h-full w-full", {
                    "hidden" : imageMobile && imageMobile.id,
                  })}
                  image={imageTablet} 
                  layout="fill" 
                  preload
                />
              ) : null
            }

            {
              imageMobile?.id ? (
                <CustomImage
                  className={cn("h-full w-full", {
                    "lg:!hidden" : imageTablet && imageTablet.id,
                    // ":hidden" : !imageTablet || imageTablet && !imageTablet.id,
                  })}
                  image={imageMobile} 
                  layout="fill" 
                  preload
                />
              ) : null
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero;
