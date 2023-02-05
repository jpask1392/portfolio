import Column from '@/components/ui/Column';
import cn from 'classnames';
import Container from "@/components/ui/Container";
import { ReactNode, Component } from 'react';
import { useRef } from 'react';
import CustomImage from '@/components/ui/Image';
import type { storyBlokImage } from '@/types/storyBlok';

interface Props {
  className?: string
  TopBlockComponent?: ReactNode | Component | any
  image: storyBlokImage
}

const Hero: React.FC<Props> = ({ 
  className,
  TopBlockComponent,
  image
 }) => {

  const heroClassNames = cn(className, [
    "hero",
    "hero-split",
    "relative",
    "overflow-hidden",
  ]);

  const headerRef = useRef<null | HTMLElement>(null);
  const scrollerRef = useRef<null | HTMLDivElement>(null);

  return (
    <section className={heroClassNames} ref={headerRef}>
      <div ref={scrollerRef} className="h-full bg-red py-20">

        {
          (TopBlockComponent) && (
            <div className="w-full md:w-1/2 flex justify-center">
              <Container el="div">
                <TopBlockComponent />
              </Container>
            </div>
          )
        }

        {/* Image Block */}
        <div className="lg:absolute w-1/2 py-8 lg:py-0 z-0 right-0 top-0 bottom-0">
          <div className="h-full w-full">
            <CustomImage 
              image={image} 
              layout="fill" 
              preload
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero;
