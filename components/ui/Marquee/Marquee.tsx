import Ticker from 'react-ticker';
import { render } from "storyblok-rich-text-react-renderer";
import { renderOptions } from "utils/constants";
import { storyblokEditable } from "@storyblok/react";
import type { SbBlokData } from "@storyblok/react"
import { SbEditableContent } from "@/types/storyBlok";
import useIsomorphicLayoutEffect from '@/components/hooks/useIsomorphicLayoutEffect';
import { useState } from 'react';

interface Props {
  text?: string | any,
  repeat?: string,
  speed?: number
}

interface Blok extends SbBlokData, Props {}

interface MarqueeProps extends Props {
  children?: any
  blok?: Blok
}

const Marquee: React.FC<MarqueeProps> = (props) => {
  const {
    text,
    repeat = '2',
    speed = 5,
  } = props.blok || props;

  const [pageIsVisible, setPageIsVisible] = useState(true)

  useIsomorphicLayoutEffect(() => {
    document.addEventListener("visibilitychange", handlePageChange);

    return () => {
      document.removeEventListener("visibilitychange", handlePageChange);
    }
  }, [])

  const handlePageChange = () => {
    setPageIsVisible(!document.hidden)
  }

  return (
    <div 
      {...(props.blok && storyblokEditable(props.blok))}
      className="ui-marquee"
    >
      {
        pageIsVisible ? (
          <Ticker speed={speed}>
            {({ index }) => (
              <>{props.children ? props.children : render(text, renderOptions)}</>
            )}
          </Ticker>
        ) : null
      }
    </div>
  )
}

export default Marquee;
