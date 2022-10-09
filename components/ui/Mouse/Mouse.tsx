import { useMouseContext } from '@/components/context/mouseContext';
import cn from 'classnames';
import { useEffect, useRef, useState } from "react";
import { gsap } from 'gsap';

const Mouse = () => {
  const mouseRef = useRef<HTMLDivElement | null>(null);
  const { mouseState } = useMouseContext(); // inactive, drag, dragPress, anchor, anchorPress

  useEffect(() => {
    document.onmousemove = handleMouseMove;
    document.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    if (!mouseRef.current) return;

    gsap.to(mouseRef.current, {
      x: e.clientX - (mouseRef.current.clientWidth / 2),
      y: e.clientY - (mouseRef.current.clientHeight / 2),
      duration: 0.2,
    });
  }

  const handleMouseDown = () => {
    gsap.to(mouseRef.current, {
      scale: 0.8,
      duration: 0.2,
    })
  }

  const handleMouseUp = () => {
    gsap.to(mouseRef.current, {
      scale: 1,
      duration: 0.2,
    })
  }

  return (
    <div 
      className={cn("fixed pointer-events-none top-0 left-0 z-50 mx-auto")}
      ref={mouseRef}
    >
      <div 
        className={cn("w-20 h-20 relative flex justify-center items-center mx-auto text-center origin-center", {
          "rounded-full scale-[0.3]" : mouseState.style === 'inactive',
          "bg-white rounded-full shadow-md" : mouseState.style === "drag" || mouseState.style === "action",
        })}
        style={{
          transition: "transform 0.3s, height 0.3s"
        }}
      >
        {
          mouseState.style === "drag" 
            ? (
              <>
                <span className="absolute right-full w-5 h-5 block mr-3 border-[16px] border-r-white border-transparent border-black" />
                <span className="absolute left-full w-5 h-5 block ml-3 border-[16px] border-l-white border-transparent border-black" />
              </>
            )
            : null
        }

        {
          mouseState.innerText ? (
            <span className="uppercase tracking-wider text-sm">
              {mouseState.innerText}
            </span>
          ) : null
        }
      </div>
    </div>
  )
}

export default Mouse;
