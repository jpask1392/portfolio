import type { SbBlokData } from "@storyblok/react";
import { render, NODE_PARAGRAPH } from "storyblok-rich-text-react-renderer";
import Link from "next/link"
import HoverLink from "./HoverLink"

interface Props {
  body: string
}

interface Blok extends SbBlokData, Props {}

interface IndexBodyProps extends Props {
  children: any
  blok?: Blok
}

const IndexBody: React.FC<IndexBodyProps> = (props) => {
  const {
    body
  } = props.blok || props;
  return (
    <>
     <h1 className="!text-[6vw] h1 w-8/12 text-outlined">
      {render(body, {
        nodeResolvers: { 
          [NODE_PARAGRAPH]: (children) => <>{children}</>
        },
        blokResolvers: {
          ['hoverLink']: (props: any) => <HoverLink {...props} />
        }
      })}
    </h1>
    </>
  )
}

export default IndexBody