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
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentPos = useRef(0);

  const handleMouseDown = (e: any) => {
    isDragging.current = true;
    startX.current = e.pageX;
  }

  const handleMouseUp = (e: any) => {
    isDragging.current = false;
    currentPos.current = currentPos.current + e.clientX - startX.current;
  }

  const handleMouseMove = (e: any) => {
    if (!isDragging.current) return;

    const transformPos = currentPos.current + e.clientX - startX.current;

    // map transformPos
    const transformer = gsap.utils.pipe(
      // clamp between 0 and 100
      gsap.utils.clamp(-1000, 0), 

      // then map to the corresponding position on the width of the screen
      // gsap.utils.mapRange(0, 100, 0, window.innerWidth),

      // then snap to the closest increment of 20
      gsap.utils.snap(1)
    );

    console.log(transformer(transformPos));

    gsap.to(trackRef.current, {
      x: `${(transformer(transformPos) * 3)}`
    })
  }

  
  return (
    <div className="overflow-hidden">

      <Container el="div" clearMargin={['top']}>
        <div className="flex">
          <div 
            className="border border-black rounded-full relative mr-5 z-10 bg-white mb-[163px]"
          >
            <Header 
              className="uppercase [writing-mode:vertical-lr] rotate-180 py-10 px-4"
              tag="h2"
              size="h4"
            >
              Featured Projects
            </Header>
          </div>
          <div style={{ width: "calc(100% + (( 100vw - 100% ) / 2))" }}>
            <ul
              className="flex space-x-5 flex-1 select-none"  
              ref={trackRef} 
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {
                projects.map((project, i) => {
                  return (
                    <li key={i} className="flex-shrink-0 w-3/12">
                      <ProjectTile project={project} />
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>

        <div className="w-full h-0.5 bg-gray-200 mt-14 relative rounded-full">
          <div className="absolute inset-y-0 bg-black w-1/3 rounded-full"/>
        </div>
      </Container>
    </div>
  )
}

export default FeaturedProjects;
