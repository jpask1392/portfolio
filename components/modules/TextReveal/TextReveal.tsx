import { render, NODE_PARAGRAPH } from "storyblok-rich-text-react-renderer";
import { renderOptions } from "utils/constants";
import { gsap } from 'gsap';
import useIsomorphicLayoutEffect from '@/components/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';

interface Props {
  text: any
}

const TextReveal: React.FC<Props> = ({
  text,
}) => {
  const tl = useRef<any>(null);
  const containerRef = useRef<any>(null)

  useIsomorphicLayoutEffect(() => {
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        end: 'top top+=100',
        markers: false,
        scrub: 1,
      },
    });

    tl.current.to(containerRef.current.querySelectorAll('span'), { 
      opacity: 1,
      stagger: 0.1,
    });
  }, [])

  return (
    <div className="w-full relative">
      <div className="w-3/4 absolute right-0 max-w-[1000px] top-1/2 -translate-y-1/2">
        <div className="aspect-video bg-gray-300 rounded-md"/>
      </div>
      <div className="max-w-[850px] relative z-10">
        
        { render(text, {
          ...renderOptions,
          nodeResolvers: {
            [NODE_PARAGRAPH]: (children: any) => {
              return (
                <p className="h2" ref={containerRef}>
                  { children[0].split(" ").map((word: string, i: number) => 
                    <span key={i} className="opacity-20">{i !== 0 ? ' ': ''}{word}</span>
                  ) }
                </p>
              )
            }
          }
        }) }
      </div>
    </div>
  )
}

export default TextReveal;
