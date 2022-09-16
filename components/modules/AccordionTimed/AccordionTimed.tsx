import { render, NODE_PARAGRAPH } from "storyblok-rich-text-react-renderer";
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import Header from '@/components/ui/Header';
import { gsap } from 'gsap';

interface Props {
  accordionItems: any[]
}

const AccordionTimed: React.FC<Props> = ({
  accordionItems,
}) => {
  const [ active, setActive ] = useState(0);
  const tls = useRef<any>([]);
  const animationsRef = useRef<any>([]);

  useEffect(() => {
    animationsRef.current.forEach((animationLine: any, index: number) => {
      tls.current[index] = gsap.timeline({ 
        paused: true,
        onComplete: () => {
          if (index === accordionItems.length - 1) {
            setActive(0)
          } else {
            setActive(index + 1)
          }
        }
      });
      
      tls.current[index].fromTo(animationLine,
        {
          width: "0%",
          ease: "linear",
        },
        {
          width: "100%",
          ease: "linear",
          duration: 6,
        }
      )

      tls.current[index].pause();
    })
  }, [])

  useEffect(() => {
    if (tls.current) {
      tls.current.forEach((tl: any) => tl.timeScale(8).reverse())
      tls.current[active].timeScale(1).play()
    }
  }, [active])
  
  return (
    <div className="flex flex-wrap -mx-20 mt-20">
      <div className="w-1/2 px-20">
        <ul>
          {
            accordionItems.map((item, index) => {
              return (
                <li 
                  onMouseEnter={() => index === active && tls.current[index].pause()}
                  onMouseLeave={() => index === active && tls.current[index].play()}
                  onClick={() => {
                    setActive(index);
                    tls.current[index].pause();
                  }}
                  className={cn("pb-5 mb-6 relative cursor-pointer transition-opacity duration-300", {
                    "opacity-20 hover:opacity-50" : index !== active
                  })}
                >  
                  <Header size="h4">
                    <span className="mr-3 w-10 inline-block">Q{index + 1}.</span> 
                    <span className="text-2xl">{item.header}</span>
                  </Header>

                  <span className="w-full h-0.5 bg-secondary block absolute top-full rounded-full">
                    <span 
                      ref={el => animationsRef.current[index] = el}
                      className="h-full bg-black block"
                    />
                  </span>
                </li>
              )
            })
          }
        </ul>
      </div>

      <div className="w-1/2 px-20">
        <div className="h-full w-full max-w-[430px]">
          {
            accordionItems.map((item, index) => {
              return (
                <div className={cn("relative", {
                  "" : index === active,
                  "hidden" : index !== active
                })}>
                  <Header size="h4" className="mb-5">
                    A{index + 1}.
                  </Header>
                  {render(item.content)}
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default AccordionTimed;
