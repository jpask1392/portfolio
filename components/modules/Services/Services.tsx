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
  const [ index, setIndex ] = useState(0);
  const tl = useRef<any>(null);
  const containerRef = useRef<any>(null);
  const titleRef = useRef<any>(null);
  const backgroundRef = useRef<any>(null);

  const container2Ref = useRef<any>(null);

  const services = [
    {
      name: "PERFORMANCE",
      content: "Looking to improve the performance of your site? Not sure? Enter your website in the link below to see how you stack up against the competition."
    },
    {
      name: "Development",
      content: "Need some help bringing your next big idea to life? Need to integrate a third party API to your existing API to your existingAPI to your existing."
    },
    {
      name: "WEB3",
      content: "Want to interact with the ethereum blockchain through your frontend via wallet connections with Web3?"
    }
  ]

  useIsomorphicLayoutEffect(() => {
    // tl.current = gsap.timeline({});

    gsap.to(backgroundRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        markers: false,
        pin: titleRef.current,
        pinSpacing: false,
        end: "bottom bottom",
        toggleActions: "play none none reverse"
      },
      borderRadius: "30px",
      left: "1rem",
      right: "1rem",
      ease: "power4.out",
    })

    /**
     * TODO: Need to loop through the services 
     * and assign the refs with a callback
     */
    gsap.to(container2Ref.current, {
      scrollTrigger: {
        trigger: container2Ref.current,
        markers: false,
        scrub: 1,
        // start: 'top center',
        start: "top-=10px center", // half way between gap
        onEnter: () => setIndex(1),
        onLeaveBack: () => setIndex(0)
      },
      backgroundColor: 'green',
    })
  }, [])

  return (
    <div className="relative" ref={containerRef}>
      <div className="absolute inset-0 bg-black" ref={backgroundRef} />

      <Container maxWidth='lg'>
        <div className="flex text-white -mx-10">
          <div ref={titleRef} className="h-screen w-1/2 flex px-10">
            <div className="section flex flex-col py-10">
              <Header>
                Services and specialities - Something you’re looking for not on this list? <span className='underline'>Reach out</span>
              </Header>

              <div className="mt-auto max-w-[365px]">
                <Header tag='h3' size='h3'>{services[index]['name']}</Header>
                <p className="mt-6">{services[index]['content']}</p>
              </div>
            </div>
          </div>

          <div className="w-1/2 section px-10">
            <div className="bg-white aspect-[9/13] w-full mb-5 rounded-lg max-w-[450px] mx-auto"/>
            <div className="bg-white aspect-[9/13] w-full mb-5 rounded-lg max-w-[450px] mx-auto" ref={container2Ref}/>
            <div className="bg-white aspect-[9/13] w-full rounded-lg max-w-[450px] mx-auto"/>
          </div>
        </div>
      </Container>
      
    </div>
  )
}

export default Services;
