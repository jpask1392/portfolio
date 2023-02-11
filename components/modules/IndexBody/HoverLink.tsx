import cn from "classnames";
import type { storyBlokLink } from "@/types/storyBlok";
import StoryBlokLink from "@/components/helpers/StoryBlokLink";
import Modal from "@/components/ui/Modal";
import { useRef, useState } from "react";

interface Props {
  name: string
  action: string | "link" | "overlay"
  link?: storyBlokLink
  gallery?: any[]
}

const HoverLink: React.FC<Props> = ({
  name,
  action,
  link,
  gallery
}) => {
  const [ active, setActive ] = useState(false);
  const hoverAnimation = useRef<HTMLDivElement | null>(null);
  const pos = useRef({x: 0, y: 0});

  const handleClick = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
    // get current location of text when clicked
    const currentPos = e.currentTarget.getBoundingClientRect()
    pos.current.x = currentPos.x;
    pos.current.y = currentPos.y;

    // display it in the same location inside modal
    setActive(!active)
  }

  const handleMouseEnter = (e: React.SyntheticEvent<HTMLSpanElement>) => {
    e.currentTarget.style.color = "#fff";
    if (hoverAnimation.current) hoverAnimation.current.style.width = "calc(100% + 2.5rem)";
  }

  const handleMouseLeave = (e: React.SyntheticEvent<HTMLSpanElement>) => {
    e.currentTarget.style.color = "#2E2E2E";
    if (hoverAnimation.current) hoverAnimation.current.style.width = "0";
  }

  if (action === "link") {
    return (
      <StoryBlokLink 
        sbLink={link} 
        className="text-black cursor-pointer relative inline-block transition-all duration-300"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="relative z-10">{name}</span>
        <span className="absolute -inset-x-5 -inset-y-2 bg-black w-0 transition-all duration-300" ref={hoverAnimation} />
      </StoryBlokLink>
    )
  }

  if (action === "overlay") {
    return (
      <>
        <a 
          className="text-black cursor-pointer relative inline-block transition-all duration-300" 
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="relative z-10">{name}</span>
          <span className="absolute -inset-x-5 -inset-y-2 bg-black w-0 transition-all duration-300" ref={hoverAnimation} />
        </a>
  
        <Modal setModalIsOpen={setActive} modalIsOpen={active}>
          <h1 
            className="!text-[6vw] h1 absolute"
            style={{
              left: pos.current.x,
              top: pos.current.y
            }}
          >
            <a 
              className="text-background cursor-pointer inline-block relative"
            >
              <span className="relative z-10">{name}</span>
              <span className="absolute -inset-x-5 -inset-y-2 bg-black transition-all duration-300"/>
            </a>
          </h1>
          
          <div className="flex">

          </div>
        </Modal>
      </>
    )
  }

  return null;
}

export default HoverLink;