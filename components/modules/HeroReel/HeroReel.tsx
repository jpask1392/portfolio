import { gsap } from 'gsap';
import useIsomorphicLayoutEffect from '@/components/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';

interface Props {

}

const HeroReel: React.FC<Props> = ({

}) => {
  const tl = useRef<any>(null);
  const containerRef = useRef<any>(null)

  useIsomorphicLayoutEffect(() => {
    tl.current = gsap.timeline({});

    tl.current.to(containerRef.current, { 
      borderRadius: "30px",
      left: "1rem",
      top: "1rem",
      right: "1rem",
      ease: "power4.out",
      delay: 3,
    });
  }, [])

  return (
    <section className="w-screen aspect-video relative">
      <div 
        ref={containerRef}
        className="bg-gray-300 absolute inset-0 bottom-0"
      >

      </div>
    </section>
  )
}

export default HeroReel;
