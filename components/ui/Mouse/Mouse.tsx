import { useMouseContext } from '@/components/context/mouseContext';
import cn from 'classnames';
import { useEffect, useRef, useState } from "react";
import { gsap } from 'gsap';

const Mouse = () => {
  const mouseRef = useRef(null);
  const { mouseState } = useMouseContext(); // inactive, drag, dragPress, anchor, anchorPress

  useEffect(() => {
    // console.log(mouseState)
    // mouseRef.current.dispatchEvent(new Event('mousemove'));
  }, [mouseState])

  useEffect(() => {
    document.onmousemove = handleMouseMove;
    document.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    gsap.to(mouseRef.current, {
      x: e.clientX - (mouseRef.current.clientWidth / 2),
      y: e.clientY - (mouseRef.current.clientHeight / 2),
      duration: 0.2,
    });

    // check what the mouse is over
    // console.log( document.elementFromPoint(e.clientX, e.clientY) )
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
          "border border-black rounded-full scale-[0.3]" : mouseState.style === 'inactive',
          "bg-white border border-black rounded-full" : mouseState.style === "drag" || mouseState.style === "action",
          // "bg-white border border-black rounded-full" : mouseState.style === "action"
        })}
        style={{
          transition: "transform 0.3s, height 0.3s"
        }}
      >
        {
          mouseState.style === "drag" 
            ? (
              <>
                <span className="absolute right-full w-5 h-5 block bg-yellow mr-3 border border-black rotate-45" />
                <span className="absolute left-full w-5 h-5 block bg-yellow ml-3 border border-black rotate-45" />
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
