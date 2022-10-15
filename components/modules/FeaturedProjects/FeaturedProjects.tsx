import { useMouseContext } from '@/components/context/mouseContext';
import Marquee from '@/components/ui/Marquee';
import useIsomorphicLayoutEffect from '@/components/hooks/useIsomorphicLayoutEffect';
import Container from '@/components/ui/Container';
import Header from '@/components/ui/Header';
import ProjectTile from '@/components/modules/ProjectTile';
import type { Project } from '@/types/project';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface Props {
  projects: Project[]
}

const FeaturedProjects: React.FC<Props> = ({
  projects
}) => {
  const { setMouseState } = useMouseContext();

  const isDragging = useRef(false);
  const startX = useRef(0);
  const minMax = useRef({
    current: 0,
    min: 0,
    max: 0,
    speedFactor: 1.5,
  }); // transforms

  // elements
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const navBarRef = useRef(null);

  // calc max on page load
  // will need to trigger this on a resize event
  useIsomorphicLayoutEffect(() => {
    // -( full width of carousel - container width + side header width with margin )
    const maxTransform = (trackRef.current.scrollWidth - containerRef.current.clientWidth + 86.5);
    minMax.current = {
      ...minMax.current,
      max: maxTransform,
    }

    document.addEventListener('mouseup', function (e) {
      if (isDragging.current) {
        handleMouseUp(e);
      }
    })
  }, [])

  const handleMouseDown = (e: any) => {
    isDragging.current = true;
    startX.current = e.pageX;
  }

  const handleMouseUp = (e: any) => {
    isDragging.current = false;
    const totalDragDistance = minMax.current.current - ((e.clientX - startX.current) * minMax.current.speedFactor);

    if (totalDragDistance >= minMax.current.max) {
      minMax.current = {
        ...minMax.current,
        current: minMax.current.max
      }
    } else if (totalDragDistance <= minMax.current.min) {
      minMax.current = {
        ...minMax.current,
        current: minMax.current.min
      }
    } else {
      minMax.current = {
        ...minMax.current,
        current: Math.abs(totalDragDistance)
      }
    }
  }

  const handleMouseMove = (e: any) => {
    if (!isDragging.current) return;

    // move carousel track
    const transformPos = minMax.current.current - ((e.clientX - startX.current) * minMax.current.speedFactor);
    // prevent from going past minMax points
    const transformer = gsap.utils.pipe(
      gsap.utils.clamp(-(minMax.current.max), minMax.current.min), 
      gsap.utils.snap(1)
    );

    gsap.to(trackRef.current, {
      x: `${transformer(-(transformPos))}`,
      duration: 0.3,
    })

    // move navigation bar
    const barTransformer = gsap.utils.pipe(
      gsap.utils.clamp(0, minMax.current.max), 
      gsap.utils.snap(1)
    );

    // map the min and max points to a new min max
    // transform max = container width - inner bar width

    gsap.to(navBarRef.current, {
      x: `${barTransformer(transformPos)}`,
      duration: 0.3,
    })
  }

  
  return (
    <div className="overflow-hidden">

      <Container el="div" clearMargin={['top']}>
        <div className="relative border-t border-black pt-20" ref={containerRef}>
          {/* <div 
            className="border border-black rounded-full mr-5 z-10 bg-white absolute w-[697px] transform -translate-y-full rotate-90 origin-bottom-left"
          >
            <Header 
              className="uppercase py-4 px-4 flex-shrink-0"
              tag="h2"
              size="h4"
            >
              Featured Projects
            </Header>
          </div> */}

          <div className="mb-16">
            <Header size="h1">Featured Projects</Header>
            <p className="mt-4">We’re proud to have received recognition across multiple <br/>categories and shows for</p>
          </div>
          <div 
            className="flex-shrink-0"
            style={{ width: "calc(100% + (( 100vw - 100% ) / 2))" }}
            onMouseEnter={() => setMouseState({ style: "drag", innerText: "Drag" })}
            onMouseLeave={() => setMouseState({ style: "inactive", innerText: "" })}
          >
            <ul
              className="flex space-x-5 flex-1 select-none"  
              ref={trackRef} 
              onMouseDown={handleMouseDown}
              // onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {
                projects.map((project, i) => {
                  return (
                    <li key={i} className="flex-shrink-0 w-4/12 lg:w-3/12">
                      <ProjectTile project={project} />
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>

        <div className="w-full h-0.5 bg-secondary mt-14 relative rounded-full overflow-hidden">
          <div ref={navBarRef} className="absolute inset-y-0 bg-black w-1/3 rounded-full"/>
        </div>
      </Container>
    </div>
  )
}

export default FeaturedProjects;
