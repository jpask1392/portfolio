import { ReactNode, Component, useEffect, useRef } from 'react';

import Header from '@/components/ui/Header';
import GungnirSymbol from './GungnirSymbol';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

interface Props {
  className?: string
  children?: ReactNode | Component | any
  header?: string
}

const ImmortalTools: React.FC<Props> = ({ 
  children,
  className,
  header
}) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const tl = useRef<any>(null);

  useEffect(() => {
    if (logoRef?.current) {

      tl.current = gsap.timeline({
        scrollTrigger: {
          trigger: logoRef.current,
          start: 'center center',
          endTrigger: sectionRef.current,
          end: 'bottom+=100%',
          scrub: 1,
          pin: true,
          markers: false,
        }
      });

      tl.current.to(logoRef.current?.querySelector('.gungir-symbol-wrapper'), {
        opacity: 1,
      })

      tl.current.to(logoRef.current?.querySelector('.title'), {
        opacity: 1,
      })
    }
  }, [])

  return (
    <div className="section-n has-bg" ref={sectionRef}>
      <div className="flex justify-center flex-wrap relative" ref={logoRef}>
        <div className="gungir-symbol-wrapper opacity-0">
          <GungnirSymbol classes="h-full w-full" />
        </div>

        <div className="title w-full absolute opacity-0 top-1/2 transform -translate-y-1/2">
          <Header align="center">{header}</Header>
        </div>
      </div>

      <div className="mt-16 md:mt-36" ref={contentRef}>
        {children}
      </div>
    </div>
  )
}

export default ImmortalTools;
