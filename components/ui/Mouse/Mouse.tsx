import { useUIContext } from "@/components/context/uiContext";
import cn from 'classnames';
import { useEffect, useRef, useState } from "react";
import { gsap } from 'gsap';

const Mouse = () => {
  const mouseRef = useRef<HTMLDivElement | null>(null);
  const { UI: { mouse } } = useUIContext();

  return null;

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
        className={cn("w-10 h-10 relative flex justify-center items-center mx-auto text-center origin-center border border-black rounded-full", {
          // "rounded-full scale-[0.3]" : mouse.style === 'inactive',
          "bg-white rounded-full shadow-md" : mouse.style === "drag" || mouse.style === "action",
        })}
        style={{
          transition: "transform 0.3s, height 0.3s"
        }}
      >
        {
          mouse.style === "drag" 
            ? (
              <>
                <span className="absolute right-full w-5 h-5 block mr-3 border-[16px] border-r-white border-transparent border-black" />
                <span className="absolute left-full w-5 h-5 block ml-3 border-[16px] border-l-white border-transparent border-black" />
              </>
            )
            : null
        }

        {
          mouse.innerText ? (
            <span className="uppercase tracking-wider text-sm">
              {mouse.innerText}
            </span>
          ) : null
        }
      </div>
    </div>
  )
}

export default Mouse;
