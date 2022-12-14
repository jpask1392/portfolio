import DynamicIcon from '@/components/icons/DynamicIcon';
import Image from '@/components/ui/Image';
import cn from 'classnames';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Container from '@/components/ui/Container';
import Header from '@/components/ui/Header';
import { useState } from 'react';
import { gsap } from 'gsap';
import useIsomorphicLayoutEffect from '@/components/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';
import { render, NODE_PARAGRAPH } from "storyblok-rich-text-react-renderer";
import Button from '@/components/ui/Button';

interface Props {

}

const Services: React.FC<Props> = ({
  title,
  serviceList: services,
}) => {
  const [ active, setActive ] = useState(0);

  const containerRef = useRef<any>(null);
  const contentRef = useRef<any>(null);
  const backgroundRef = useRef<any>(null);
  const imagesRef = useRef([]);
  const serviceContentRefs = useRef([]);
  const trackRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
    // animate the background
    gsap.to(backgroundRef.current, {
      scrollTrigger: {
        trigger: backgroundRef.current,
        markers: false,
        pin: contentRef.current,
        pinSpacing: false,
        end: "bottom bottom",
        toggleActions: "play none none reverse"
      },
      borderRadius: "30px",
      left: "1rem",
      right: "1rem",
      ease: "power4.out",
    })

    // animate the images
    imagesRef.current.forEach((imageRef, index) => {
      gsap.to(imageRef, {
        scrollTrigger: {
          trigger: imageRef,
          markers: false,
          start: "top-=10px top+=25%", // half way between gap
          // end: "top top+=100",
          onEnter: () => setActive(index),
          onLeaveBack: () => setActive(index !== 0 ? index - 1 : 0)
        },
        opacity: 1,
      })
    })

    
    if (active !== 0) {
      gsap.to(serviceContentRefs.current[active - 1], {
        y: "-" + serviceContentRefs.current[active].offsetHeight,
      })
    }

    gsap.to(serviceContentRefs.current[active + 1], {
      y: serviceContentRefs.current[active].offsetHeight
    })
  }, [])

  useIsomorphicLayoutEffect(() => {
    if (active === 0) {
      gsap.to(serviceContentRefs.current[active], {
        y: "-" + serviceContentRefs.current[active].offsetHeight,
        opacity: 0,
      })
    } else {
      gsap.to(serviceContentRefs.current[active - 1], {
        y: "-" + serviceContentRefs.current[active].offsetHeight,
        opacity: 0,
      })
    }

    gsap.to(serviceContentRefs.current[active], {
      y: 0,
      opacity: 1,
    })

    gsap.to(serviceContentRefs.current[active + 1], {
      y: serviceContentRefs.current[active].offsetHeight,
      opacity: 0,
    });
  }, [active])

  return (
    <div className="relative text-white" ref={containerRef}>
      <div className="absolute inset-0 bg-black border border-black" ref={backgroundRef} />

      <Container maxWidth='lg'>
        <div className="flex -mx-10">
          <div ref={contentRef} className="h-screen w-1/2 flex px-10">
            <div className="flex flex-col pt-20 pb-10 my-auto h-full max-h-[800px]">
              <Header>
                Services and specialities -
              </Header>
              <Header>
                Something you???re looking for <br/>not on this list? <span className="underline">Reach out</span>
              </Header>
              <Button 
                className="mt-8"
                text="Contact"
                icon={<DynamicIcon type="arrowNewPage" />}
              />

              <div className="mt-auto max-w-[365px]">
                <div className="track relative" ref={trackRef}>
                  {
                    services?.map((service, i) => {
                      return (
                        <div 
                          ref={el => serviceContentRefs.current[i] = el}
                          className={cn("pt-8 absolute bottom-0", {
                            "opacity-0": i !== 0,
                            // "relative": active  === i,
                          })}
                        >
                          <Header tag='h3' size='h3'>{i + 1}. {service.name}</Header>
                          <p className="mt-6">{render(service.bodyText)}</p>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/2 section px-10">
            {
              services?.map((service: {
                image: any
                bodyText: string
              }, i: number) => {
                return (
                  <div
                    key={i}
                    className="bg-white aspect-[9/13] w-full mb-5 rounded-lg  mx-auto opacity-25 overflow-hidden relative"
                    ref={el => imagesRef.current[i] = el}
                  >
                    <Image 
                      image={service.image}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )
              })
            }

              <div className="aspect-[9/13] w-full mb-5 rounded-lg  mx-auto overflow-hidden relative"/>
          </div>
        </div>
      </Container>
      
    </div>
  )
}

export default Services;
