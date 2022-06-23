
import cn from 'classnames';
import Container from "@/components/ui/Container";
import { ReactNode, Component } from 'react';
import { useRef } from 'react';
import CustomImage from '@/components/ui/Image';
import type { storyBlokImage } from '@/types/storyBlok';

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

  const heroClassNames = cn(className, [
    "hero",
    "h-[90vh]",
    "relative",
    "overflow-hidden",
  ], {});

  const headerRef = useRef<null | HTMLElement>(null);

  return (
    <section className={heroClassNames} ref={headerRef}>
      <div className="h-full flex items-end xl:items-start">

        {
          (TopBlockComponent || BottomBlockComponent) && (
            <div className="w-full pb-44 xl:pt-40">
              <Container el="div">
                <div className="w-full h-full flex flex-col" style={{ maxWidth: 940 }}>
                  { TopBlockComponent && <TopBlockComponent /> }

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
          <div className="h-full w-screen">
            {/* 
              TODO: Move this into a separate repsonsive image component and make resuable
            */}

            <CustomImage
              className={cn({
                "hidden" : imageMobile && imageMobile.id || imageTablet && imageTablet.id,
                "xl:block" : imageMobile && imageMobile.id,
                // "xl:block" : imageTablet && imageTablet.id,
              })}
              image={image} 
              layout="fill" 
              objectFit="cover" 
              preload
            />

            {
              imageTablet?.id ? (
                <CustomImage
                  className={cn("xl:block", {
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
                  className={cn({
                    "xl:hidden" : imageTablet && imageTablet.id,
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
