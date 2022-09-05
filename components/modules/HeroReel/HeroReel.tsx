import { gsap } from 'gsap';
import useIsomorphicLayoutEffect from '@/components/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';
import { useMouseContext } from '@/components/context/mouseContext';

interface Props {

}

const HeroReel: React.FC<Props> = ({

}) => {
  const tl = useRef<any>(null);
  const containerRef = useRef<any>(null);
  const videoRef = useRef(null);
  const { setMouseState } = useMouseContext();

  useIsomorphicLayoutEffect(() => {
    tl.current = gsap.timeline({});

    tl.current.to(containerRef.current, { 
      borderRadius: "30px",
      left: "1rem",
      bottom: "1rem",
      top: "1rem",
      right: "1rem",
      ease: "power4.out",
      delay: 3,
    });

    // auto play the video on load
    // console.log(videoRef.current)
    // videoRef.current.play();
  }, [])

  return (
    <section className="w-screen h-screen relative">
      <div 
        ref={containerRef}
        className="bg-gray-300 absolute inset-0 overflow-hidden"
        onMouseOver={() => setMouseState({ style: "action", innerText: "Play" })}
        onMouseLeave={() => setMouseState({ style: "inactive", innerText: "" })}
      >
        <video 
          ref={videoRef}
          className="w-full h-full absolute inset-0 object-cover" 
          controls={false}
          autoPlay={true}
          playsInline={true} 
          muted={true}
          loop={true}
        >
          <source src="/testdemo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

      </div>
    </section>
  )
}

export default HeroReel;
