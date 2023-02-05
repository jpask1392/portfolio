import Modal from "@/components/ui/Modal";
import { useRef, useState } from "react";

const HoverLink = ({
  name,
  action = {
    type: "link",
    data: {}
  },
}) => {
  const [ active, setActive ] = useState(false);
  const hoverAnimation = useRef(null);
  const pos = useRef({x: 0, y: 0});

  const handleClick = (e) => {
    // get current location of text when clicked
    const currentPos = e.currentTarget.getBoundingClientRect()
    pos.current.x = currentPos.x;
    pos.current.y = currentPos.y;

    // display it in the same location inside modal
    setActive(!active)
  }

  const handleMouseOver = (e) => {
    e.currentTarget.style.color = "#fff";
    hoverAnimation.current.style.width = "calc(100% + 2.5rem)";
  }

  const handleMouseLeave = (e) => {
    e.currentTarget.style.color = "#2E2E2E";
    hoverAnimation.current.style.width = "0";
  }

  return (
    <>
      <a 
        className="text-black cursor-pointer relative inline-block transition-all duration-300" 
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <span className="relative z-10">{name}</span>
        <span className="absolute -inset-x-5 -inset-y-2 bg-black w-0 transition-all duration-300" ref={hoverAnimation} />
      </a>

      <Modal setModalIsOpen={setActive} modalIsOpen={active}>
        <div>
          <h1 
            className="text-[6vw] h1 absolute"
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
        </div>
      </Modal>
    </>
  )
}

export default HoverLink;