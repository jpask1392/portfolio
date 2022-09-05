import cn from 'classnames';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Container from '@/components/ui/Container';
import Header from '@/components/ui/Header';
import { useState } from 'react';
import { gsap } from 'gsap';
import useIsomorphicLayoutEffect from '@/components/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';

interface Props {

}

const Services: React.FC<Props> = ({

}) => {
  const [ active, setActive ] = useState(0);

  const containerRef = useRef<any>(null);
  const contentRef = useRef<any>(null);
  const backgroundRef = useRef<any>(null);
  const imagesRef = useRef([]);
  const serviceContentRefs = useRef([]);

  const services = [
    {
      name: "PERFORMANCE",
      content: "Looking to improve the performance of your site? Not sure? Enter your website in the link below to see how you stack up against the competition.",
      color: 'red',
    },
    {
      name: "Development",
      content: "Need some help bringing your next big idea to life? Need to integrate a third party API to your existing API to your existingAPI to your existing.",
      color: 'green',
    },
    {
      name: "WEB3",
      content: "Want to interact with the ethereum blockchain through your frontend via wallet connections with Web3?",
      color: 'orange',
    }
  ]

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
          scrub: 1,
          start: "top-=10px center", // half way between gap
          onEnter: () => setActive(index),
          onLeaveBack: () => setActive(index !== 0 ? index - 1 : 0)
        },
        opacity: 1,
      })
    })

    serviceContentRefs.current.forEach((serviceContent, index) => {
      if (index > 0) {
        
      }
    })
  }, [])

  return (
    <div className="relative" ref={containerRef}>
      <div className="absolute inset-0 bg-yellow border border-black" ref={backgroundRef} />

      <Container maxWidth='lg'>
        <div className="flex -mx-10">
          <div ref={contentRef} className="h-screen w-1/2 flex px-10">
            <div className="section flex flex-col py-10">
              <Header>
                Services and specialities - Something you’re looking for not on this list? <span className='underline'>Reach out</span>
              </Header>

              <div className="mt-auto max-w-[365px]">
                <div className="track relative">
                  {
                    services.map((service, i) => {
                      return (
                        <div 
                          ref={el => serviceContentRefs.current[i] = el}
                          className={cn("pt-8 transition-opacity absolute bottom-0", {
                            "opacity-0": active !== i
                          })}
                        >
                          <Header tag='h3' size='h3'>{service.name}</Header>
                          <p className="mt-6">{service.content}</p>
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
              services.map((service, i) => {
                return (
                  <div
                    key={i}
                    className="bg-white aspect-[9/13] w-full mb-5 rounded-lg max-w-[450px] mx-auto opacity-25 border border-black"
                    ref={el => imagesRef.current[i] = el}
                  />
                )
              })
            }
          </div>
        </div>
      </Container>
      
    </div>
  )
}

export default Services;
