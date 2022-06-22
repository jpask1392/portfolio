import useDevice from '@/components/hooks/useDevice';
import cn from 'classnames';
import Container from "@/components/ui/Container";
import CustomImage from '@/components/ui/Image';
import { ReactNode, Component, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRef } from 'react';
import { SbEditableContent, storyBlokImage } from "@/types/storyBlok";
import useIsomorphicLayoutEffect from "@/components/hooks/useIsomorphicLayoutEffect";
import dummyImage from 'dummyData/image.json';

interface Props {
  className?: string
  TopBlockComponent?: ReactNode | Component | any
  BottomBlockComponent?: ReactNode | Component | any
  sbEditable : SbEditableContent
  sequencePath: string
  fileName: string
  fileSuffix: string
  startFrame: string
  endFrame: string
  initalImage: storyBlokImage
}

const Hero: React.FC<Props> = ({ 
  className,
  TopBlockComponent,
  BottomBlockComponent,
  sbEditable,
  sequencePath,
  fileName,
  fileSuffix,
  startFrame,
  endFrame,
  initalImage,
 }) => {

  const heroClassNames = cn(className, [
    "hero",
    "lg:h-[90vh]",
    "relative",
    "overflow-hidden",
  ]);

  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const headerRef = useRef<null | HTMLElement>(null);
  const scrollerRef = useRef<null | HTMLDivElement>(null);
  const tl = useRef<any>(null);
  const device = useDevice();
  const framesRef = useRef<any>([]);

  const animState = {
    progress: 0,
    frame: 1,
  };

  let framesLoaded = 0;
  const loadFrames = (callback: () => any) => {
    for (let i = parseInt(startFrame); i <= parseInt(endFrame); i++) {
      if (i === 1 && initalImage) {
        // preload 
        framesRef.current[1] = new Image();
        framesRef.current[1].src =
        `/_next/image?url=${encodeURIComponent(initalImage?.filename)}&w=3840&q=75`;
      } else {
        framesRef.current[i] = new Image();
        framesRef.current[i].src =
          sequencePath + fileName + i + fileSuffix;
    
        framesRef.current[i].onload = function(){ 
          framesLoaded++;
    
          // callback when all loaded
          if (framesLoaded >= parseInt(endFrame) - parseInt(startFrame)) {
            callback();
          }
        };
      } 
    }
  }

  const onLoadedFrames = () => {
    // add functions here
    tl.current.to(animState, {
      progress: 1,
      paused: false,
      frame: framesRef.current.length - 1, 
      snap: "frame",
      duration: 0.9,
    }, 0.1);

    update(); // shows the first animation frame
  }

  const initAnimation = () => {
    loadFrames(onLoadedFrames);

    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: headerRef.current,
        start: `top top+=${document.getElementById('primary-header')?.clientHeight}`,
        end: "bottom+=8000px top", // 100px/second seems to work well for "bottom"
        markers: false,
        invalidateOnRefresh: true,
        pin: true,
        scrub: 1,
        id: "heroVideo"
      },
      onUpdate: update
    });
    
    /**
     * Add horizontal scroll tween
     */
    if (TopBlockComponent || BottomBlockComponent) {
      tl.current.to(scrollerRef.current, { 
        x: () => -((headerRef.current?.clientWidth || 0) / 2) + "px",
        duration: 0.1,
      }, 0);
    }

    // set full length of animation
    tl.current.to({}, { duration: 1 }, 0);
  }

  // draw the image
  const update = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // update canvas width and height
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const context: any = canvas.getContext('2d');
    const img = framesRef.current[animState.frame];
    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawImageProp(context, img, 0, 0, canvas.width, canvas.height);
    context.restore();
  }

  const handleWindowResize = () => {
    if (canvasRef.current) {
      // update canvas width and height
      canvasRef.current.width  = canvasRef.current.offsetWidth;
      canvasRef.current.height = canvasRef.current.offsetHeight;
    }

    update();
  }

  useIsomorphicLayoutEffect(() => {
    /**
     * Can't use the useDevice hook here: 
     * The animation adds a padding below the 
     * video which causes other pinned elements
     * to be thrown out of whack.
     */
    if (window.innerWidth >= 1024) {
      initAnimation();
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);

      ScrollTrigger
        .getAll()
        .forEach(ST => ST.kill());
    }
  }, [])

  useEffect(() => {
    if (device === 'desktop' && !tl.current) {
      initAnimation();
    }

    if (device === 'mobile' && tl.current) {
      tl.current.scrollTrigger?.kill();
      tl.current.kill();
      tl.current = null;
    } 
  }, [device])

  return (
    <section 
      className={heroClassNames} 
      ref={headerRef} 
      {...sbEditable}
    >
      <div ref={scrollerRef} className="h-full">
        {
          (TopBlockComponent || BottomBlockComponent) && (
            <div className="pt-12">
              <Container el="div">
                <div 
                  className="w-full lg:w-1/2 lg:h-screen max-h-[550px] flex flex-col" 
                  style={{ maxWidth: 600 }}
                >
                  <TopBlockComponent />

                  <div className="mt-auto pb-8 xl:pl-6 hidden lg:block">
                    { BottomBlockComponent && <BottomBlockComponent /> }
                  </div>
                </div>
              </Container>
            </div>
          )
        }

        {/* Video Block */}
        <div className={cn("lg:absolute inset-0 py-8 lg:py-0", {
          "lg:left-1/2" : (TopBlockComponent || BottomBlockComponent)
        })}>
          <div className="aspect-video h-full w-screen">
            <div className="h-full w-full object-cover object-center">
              <CustomImage 
                image={initalImage}
                layout="fill"
                objectFit="cover"
                className="lg:sr-only"
                preload
              />
              {
                device === 'desktop' ? (
                  <canvas
                    ref={canvasRef}
                    className="h-full w-full" 
                  />
                ) : null
              }
            </div>
          </div>
        </div>

        {
          BottomBlockComponent && (
            <Container el="div">
              <div className="mt-auto pb-8 xl:pl-6 lg:hidden">
                <BottomBlockComponent />
              </div>
            </Container>
          )
        }
      </div>
    </section>
  )
}

export default Hero;

/**
 * By Ken Fyrstenberg Nilsen
 *
 * drawImageProp(context, image [, x, y, width, height [,offsetX, offsetY]])
 *
 * If image and context are only arguments rectangle will equal canvas
*/
function drawImageProp(
  ctx: any,
  img: any,
  x: number,
  y: number, 
  w: number, 
  h: number, 
  offsetX?: number, 
  offsetY?: number
) {

  if (arguments.length === 2) {
      x = y = 0;
      w = ctx.canvas.width;
      h = ctx.canvas.height;
  }

  // default offset is center
  offsetX = typeof offsetX === "number" ? offsetX : 0.5;
  offsetY = typeof offsetY === "number" ? offsetY : 0.5;

  // keep bounds [0.0, 1.0]
  if (offsetX < 0) offsetX = 0;
  if (offsetY < 0) offsetY = 0;
  if (offsetX > 1) offsetX = 1;
  if (offsetY > 1) offsetY = 1;

  var iw = img.width,
      ih = img.height,
      r = Math.min(w / iw, h / ih),
      nw = iw * r,   // new prop. width
      nh = ih * r,   // new prop. height
      cx, cy, cw, ch, ar = 1;

  // decide which gap to fill    
  if (nw < w) ar = w / nw;                             
  if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
  nw *= ar;
  nh *= ar;

  // calc source rectangle
  cw = iw / (nw / w);
  ch = ih / (nh / h);

  cx = (iw - cw) * offsetX;
  cy = (ih - ch) * offsetY;

  // make sure source rectangle is valid
  if (cx < 0) cx = 0;
  if (cy < 0) cy = 0;
  if (cw > iw) cw = iw;
  if (ch > ih) ch = ih;

  // fill image in dest. rectangle
  ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
}
