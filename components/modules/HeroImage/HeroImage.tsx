
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
}

const Hero: React.FC<Props> = ({ 
  className,
  TopBlockComponent,
  BottomBlockComponent,
  image
 }) => {

  const heroClassNames = cn(className, [
    "hero",
    "lg:h-[90vh]",
    "relative",
    "overflow-hidden",
  ], {});

  const headerRef = useRef<null | HTMLElement>(null);
  const scrollerRef = useRef<null | HTMLDivElement>(null);

  return (
    <section className={heroClassNames} ref={headerRef}>
      <div ref={scrollerRef} className="h-full">

        {
          (TopBlockComponent || BottomBlockComponent) && (
            <div className="pt-40">
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
          "absolute inset-0 py-8 lg:py-0 z-0"
        ])}>
          <div className="h-full w-screen">
            <CustomImage 
              image={image} 
              layout="fill" 
              objectFit="cover" 
              preload
            />
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

        <div className="bg-secondary absolute left-0 right-0 bottom-0 flex justify-center">
          <div className="py-3">
            As seen on 
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero;
