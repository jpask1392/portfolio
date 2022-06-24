
import cn from 'classnames';
import Container from "@/components/ui/Container";
import { ReactNode, Component } from 'react';
import { useRef, useEffect } from 'react';
import CustomImage from '@/components/ui/Image';
import type { storyBlokImage } from '@/types/storyBlok';
import { useSmoothScrollContext } from "@/components/context/smoothScrollContext";
import { gsap } from 'gsap';

interface Props {
  className?: string
  TopBlockComponent?: ReactNode | Component | any
  BottomBlockComponent?: ReactNode | Component | any
  image: storyBlokImage
  imageTablet: storyBlokImage
  imageMobile: storyBlokImage
  asSeenOn: storyBlokImage
}

const Hero: React.FC<Props> = ({ 
  className,
  TopBlockComponent,
  BottomBlockComponent,
  image,
  imageTablet,
  imageMobile,
  asSeenOn,
 }) => {
  const headerRef = useRef<null | HTMLElement>(null);
  const contentRef = useRef<any>(null);
  const { scroll } = useSmoothScrollContext();

  useEffect(() => {
    if (scroll) {
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
    }
  }, [scroll])

  return (
    <section className="hero overflow-hidden" ref={headerRef}>
      <div className="flex items-end xl:items-start relative h-[90vh] xl:h-auto xl:aspect-video max-h-[90vh] min-w-[100vw]">

        {
          (TopBlockComponent || BottomBlockComponent) && (
            <div 
              className="w-full pb-44 xl:pt-40 opacity-0 z-10"
              ref={contentRef}
            >
              <Container el="div">
                <div className="w-full h-full flex flex-col" style={{ maxWidth: 940 }}>
                  { TopBlockComponent && <div data-scroll data-scroll-speed="0"><TopBlockComponent /></div> }

                  {
                    BottomBlockComponent && (
                      <div className="mt-auto pb-8 xl:pl-6 hidden lg:block">
                        <BottomBlockComponent />
                      </div>
                    )
                  }

                </div>
              </Container>
            </div>
          )
        }

        {/* Image Block */}
        <div className={cn([
          "absolute inset-0 py-0 z-0"
        ])}>
          <div className="h-full w-screen relative" data-scroll data-scroll-speed="-1">
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
              objectFit="cover" 
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
                  objectFit="cover" 
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
                  objectFit="cover" 
                  preload
                />
              ) : null
            }
          </div>
        </div>

        {
          BottomBlockComponent && (
            <Container el="div">
              <div className="mt-auto pb-8 xl:pl-6 lg:hidden">
                <BottomBlockComponent />
              </div>
            </Container>
          )
        }

        {
          asSeenOn ? (
            <div className="bg-secondaryLight absolute left-0 right-0 bottom-0 flex justify-center">
              <div className="py-3 container">
                <div className="flex items-center mx-auto max-w-screen-lg">
                  <h3 className="text-secondary text-xs md:text-4xl mr-4 md:mr-12 shrink-0">As Seen on</h3>
                  <div>
                    <CustomImage 
                      image={asSeenOn} 
                      preload
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : null
        }
      </div>
    </section>
  )
}

export default Hero;
