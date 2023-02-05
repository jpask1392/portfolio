import Image from "next/image";
import useIsomorphicLayoutEffect from "@/components/hooks/useIsomorphicLayoutEffect";
import { gsap } from "gsap";
import type { navLink } from "@/types/navigation";
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from "react";
import StoryBlokLink from "@/components/helpers/StoryBlokLink";
import cn from 'classnames';
import { useUIContext } from "@/components/context/uiContext";

interface NavigationLinkProps {
  className?: string
  nav_link: navLink
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ 
  nav_link, 
  className,
}) => {
  const {
    name,
    link,
    subItems,
    image,
  } = nav_link;

  const { cached_url } = link;
  const { UI, dispatch } = useUIContext();

  const router = useRouter();
  const [ hoverLink, setHoverLink ] = useState<boolean>(false);
  const tl = useRef<any>(null);
  const imageRef = useRef<HTMLSpanElement | null>(null)

  const handleOnMouseOver = () => {
    window.innerWidth > 768 && setHoverLink(true);
  }
  const handleOnMouseLeave = () => setHoverLink(false);

  useEffect(() => {
    setHoverLink(UI.activeSection === link.anchor);
  }, [UI.activeSection])

  useEffect(() => {
    if (hoverLink) tl.current.play()
    if (!hoverLink) tl.current.reverse()
  }, [hoverLink])

  useIsomorphicLayoutEffect(() => {
    tl.current = gsap.timeline({});

    if (!imageRef.current) return;

    // // move up
    tl.current.fromTo(imageRef.current, {
      yPercent: 0,
      duration: 0.3
    }, {
      yPercent: -100,
      duration: 0.3
    });

    tl.current.to(imageRef.current, {
      opacity: 1,
      duration: 0.1
    }, "<");

    tl.current.pause();
  }, [])

  return (
    <>
      {
        image && image.id ? (
          <div
            className="absolute bottom-full mb-2 -z-20 left-1/2 -translate-x-1/2"
          >
            <span 
              ref={imageRef}
              className="w-10 h-10 block opacity-0 translate-y-full"
            >
              <Image
                alt="visual on hover"
                src={image.filename}
                width={50}
                height={50}
              />
            </span>
          </div>
        ) : null
      }

      <StoryBlokLink
        className={cn("flex items-center justify-center h-full w-full hover:bg-[#B53F3D] transition-all relative z-10 rounded-md", {
          "text-white active" : router.asPath === cached_url,
          "bg-[#B53F3D]" : hoverLink
        })}
        sbLink={link}
        onMouseOver={handleOnMouseOver}
        onMouseLeave={handleOnMouseLeave}
      >
        <span
          className={cn(className)}
        >{name}</span>
      </StoryBlokLink>
    </>
  ) 
}

export default NavigationLink;
